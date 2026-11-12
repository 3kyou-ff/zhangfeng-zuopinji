import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from './icons'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const tickerItems = [
  'AI 真人漫剧',
  '30 集全流程',
  '角色一致性',
  '批量出图',
  'AE 剪辑',
  '电商视觉',
  '品牌设计',
  '商业短片',
  '可接受线上试稿',
  '剧本 → 成片',
]

const heroTools = [
  { label: 'Ps', color: '#31a8ff', bg: '#001e36' },
  { label: 'Ai', color: '#ff9a00', bg: '#330000' },
  { label: 'Ae', color: '#9d9dff', bg: '#00005b' },
  { label: 'Pr', color: '#ea77ff', bg: '#2a0033' },
  { label: '剪', color: '#f2f2ec', bg: '#111111' },
  { label: 'MJ', color: '#f2f2ec', bg: '#111111' },
  { label: 'NB', color: '#d7ff3e', bg: '#151a00' },
]

export function Ticker() {
  const items = [...tickerItems, ...tickerItems]
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {items.map((item, i) => (
          <span className="ticker__item" key={`${item}-${i}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

// 省流量 / 弱网环境下不加载 4MB 的背景视频，只保留首屏海报
function canLoadVideo() {
  if (prefersReducedMotion()) return false
  if (typeof navigator === 'undefined') return false

  // 移动端直接用海报，避免 4MB 视频流量
  if (window.matchMedia('(max-width: 760px)').matches) return false

  const conn = navigator.connection
  if (!conn) return true
  if (conn.saveData) return false
  if (conn.effectiveType && /(^|-)2g$/.test(conn.effectiveType)) return false

  return true
}

export default function Hero() {
  const [videoFailed, setVideoFailed] = useState(false)
  const [canAutoplay] = useState(canLoadVideo)
  const [videoReady, setVideoReady] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const videoRef = useRef(null)
  const sectionRef = useRef(null)

  const showVideo = canAutoplay && !videoFailed

  useEffect(() => {
    if (!showVideo) return

    const timer = window.setTimeout(() => setVideoReady(true), 900)
    return () => window.clearTimeout(timer)
  }, [showVideo])

  // 离开首屏时暂停背景视频，避免滚动浏览时持续解码耗电
  useEffect(() => {
    if (!showVideo || !videoReady) return

    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!userPaused) video.play().catch(() => {})
        } else if (!video.paused) {
          video.pause()
        }
      },
      { threshold: 0.15 },
    )

    io.observe(section)
    return () => io.disconnect()
  }, [showVideo, videoReady, userPaused])

  const toggleMotion = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play()
      setUserPaused(false)
    } else {
      video.pause()
      setUserPaused(true)
    }
  }

  return (
    <section className="hero" id="top" ref={sectionRef}>
      <div className="hero__media">
        {showVideo && videoReady && (
          <video
            ref={videoRef}
            src="/assets/hero-loop.mp4"
            poster="/assets/hero-poster.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onError={() => setVideoFailed(true)}
          />
        )}
      </div>
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__inner shell">
        <div className="hero__top">
          <span className="eyebrow">Portfolio 2026 — AIGC Filmmaking</span>

          <a className="hero__arrow" href="#work" aria-label="查看精选项目">
            <span>Selected Works</span>
            <svg viewBox="0 0 168 24" fill="none" aria-hidden="true">
              <path d="M0 12h164" stroke="currentColor" strokeWidth="1.1" />
              <path d="M150 1.5 166 12l-16 10.5" stroke="currentColor" strokeWidth="1.1" />
            </svg>
          </a>
        </div>

        <div className="hero__main">
          <h1 className="hero__display">
            <span className="hero__line">
              <span>AI Short Drama</span>
            </span>
            <span className="hero__line">
              <span>
                Solo <em>Crew</em>
              </span>
            </span>
          </h1>

          <p className="hero__cn">一个人，一支剧组</p>
          <p className="hero__lede">
            从剧本、分镜、提示词到成片，30 集 AI 真人漫剧全流程独立交付。
            <br />
            用设计功底控制画面，用工程化流程控制产能。
          </p>

          <div className="hero__role">
            <span>AI 短剧</span>
            <i>/</i>
            <span>AIGC 内容制作</span>
            <i>/</i>
            <span>视觉设计</span>
          </div>
          <span className="hero__rule" aria-hidden="true" />

          <div className="hero__tools">
            <div className="hero__icons">
              {heroTools.map((tool) => (
                <span
                  className="tool-icon"
                  key={tool.label}
                  title={tool.label === 'NB' ? 'Nano Banana' : tool.label}
                  style={{ '--tool-color': tool.color, '--tool-bg': tool.bg }}
                >
                  {tool.label}
                </span>
              ))}
            </div>
            <a className="btn btn--accent hero__cta" href="#contact">
              聊聊合作
              <ArrowUpRight />
            </a>
          </div>
        </div>

        <div className="hero__foot">
          <span className="hero__path">
            剧本 <i>/</i> 分镜 <i>/</i> 生成 <i>/</i> 剪辑 <i>/</i> 上架
          </span>
          <span>30 集 · 40 分钟 · 1 天 1 集</span>
          <span className="hero__foot-actions">
            {showVideo && videoReady && (
              <button type="button" className="hero__motion" onClick={toggleMotion}>
                {userPaused ? '播放背景' : '暂停背景'}
              </button>
            )}
            <a className="hero__scroll" href="#about">
              Scroll to explore
            </a>
          </span>
        </div>
      </div>
    </section>
  )
}
