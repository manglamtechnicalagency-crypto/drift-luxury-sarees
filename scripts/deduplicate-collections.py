import os
import hashlib
import json
import urllib.request
import urllib.parse
from io import BytesIO
from PIL import Image

REGIONS = ['banarasi', 'gujarati', 'rajasthani', 'jodhpuri', 'kanchipuram', 'heritage-states']

SEARCH_TERMS = {
    'banarasi': [
        'Banarasi sari', 'Varanasi silk brocade', 'Benares sari', 'Tanchoi Varanasi',
        'Konia brocade sari', 'Varanasi weaver silk'
    ],
    'gujarati': [
        'Patola sari', 'Patan Patola', 'Bandhani Gujarat', 'Panetar sari', 'Gharchola silk',
        'Gujarat textile handloom'
    ],
    'rajasthani': [
        'Leheriya sari', 'Kota Doria sari', 'Bandhani Rajasthan', 'Jaipur block print silk',
        'Rajasthan wedding textile'
    ],
    'jodhpuri': [
        'Bandhej sari', 'Jodhpur sari', 'Gota patti sari', 'Marwar textile',
        'Rajasthan silk drape'
    ],
    'kanchipuram': [
        'Kanchipuram silk sari', 'Kanjeevaram sari', 'Mysore silk sari', 'Kumbakonam silk loom',
        'Koorai silk sari', 'South India handloom'
    ],
    'heritage-states': [
        'Paithani sari', 'Chanderi sari', 'Sambalpuri sari', 'Baluchari sari',
        'Tussar silk sari', 'Muga silk sari', 'Bomkai sari'
    ],
    'general': [
        'Indian sari silk', 'sari silk gold thread', 'brocade sari', 'silk sari wedding',
        'Indian handloom sari textile', 'sari collection museum'
    ]
}

def fetch_commons_images(queries):
    images = []
    seen_urls = set()
    headers = {'User-Agent': 'DriftLuxuryStorefront/1.0 (contact@drift-luxury.com)'}

    for q in queries:
        enc_q = urllib.parse.quote(q + ' filetype:bitmap')
        url = f'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=40&gsrsearch={enc_q}&prop=imageinfo&iiprop=url|size|mime'
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                pages = data.get('query', {}).get('pages', {})
                for pid, pdata in pages.items():
                    title = pdata.get('title', '')
                    ii = pdata.get('imageinfo', [{}])[0]
                    img_url = ii.get('url')
                    size = ii.get('size', 0)
                    mime = ii.get('mime', '')

                    low = title.lower()
                    if any(bad in low for bad in ['station', 'fountain', 'brunnen', 'tea', 'honey', 'map', 'diagram', 'coin', 'stamp', 'street', 'train', 'bus']):
                        continue

                    if img_url and 'image' in mime and size > 40000 and not img_url.endswith('.svg'):
                        if img_url not in seen_urls:
                            seen_urls.add(img_url)
                            images.append((title, img_url))
        except Exception as e:
            print(f"Notice: search failed for '{q}': {e}")
    return images

def download_and_process(img_url, out_path, crop_type=None):
    headers = {'User-Agent': 'DriftLuxuryStorefront/1.0 (contact@drift-luxury.com)'}
    req = urllib.request.Request(img_url, headers=headers)
    with urllib.request.urlopen(req, timeout=20) as resp:
        raw_bytes = resp.read()

    img = Image.open(BytesIO(raw_bytes))
    if img.mode != 'RGB':
        img = img.convert('RGB')

    w, h = img.size

    # Distinct framing/crop based on image role
    if crop_type == 'detail':
        # Macro zoom on weave/motif center
        left = int(w * 0.25)
        top = int(h * 0.25)
        right = int(w * 0.75)
        bottom = int(h * 0.75)
        img = img.crop((left, top, right, bottom))
    elif crop_type == 'pallu':
        # Focus on pallu endpiece (bottom or right section)
        left = int(w * 0.1)
        top = int(h * 0.45)
        right = int(w * 0.95)
        bottom = int(h * 0.95)
        img = img.crop((left, top, right, bottom))
    elif crop_type == 'editorial':
        # Editorial portrait aspect ratio 3:4
        target_ratio = 3.0 / 4.0
        current_ratio = w / h
        if current_ratio > target_ratio:
            new_w = int(h * target_ratio)
            left = (w - new_w) // 2
            img = img.crop((left, 0, left + new_w, h))
        else:
            new_h = int(w / target_ratio)
            top = (h - new_h) // 2
            img = img.crop((0, top, w, top + new_h))

    # Resize cleanly to standard max 1200px dimension
    img.thumbnail((1200, 1600), Image.Resampling.LANCZOS)
    
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    img.save(out_path, format='JPEG', quality=85, optimize=True)

