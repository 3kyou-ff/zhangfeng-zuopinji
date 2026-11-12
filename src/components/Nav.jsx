import { useEffect, useRef, useState } from 'react'
import { nav } from '../data/content'

export default function Nav() {
  const [docked, setDocked] = useState(false)
  const [active, setActive] = useState('')
  const thresholdRef = useRef(0)
  const dockedRef = useRef(false)

  useEffect(() => {
    const apply = () => {
      const next = window.scrollY > thresholdRef.current
      if (dockedRef.current === next) return

      dockedRef.current = next
      setDocked(next)
    }

    const measure = () => {
      const hero = document.querySelector('.hero')
      thresholdRef.current = (hero?.offsetHeight ?? window.innerHeight) - 96
      apply()
    }

    measure()
    window.addEventListener('scroll', apply, { passive: true })
    window.addEventListener('resize', measure)

    return () => {
      window.removeEventListener('scroll', apply)
      window.removeEventListener('resize', measure)
    }
  }, [])

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter(Boolean)

    if (!sections.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    sections.forEach((section) => io.observe(section))
    return () => io.disconnect()
  }, [])

  return (
    <header className={`nav${docked ? ' is-docked' : ''}`}>
      <div className="nav__inner">
        <a className="nav__logo" href="#top" aria-label="回到顶部">
          <span className="nav__mark">ZF</span>
          <span className="nav__name">
            <b>张峰</b>
            <span>AIGC FILMMAKER</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="主导航">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav__link${active === item.id ? ' is-active' : ''}`}
              aria-current={active === item.id ? 'true' : undefined}
            >
              <i>{item.num}</i>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="nav__cta" href="#contact">
          联系我
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  )
}
