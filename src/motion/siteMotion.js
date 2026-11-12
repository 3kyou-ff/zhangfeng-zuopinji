import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 开发环境关闭帧延迟补偿，避免低帧率预览时动画被人为拖慢
if (import.meta.env.DEV) gsap.ticker.lagSmoothing(0)

const EASE = 'expo.out'
const ENTER = 'top 84%'

function heroIntro() {
  const tl = gsap.timeline({ defaults: { ease: EASE } })
  const lines = gsap.utils.toArray('.hero__line > span')

  tl.fromTo(
    '.hero__media',
    { clipPath: 'inset(17% 11% 17% 11%)' },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.9,
      ease: 'expo.inOut',
      clearProps: 'clipPath',
    },
    0,
  )
    .from('.hero__glow', { opacity: 0, duration: 1.8 }, 0.15)
    .from(
      '.nav__inner',
      { yPercent: -130, opacity: 0, duration: 1.1, clearProps: 'transform,opacity' },
      0.2,
    )
    .from(
      '.nav__link',
      { y: 12, opacity: 0, duration: 0.8, stagger: 0.06, clearProps: 'transform,opacity' },
      0.75,
    )
    .from(
      '.nav__cta',
      { y: 12, opacity: 0, duration: 0.8, clearProps: 'transform,opacity' },
      0.95,
    )
    .from('.hero__top .eyebrow', { y: 16, opacity: 0, duration: 0.9 }, 0.5)
    .from('.hero__arrow', { y: 16, opacity: 0, duration: 0.9 }, 0.58)
    .fromTo(
      lines,
      { yPercent: 118, scaleY: 1.08, skewY: 5 },
      { yPercent: 0, scaleY: 1, skewY: 0, duration: 1.6, stagger: 0.17 },
      0.45,
    )
    .from('.hero__cn', { y: 28, opacity: 0, duration: 1 }, 1.15)
    .from('.hero__lede', { y: 24, opacity: 0, duration: 1 }, 1.25)
    .from('.hero__role', { y: 22, opacity: 0, duration: 1 }, 1.35)
    .from('.hero__rule', { scaleX: 0, transformOrigin: 'left center', duration: 0.9 }, 1.45)
    .from(
      '.tool-icon',
      { y: 20, opacity: 0, scale: 0.82, duration: 0.8, stagger: 0.045 },
      1.45,
    )
    .from('.hero__cta', { y: 20, opacity: 0, duration: 0.9 }, 1.6)
    .from('.hero__foot', { y: 18, opacity: 0, duration: 0.9 }, 1.7)
    .from('.ticker', { opacity: 0, duration: 0.9 }, 1.85)
}

function titles() {
  gsap.utils.toArray('.show-title, .about__title').forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: 'inset(0% 0% 104% 0%)', yPercent: 22, scaleY: 1.07 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        yPercent: 0,
        scaleY: 1,
        transformOrigin: 'left bottom',
        duration: 1.5,
        ease: EASE,
        clearProps: 'clipPath,transform',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      },
    )
  })

  gsap.utils.toArray('.show-head, .about__head').forEach((group) => {
    const eyebrow = group.querySelector('.eyebrow')
    const cn = group.querySelector('.show-cn, .about__cn')
    const tl = gsap.timeline({
      scrollTrigger: { trigger: group, start: 'top 90%', once: true },
      defaults: { ease: EASE },
    })

    if (eyebrow) tl.from(eyebrow, { y: 18, opacity: 0, duration: 1 }, 0.1)
    if (cn) tl.from(cn, { y: 20, opacity: 0, duration: 1 }, 0.28)
  })

  gsap.utils.toArray('.show-title svg, .about__title svg').forEach((icon) => {
    gsap.from(icon, {
      scale: 0,
      rotate: -35,
      opacity: 0,
      duration: 1,
      ease: 'back.out(2)',
      scrollTrigger: { trigger: icon, start: 'top 90%', once: true },
      delay: 0.35,
    })
  })
}

