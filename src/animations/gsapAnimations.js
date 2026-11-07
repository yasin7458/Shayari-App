import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Hero entrance animation
export const animateHero = (containerRef, titleRef, subtitleRef, buttonsRef, statsRef) => {
  if (prefersReducedMotion()) return null;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (titleRef?.current) {
    tl.fromTo(
      titleRef.current.children,
      { opacity: 0, y: 40, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.15 }
    );
  }

  if (subtitleRef?.current) {
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.5'
    );
  }

  if (buttonsRef?.current) {
    tl.fromTo(
      buttonsRef.current.children,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12 },
      '-=0.4'
    );
  }

  if (statsRef?.current) {
    tl.fromTo(
      statsRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
      '-=0.3'
    );
  }

  return tl;
};

// Staggered cards entrance with ScrollTrigger
export const animateCardsStagger = (cardsContainerRef) => {
  if (prefersReducedMotion() || !cardsContainerRef?.current) return null;

  const cards = cardsContainerRef.current.children;
  if (!cards || cards.length === 0) return null;

  return gsap.fromTo(
    cards,
    { opacity: 0, y: 35, scale: 0.96 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cardsContainerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
};

// Poetry line by line text reveal
export const animatePoetryReveal = (linesContainerRef) => {
  if (!linesContainerRef?.current) return null;
  if (prefersReducedMotion()) {
    gsap.set(linesContainerRef.current.children, { opacity: 1, y: 0 });
    return null;
  }

  const lines = linesContainerRef.current.querySelectorAll('.poetry-line');
  return gsap.fromTo(
    lines,
    { opacity: 0, y: 25, filter: 'blur(4px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.9,
      stagger: 0.35,
      ease: 'power3.out',
    }
  );
};

// Floating gold particle animation
export const animateFloatingDust = (element) => {
  if (prefersReducedMotion() || !element) return null;

  return gsap.to(element, {
    y: '+=18',
    x: '+=10',
    rotation: '+=15',
    duration: 3 + Math.random() * 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
};

// Page fade and slide entrance
export const animatePageEnter = (pageRef) => {
  if (prefersReducedMotion() || !pageRef?.current) return null;

  return gsap.fromTo(
    pageRef.current,
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
  );
};
