import { useEffect, useLayoutEffect, useRef } from 'react'
import Nav from './components/Nav'
import Hero, { Ticker } from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Strengths from './components/Strengths'
import Contact from './components/Contact'
import { initSiteMotion } from './motion/siteMotion'

function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      if (barRef.current) {
        barRef.current.style.width = `${max > 0 ? (el.scrollTop / max) * 100 : 0}%`
      }
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return <div className="progress" ref={barRef} aria-hidden="true" />
}

export default function App() {
  // 视口外的板块暂停装饰性动画（极光/网格/跑马灯），减少常驻合成层开销
  useEffect(() => {
    const targets = document.querySelectorAll('main > section, main > .ticker')
    if (!targets.length || !('IntersectionObserver' in window)) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.removeAttribute('data-idle')
          else entry.target.setAttribute('data-idle', '')
        })
      },
      { rootMargin: '200px 0px' },
    )

    targets.forEach((target) => io.observe(target))
    return () => io.disconnect()
  }, [])

  useLayoutEffect(() => {
    const cleanup = initSiteMotion()
    return cleanup
  }, [])

  useEffect(() => {
    const id = window.location.hash.replace('#', '')
    if (!id) return

    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
    }, 80)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const selector =
      '.btn, .nav__cta, .showcase__btn, .modal__close, .contact__cta, .contact__top, .hero__arrow'

    const handleMove = (event) => {
      if (event.pointerType === 'touch') return

      const target = event.target.closest(selector)
      if (!target) return

      const rect = target.getBoundingClientRect()
      const x = Math.max(-0.5, Math.min(0.5, (event.clientX - rect.left) / rect.width - 0.5))
      const y = Math.max(-0.5, Math.min(0.5, (event.clientY - rect.top) / rect.height - 0.5))
      const max = rect.width > 520 ? 3.2 : rect.width > 260 ? 5 : 8

      target.style.setProperty('--rx', `${(-y * max).toFixed(2)}deg`)
      target.style.setProperty('--ry', `${(x * max).toFixed(2)}deg`)
      target.style.setProperty('--gx', `${((x + 0.5) * 100).toFixed(1)}%`)
      target.style.setProperty('--gy', `${((y + 0.5) * 100).toFixed(1)}%`)
    }

    const handleOut = (event) => {
      const target = event.target.closest(selector)
      if (!target) return
      if (event.relatedTarget && target.contains(event.relatedTarget)) return

      target.style.setProperty('--rx', '0deg')
      target.style.setProperty('--ry', '0deg')
      target.style.setProperty('--gx', '50%')
      target.style.setProperty('--gy', '50%')
    }

    document.addEventListener('pointermove', handleMove)
    document.addEventListener('pointerout', handleOut)

    return () => {
      document.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerout', handleOut)
    }
  }, [])

  useEffect(() => {
    const auto =
      '.btn, .nav__inner, .nav__cta, .hero__arrow, .tool-icon, .tag, .toolkit__item, .contact__cta, .contact__top, .history-item__role, .modal__close, .str-card, .about__portrait'

    let frame = 0
    let current = null
    let point = null

    const paint = () => {
      frame = 0
      if (!current || !point) return
      const rect = current.getBoundingClientRect()
      current.style.setProperty('--mx', `${point.x - rect.left}px`)
      current.style.setProperty('--my', `${point.y - rect.top}px`)
    }

    const onMove = (event) => {
      if (event.pointerType === 'touch') return

      const target = event.target
      if (!target?.closest) return

      let el = target.closest('[data-glow]')
      if (!el) {
        const fallback = target.closest(auto)
        if (fallback) {
          fallback.setAttribute('data-glow', '')
          el = fallback
        }
      }

      if (el !== current) {
        current?.classList.remove('is-glow')
        current = el
        current?.classList.add('is-glow')
      }

      if (!current) return

      point = { x: event.clientX, y: event.clientY }
      if (!frame) frame = window.requestAnimationFrame(paint)
    }

    const onOut = (event) => {
      if (!current) return
      if (event.relatedTarget && current.contains(event.relatedTarget)) return
      current.classList.remove('is-glow')
      current = null
      point = null
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerout', onOut)
    window.addEventListener('blur', onOut)

    return () => {
      window.cancelAnimationFrame(frame)
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerout', onOut)
      window.removeEventListener('blur', onOut)
    }
  }, [])

  return (
    <>
      <a className="skip" href="#work">
        跳到精选作品
      </a>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Work />
        <Strengths />
        <Contact />
      </main>
    </>
  )
}