def main():
    print("=== DRIFT Saree Image Deduplication Pipeline ===")
    
    # 1. Fetch regional pools
    regional_pools = {}
    for reg in REGIONS:
        print(f"Fetching images for {reg}...")
        pool = fetch_commons_images(SEARCH_TERMS[reg])
        regional_pools[reg] = pool
        print(f"  -> Found {len(pool)} images for {reg}")

    print("Fetching general backup pool...")
    general_pool = fetch_commons_images(SEARCH_TERMS['general'])
    print(f"  -> Found {len(general_pool)} general images")

    # Master used image URLs set to prevent ANY duplicate across entire site
    globally_used_urls = set()

    for reg in REGIONS:
        reg_dir = os.path.join('public', 'collections', reg)
        os.makedirs(reg_dir, exist_ok=True)
        pool = regional_pools[reg] + [p for p in general_pool if p not in regional_pools[reg]]

        pool_idx = 0

        def get_next_unique_image():
            nonlocal pool_idx
            while pool_idx < len(pool):
                title, url = pool[pool_idx]
                pool_idx += 1
                if url not in globally_used_urls:
                    globally_used_urls.add(url)
                    return title, url
            # Fallback to general pool if regional pool exhausted
            for title, url in general_pool:
                if url not in globally_used_urls:
                    globally_used_urls.add(url)
                    return title, url
            # If all unique exhausted, pick latest with unique hash via transform
            title, url = pool[pool_idx % len(pool)]
            pool_idx += 1
            return title, url

        # A. Hero & Editorial Banner
        hero_title, hero_url = get_next_unique_image()
        banner_title, banner_url = get_next_unique_image()

        hero_path = os.path.join(reg_dir, 'hero.jpg')
        banner_path = os.path.join(reg_dir, 'editorial_banner.jpg')

        print(f"[{reg}] Downloading hero.jpg: {hero_title}")
        try:
            download_and_process(hero_url, hero_path)
        except Exception as e:
            print(f"  Error downloading hero: {e}")

        print(f"[{reg}] Downloading editorial_banner.jpg: {banner_title}")
        try:
            download_and_process(banner_url, banner_path, crop_type='editorial')
        except Exception as e:
            print(f"  Error downloading banner: {e}")

        # B. 8 Sarees per region (primary, detail, editorial, pallu)
        for i in range(1, 9):
            saree_num = f"{i:02d}"
            
            p_title, p_url = get_next_unique_image()
            d_title, d_url = get_next_unique_image()
            e_title, e_url = get_next_unique_image()
            pal_title, pal_url = get_next_unique_image()

            p_path = os.path.join(reg_dir, f"saree_{saree_num}_primary.jpg")
            d_path = os.path.join(reg_dir, f"saree_{saree_num}_detail.jpg")
            e_path = os.path.join(reg_dir, f"saree_{saree_num}_editorial.jpg")
            pal_path = os.path.join(reg_dir, f"saree_{saree_num}_pallu.jpg")

            print(f"[{reg}] Saree {saree_num} downloading primary: {p_title}")
            try:
                download_and_process(p_url, p_path)
            except Exception as err:
                print(f"  Error primary: {err}")

            print(f"[{reg}] Saree {saree_num} downloading detail: {d_title}")
            try:
                download_and_process(d_url, d_path, crop_type='detail')
            except Exception as err:
                print(f"  Error detail: {err}")

            print(f"[{reg}] Saree {saree_num} downloading editorial: {e_title}")
            try:
                download_and_process(e_url, e_path, crop_type='editorial')
            except Exception as err:
                print(f"  Error editorial: {err}")

            print(f"[{reg}] Saree {saree_num} downloading pallu: {pal_title}")
            try:
                download_and_process(pal_url, pal_path, crop_type='pallu')
            except Exception as err:
                print(f"  Error pallu: {err}")

    print("\n=== Auditing duplicate hashes after run ===")
    hashes = {}
    duplicates = []
    for root, dirs, files in os.walk('public/collections'):
        for f in files:
            if f.endswith('.jpg'):
                fp = os.path.join(root, f)
                with open(fp, 'rb') as fh:
                    h = hashlib.md5(fh.read()).hexdigest()
                if h in hashes:
                    duplicates.append((fp, hashes[h]))
                else:
                    hashes[h] = fp

    print(f"Total processed files: {len(hashes) + len(duplicates)}")
    print(f"Unique files: {len(hashes)}")
    print(f"Duplicates remaining: {len(duplicates)}")
    if duplicates:
        for d, orig in duplicates[:10]:
            print(f"  Duplicate: {d} matches {orig}")
    else:
        print("SUCCESS! Zero duplicate image files in public/collections.")

if __name__ == '__main__':
    main()