function cardBatches() {
  const batches = [
    {
      selector: '.showcase',
      from: { y: 84, opacity: 0, scale: 0.965 },
      duration: 1.35,
      stagger: 0.12,
      start: 'top 86%',
    },
    {
      selector: '.str-card',
      from: { y: 78, opacity: 0, scale: 0.97 },
      duration: 1.25,
      stagger: 0.1,
      start: 'top 88%',
    },
    {
      selector: '.history-item',
      from: { y: 56, opacity: 0 },
      duration: 1.15,
      stagger: 0.09,
      start: 'top 90%',
    },
    {
      selector: '.about__info-cell',
      from: { y: 24, opacity: 0 },
      duration: 0.9,
      stagger: 0.06,
      start: 'top 92%',
    },
    {
      selector: '.about__stat',
      from: { y: 26, opacity: 0 },
      duration: 0.9,
      stagger: 0.07,
      start: 'top 92%',
    },
    {
      selector: '.toolkit__item',
      from: { y: 16, opacity: 0 },
      duration: 0.7,
      stagger: 0.025,
      start: 'top 94%',
    },
  ]

  batches.forEach(({ selector, from, duration, stagger, start }) => {
    const targets = gsap.utils.toArray(selector)
    if (!targets.length) return

    gsap.set(targets, from)

    const show = (batch) =>
      gsap.to(batch, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration,
        stagger,
        ease: EASE,
        clearProps: 'transform,opacity',
        delay: 0.12,
      })

    ScrollTrigger.batch(targets, {
      start,
      once: true,
      onEnter: show,
      onEnterBack: show,
    })
  })

  gsap.utils.toArray('.work__label, .about__history-head, .about__now, .toolkit').forEach(
    (el) => {
      gsap.from(el, {
        y: 22,
        opacity: 0,
        duration: 1,
        ease: EASE,
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      })
    },
  )
}

function mediaMotion() {
  gsap.utils.toArray('.showcase__imgwrap').forEach((wrap) => {
    gsap.fromTo(
      wrap,
      { clipPath: 'inset(16% 0% 16% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.6,
        ease: EASE,
        clearProps: 'clipPath',
        scrollTrigger: { trigger: wrap, start: ENTER, once: true },
      },
    )

    gsap.fromTo(
      wrap,
      { yPercent: -3.2 },
      {
        yPercent: 3.2,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.7,
        },
      },
    )
  })

  gsap.fromTo(
    '.about__portrait',
    { clipPath: 'inset(0% 0% 100% 0%)', y: 34 },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      y: 0,
      duration: 1.5,
      ease: EASE,
      clearProps: 'clipPath,transform',
      scrollTrigger: { trigger: '.about__portrait', start: 'top 88%', once: true },
    },
  )

  gsap.utils.toArray('.contact__display').forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: 'inset(0% 0% 102% 0%)', yPercent: 16 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        yPercent: 0,
        duration: 1.6,
        ease: EASE,
        clearProps: 'clipPath,transform',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      },
    )
  })

  gsap.from('.contact__card', {
    y: 76,
    opacity: 0,
    scale: 0.975,
    duration: 1.4,
    ease: EASE,
    clearProps: 'transform,opacity',
    scrollTrigger: { trigger: '.contact', start: 'top 55%', once: true },
    delay: 0.15,
  })

  gsap.from('.contact__lead > *', {
    y: 26,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: EASE,
    scrollTrigger: { trigger: '.contact__lead', start: 'top 90%', once: true },
  })
}

export function initSiteMotion() {
  if (typeof window === 'undefined') return () => {}

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (reduce.matches) return () => {}

  // 清理上一次挂载可能残留的内联 transform，避免 from() 把旧位移当成终值
  gsap.set('.nav__inner, .nav__link, .nav__cta, .hero__line > span', {
    clearProps: 'transform,opacity',
  })

  const ctx = gsap.context(() => {
    heroIntro()
    titles()
    cardBatches()
    mediaMotion()
  })

  const refresh = () => ScrollTrigger.refresh()

  let resizeTimer = 0
  const onResize = () => {
    window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(refresh, 200)
  }

  if (document.fonts) document.fonts.ready.then(refresh)
  window.addEventListener('load', refresh)
  window.addEventListener('resize', onResize)

  return () => {
    window.clearTimeout(resizeTimer)
    window.removeEventListener('load', refresh)
    window.removeEventListener('resize', onResize)
    ctx.revert()
  }
}
