'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useStore } from '@/store/useStore';
import { ALL_SAREES, ALL_STATE_METAS } from '@/data/collections/registry';
import type { SareeProduct } from '@/data/collections/types';
import { PRIYA_EDITORIAL_MODEL } from '@/data/collections/colorways';

const JOURNEY = ALL_STATE_METAS.map((state) => ({
  state,
  saree: ALL_SAREES.find((item) => item.region === state.slug) as SareeProduct,
})).filter((item) => item.saree);
const PREMIUM_EASE = [0.4, 0, 0.2, 1];

export default function LoomJourney() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const { setSelectedProductForModal, setActiveModal } = useStore();
  const item = JOURNEY[active];

  useEffect(() => {
    if (!root.current || !stage.current || reduceMotion || JOURNEY.length < 2) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add('(min-width: 900px)', () => {
      const playhead = { value: 0 };
      const tween = gsap.to(playhead, {
        value: 1,
        ease: 'none',
        onUpdate: () => {
          setActive(Math.min(JOURNEY.length - 1, Math.floor(playhead.value * JOURNEY.length)));
        },
        scrollTrigger: {
          trigger: root.current,
          pin: stage.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * JOURNEY.length}`,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      triggerRef.current = tween.scrollTrigger ?? null;
      return () => {
        triggerRef.current = null;
      };
    });
    return () => media.revert();
  }, [reduceMotion]);

  if (!item) return null;

  const handleSelectRegion = (index: number) => {
    setActive(index);
    const st = triggerRef.current;
    if (st && typeof window !== 'undefined' && window.innerWidth >= 900) {
      const fraction = index === 0 ? 0.001 : (index + 0.1) / JOURNEY.length;
      const targetScroll = st.start + (st.end - st.start) * fraction;
      window.scrollTo({
        top: targetScroll,
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
    }
  };

  const openConcept = () => {
    setSelectedProductForModal(item.saree);
    setActiveModal('quickshop');
  };

  return (
    <section ref={root} id="loom-journey" className="loom-journey">
      <div ref={stage} className="loom-journey__stage">
        <motion.div
          className="loom-journey__intro"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: PREMIUM_EASE }}
        >
          <p className="loom-kicker"><Sparkles size={13} /> Archival Weave Survey · Six Traditions</p>
          <h2>Six Regional Looms.<br /><em>One Documented Archive.</em></h2>
          <p className="loom-journey__hint"><ArrowDown size={14} /> Scroll to travel the loom</p>
        </motion.div>

        <div className="loom-journey__visual" aria-label={`${item.state.name} design study`}>
          <div className="loom-journey__halo" style={{ '--loom-accent': item.state.glowColor } as CSSProperties} />
          <AnimatePresence mode="wait">
            <motion.div
              key={item.saree.id}
              className="loom-journey__image-wrap group"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, rotate: 1 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotate: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14, rotate: -1 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.48, ease: PREMIUM_EASE }}
            >
              <img
                src={PRIYA_EDITORIAL_MODEL.images[item.state.slug]}
                alt={`Illustrative model styling for the ${item.state.name} ${item.saree.craft} design study`}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                onError={(event) => {
                  const image = event.currentTarget;
                  if (!image.dataset.fallbackUsed) {
                    image.dataset.fallbackUsed = 'true';
                    image.src = PRIYA_EDITORIAL_MODEL.images[item.state.slug];
                  } else {
                    image.style.display = 'none';
                  }
                }}
              />
              <span className="loom-journey__image-note flex items-center gap-1.5">
                <Sparkles size={11} className="text-[#E6B83A]" />
                <span>Illustrative model · {item.state.name} design study</span>
              </span>
            </motion.div>
          </AnimatePresence>
          <div className="loom-journey__counter">0{active + 1}<span> / 0{JOURNEY.length}</span></div>
        </div>

        <div className="sr-only" role="status" aria-atomic="true">
          Selected region: {item.state.name}. Design study: {item.saree.name}.
        </div>

        <div className="loom-journey__copy">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.state.slug}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.42, ease: PREMIUM_EASE }}
            >
              <p className="loom-kicker">{item.state.hindiName}</p>
              <h3>{item.state.name}</h3>
              <p className="loom-journey__tagline">{item.state.tagline}</p>
              <div className="loom-journey__rule" />
              <p className="loom-journey__craft">{item.state.craftOverview}</p>
              <p className="loom-journey__product">{item.saree.name}</p>
              <p className="loom-journey__price">{item.saree.priceDisplay}</p>
              <motion.button
                type="button"
                onClick={openConcept}
                className="loom-journey__cta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
                whileHover={reduceMotion ? undefined : { x: 4 }}
                whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                transition={{ duration: 0.18, ease: PREMIUM_EASE }}
              >
                Explore design study <ArrowUpRight size={16} />
              </motion.button>
            </motion.div>
          </AnimatePresence>
          <div className="loom-journey__regions" role="group" aria-label="Choose a region">
            {JOURNEY.map(({ state }, index) => (
              <button
                key={state.slug}
                type="button"
                onClick={() => handleSelectRegion(index)}
                className={`${active === index ? 'is-active ' : ''}w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]`}
                aria-label={`Explore ${state.name}`}
                aria-pressed={active === index}
              >
                <span style={{ backgroundColor: state.accentColor }} />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="loom-journey__mobile-nav">
        {JOURNEY.map(({ state }, index) => (
          <button
            key={state.slug}
            type="button"
            onClick={() => handleSelectRegion(index)}
            className={`${active === index ? 'is-active ' : ''}min-h-[44px] px-3.5 py-2.5 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]`}
            aria-pressed={active === index}
          >
            {state.name.split(' ')[0]}
          </button>
        ))}
      </div>
      <div className="loom-journey__scroll-spacer" aria-hidden="true" />
    </section>
  );
}
