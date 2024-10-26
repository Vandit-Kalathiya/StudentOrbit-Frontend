import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

const useLenisScroll = (ignoredRefs = []) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      wheelMultiplier: 1.2,
    });

    const isLenisIgnored = (target) => {
      return ignoredRefs.some(ref => ref.current && ref.current.contains(target));
    };

    const raf = (time) => {
      if (!isLenisIgnored(document.activeElement)) {
        lenis.raf(time);
      }
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const preventLenisScroll = (event) => {
      if (isLenisIgnored(event.target)) {
        event.stopPropagation();
      }
    };

    document.addEventListener('wheel', preventLenisScroll, { passive: false });
    document.addEventListener('touchmove', preventLenisScroll, { passive: false });

    return () => {
      document.removeEventListener('wheel', preventLenisScroll);
      document.removeEventListener('touchmove', preventLenisScroll);
    };
  }, [ignoredRefs]);
};

export default useLenisScroll;
