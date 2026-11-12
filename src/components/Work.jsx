import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Reveal from './Reveal'
import { ArrowUpRight, Close } from './icons'
import { projects } from '../data/content'

const byId = (id) => projects.find((project) => project.id === id)

const film = byId('loop')
const commercial = byId('commercial')

const supporting = [
  { ...byId('brand'), sub: '品牌全案 · 包装 · 视觉规范' },
  { ...byId('poster'), sub: '系列海报 · 版式 · 视觉叙事' },
  { ...byId('ecommerce'), sub: '详情页 · 主图 · AI 场景图' },
]

function groupGallery(items) {
  return items.reduce((groups, item, index) => {
    const key = item.group || ''
    const last = groups[groups.length - 1]

    if (last && last.key === key) last.items.push({ item, index })
    else groups.push({ key, items: [{ item, index }] })

    return groups
  }, [])
}

function Play() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  )
}

export default function Work() {
  const [active, setActive] = useState(null)
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const triggerRef = useRef(null)
  const skipRestoreRef = useRef(false)

  const openProject = (event, project) => {
    triggerRef.current = event.currentTarget
    skipRestoreRef.current = false
    setActive(project)
  }

  useEffect(() => {
    if (!active) return

    const panel = panelRef.current
    const main = document.querySelector('main')
    const nav = document.querySelector('.nav')
    const previousOverflow = document.body.style.overflow

    closeRef.current?.focus()
    main?.setAttribute('inert', '')
    nav?.setAttribute('inert', '')
    document.body.style.overflow = 'hidden'

    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setActive(null)
        return
      }

      if (event.key !== 'Tab' || !panel) return

      const focusables = panel.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables.length) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      main?.removeAttribute('inert')
      nav?.removeAttribute('inert')
      if (!skipRestoreRef.current) triggerRef.current?.focus()
    }
  }, [active])

  return (
    <section className="sec work" id="work">
      <div className="work__bg" aria-hidden="true" />
      <div className="shell">
        <Reveal className="show-head">
          <span className="eyebrow">02 — Selected Works</span>
          <h2 className="show-title">
            Selected Works
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6 18 18" stroke="currentColor" strokeWidth="1.4" />
              <path d="M9 18h9V9" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </h2>
          <p className="show-cn">视觉作品</p>
        </Reveal>

        <Reveal className="work__label">
          <span>AI Video / 主作品</span>
          <i>Featured</i>
        </Reveal>

        <div className="showcase-grid">
          <Reveal className="showcase showcase--film">
            <button
              type="button"
              className="showcase__btn glow-alt"
              data-glow=""
              onClick={(event) => openProject(event, film)}
              aria-label={`查看项目：${film.title}`}
            >
              <span className="showcase__imgwrap">
                <img
                  src={film.image}
                  srcSet={`${film.imageSmall} 900w, ${film.image} 1600w`}
                  sizes="(min-width: 1180px) 62vw, 100vw"
                  alt={film.title}
                  decoding="async"
                />
              </span>
              <span className="showcase__veil" />
              <span className="showcase__tag">{film.category}</span>
              <span className="showcase__play" aria-hidden="true">
                <Play />
              </span>
              <span className="showcase__text">
                <b>{film.title}</b>
                <i>30 集全流程 · 40 min · 红果 / 抖音</i>
              </span>
            </button>
          </Reveal>

          <Reveal className="showcase showcase--side" delay={80}>
            <button
              type="button"
              className="showcase__btn glow-alt"
              data-glow=""
              onClick={(event) => openProject(event, commercial)}
              aria-label={`查看项目：${commercial.title}`}
            >
              <span className="showcase__imgwrap">
                <img
                  src={commercial.image}
                  srcSet={`${commercial.imageSmall} 900w, ${commercial.image} 1600w`}
                  sizes="(min-width: 1180px) 31vw, 100vw"
                  alt={commercial.title}
                  decoding="async"
                />
              </span>
              <span className="showcase__veil" />
              <span className="showcase__tag">{commercial.category}</span>
              <span className="showcase__play" aria-hidden="true">
                <Play />
              </span>
              <span className="showcase__text">
                <b>{commercial.title}</b>
                <i>产品卖点 → 镜头脚本 → AE 合成</i>
              </span>
            </button>
          </Reveal>
        </div>

        <Reveal className="work__label work__label--sub">
          <span>Brand · Poster · E-commerce</span>
          <i>辅助作品</i>
        </Reveal>

        <div className="showcase-sub">
          {supporting.map((project, index) => (
            <Reveal className="showcase" key={project.id} delay={index * 70}>
              <button
                type="button"
                className="showcase__btn glow-alt"
                data-glow=""
                onClick={(event) => openProject(event, project)}
                aria-label={`查看项目：${project.title}`}
              >
                <span className="showcase__imgwrap">
                  <img
                    src={project.image}
                    srcSet={`${project.imageSmall} 900w, ${project.image} 1600w`}
                    sizes="(min-width: 900px) 31vw, 100vw"
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span className="showcase__veil" />
                <span className="showcase__tag">{project.category}</span>
                <span className="showcase__text">
                  <b>{project.title}</b>
                  <i>{project.sub}</i>
                </span>
                <span className="showcase__arrow" aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active &&
        createPortal(
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            onClick={() => setActive(null)}
          >
            <div className="modal__panel" ref={panelRef} onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="modal__close"
                ref={closeRef}
                onClick={() => setActive(null)}
                aria-label="关闭"
              >
                <Close />
              </button>
              <div className="modal__media">
                <img
                  src={active.image}
                  srcSet={`${active.imageSmall} 900w, ${active.image} 1600w`}
                  sizes="(min-width: 1120px) 1040px, 92vw"
                  alt={active.title}
                  decoding="async"
                />
              </div>
              <div className="modal__body">
                <div className="modal__cat">
                  <span>
                    {active.index} / {active.category}
                  </span>
                  <span>{active.period}</span>
                </div>
                <h3 id="project-dialog-title">{active.title}</h3>
                <p>{active.desc}</p>
                <div className="modal__tags">
                  {active.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                {active.watch && (
                  <div className="modal__watch">
                    <span className="modal__watch-poster">
                      <img
                        src={active.watch.poster}
                        srcSet={`${active.watch.posterSmall} 385w, ${active.watch.poster} 700w`}
                        sizes="150px"
                        alt={`《${active.title}》播放封面`}
                        decoding="async"
                      />
                    </span>
                    <div className="modal__watch-body">
                      <span className="eyebrow">Watch / 在线观看</span>
                      <div className="modal__watch-list">
                        {active.watch.links.map((link) => (
                          <a
                            className="modal__watch-link"
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            key={link.url}
                          >
                            <span className="modal__watch-name">{link.label}</span>
                            <small>{link.meta}</small>
                            <ArrowUpRight />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {active.films?.length > 0 && active.filmLink?.url && (
                  <div className="modal__films">
                    <div className="gallery__head">
                      <span>TVC 系列 / AI Commercials</span>
                      <span>{String(active.films.length).padStart(2, '0')} films</span>
                    </div>
                    <div className="modal__films-list">
                      {active.films.map((film) => (
                        <a
                          className="film-row"
                          href={active.filmLink.url}
                          target="_blank"
                          rel="noreferrer"
                          key={film.title}
                        >
                          <span className="film-row__thumb">
                            <img
                              src={film.poster}
                              srcSet={`${film.small} 928w, ${film.poster} 1600w`}
                              sizes="208px"
                              alt={film.title}
                              style={{ objectPosition: film.position }}
                              loading="lazy"
                              decoding="async"
                            />
                            <span className="film-row__play">
                              <Play />
                            </span>
                          </span>
                          <span className="film-row__body">
                            <span className="eyebrow">Video / {film.tag}</span>
                            <b>{film.title}</b>
                            {film.meta && <i>{film.meta}</i>}
                            <span className="film-row__link">
                              在网盘观看
                              <ArrowUpRight />
                            </span>
                          </span>
                        </a>
                      ))}
                    </div>
                    <span className="modal__films-note">
                      点击任意作品，在网盘观看全片 · 提取码 {active.filmLink.code}（链接已自动填入）
                    </span>
                  </div>
                )}
                {active.gallery?.length > 0 && (
                  <div className="modal__gallery">
                    <div className="gallery__head">
                      <span>作品展示 / Case gallery</span>
                      <span>{String(active.gallery.length).padStart(2, '0')} frames</span>
                    </div>
                    {groupGallery(active.gallery).map((group) => {
                      const meta = active.galleryGroups?.[group.key]

                      return (
                        <div className="gallery__group" key={group.key || group.items[0].item.src}>
                          {meta && (
                            <div className="gallery__group-head">
                              <span>{meta.name}</span>
                              <i>{meta.en}</i>
                            </div>
                          )}
                          <div className="gallery__grid">
                            {group.items.map(({ item, index }) => (
                              <figure
                                className={`gallery__item gallery__item--${item.layout}`}
                                key={item.src}
                                style={{ '--i': index }}
                              >
                                <span className="gallery__frame">
                                  <img
                                    src={item.src}
                                    srcSet={`${item.small} 700w, ${item.src} 1400w`}
                                    sizes={
                                      item.layout === 'full'
                                        ? '(min-width: 1120px) 1040px, 92vw'
                                        : '(min-width: 1120px) 500px, 46vw'
                                    }
                                    alt={item.alt}
                                    loading="lazy"
                                    decoding="async"
                                  />
                                </span>
                                <figcaption>
                                  <i>{String(index + 1).padStart(2, '0')}</i>
                                  <span>{item.caption}</span>
                                  <em>{item.en}</em>
                                </figcaption>
                              </figure>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
                <a
                  className="btn btn--accent"
                  href="#contact"
                  onClick={() => {
                    skipRestoreRef.current = true
                    setActive(null)
                  }}
                >
                  聊聊类似项目
                  <ArrowUpRight />
                </a>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  )
}
