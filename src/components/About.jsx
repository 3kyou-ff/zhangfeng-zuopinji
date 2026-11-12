import Reveal from './Reveal'
import { experience, profile, stats } from '../data/content'

const aboutInfo = [
  { label: '求职意向', value: 'AIGC 内容制作 / AI 短剧制作' },
  { label: '服务方向', value: 'AI 短剧 · 品牌视觉 · 电商设计' },
  { label: '手机', value: profile.phone, href: profile.phoneHref },
  { label: '邮箱', value: profile.email, href: `mailto:${profile.email}` },
]

const building = ['AI 短剧系列化', '品牌视觉落地', 'AIGC 影像工作室', '电商视觉提效']

const mainStats = [
  { ...stats[0], suffix: '+' },
  { ...stats[1] },
  { ...stats[2] },
]

const toLines = (text) =>
  text
    .split(/[；。]/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 2)

export default function About() {
  const handleTilt = (event) => {
    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5

    el.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${(x * 12).toFixed(2)}deg`)
    el.style.setProperty('--gx', `${((x + 0.5) * 100).toFixed(1)}%`)
    el.style.setProperty('--gy', `${((y + 0.5) * 100).toFixed(1)}%`)
  }

  const resetTilt = (event) => {
    const el = event.currentTarget
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--gx', '50%')
    el.style.setProperty('--gy', '50%')
  }

  return (
    <section className="sec about" id="about">
      <div className="about__glow" aria-hidden="true" />
      <div className="shell">
        <Reveal className="about__head">
          <div>
            <span className="eyebrow">01 — About Me</span>
            <h2 className="about__title">
              Work Experience
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6 18 18" stroke="currentColor" strokeWidth="1.4" />
                <path d="M9 18h9V9" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </h2>
            <p className="about__cn">个人经历</p>
          </div>
        </Reveal>

        <div className="about__panel">
          <Reveal
            as="figure"
            className="about__portrait"
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
          >
            <div className="about__portrait-inner">
              <img
                src="/assets/portrait-sheep.webp"
                alt="张峰的 3D 卡通羊形象"
                width="1000"
                height="1333"
                loading="lazy"
                decoding="async"
              />
              <span className="about__portrait-glare" aria-hidden="true" />
            </div>
          </Reveal>

          <div className="about__content">
            <Reveal delay={80}>
              <span className="about__label">About Me</span>
              <h3 className="about__hi">
                Hi, I am 张峰<span>.</span>
              </h3>
              <p className="about__bio">
                我是张峰，一名把 AI 当成<em>一支剧组</em>来用的内容制作者。艺术设计学本科出身，做过品牌、电商与印刷完稿，也独立跑完
                30 集 AI 真人漫剧的全部流程——从剧本、分镜、提示词到剪辑上架。
                <br />
                我习惯把不可控的生成过程拆成可复用的流程，让风格和产能都稳定下来。
              </p>
            </Reveal>

            <Reveal delay={140} className="about__info">
              {aboutInfo.map((item) => (
                <div className="about__info-cell" key={item.label}>
                  <span>{item.label}</span>
                  {item.href ? <a href={item.href}>{item.value}</a> : <b>{item.value}</b>}
                </div>
              ))}
            </Reveal>

            <Reveal delay={180} className="about__stats">
              {mainStats.map((item) => (
                <div className="about__stat" key={item.label}>
                  <div className="about__stat-num">
                    {item.value}
                    {item.suffix && <sup>{item.suffix}</sup>}
                    <i>{item.unit}</i>
                  </div>
                  <div className="about__stat-label">{item.label}</div>
                </div>
              ))}
            </Reveal>

            <Reveal delay={220} className="about__now">
              <div>
                <span className="about__label">Now Building</span>
                <div className="about__now-tags">
                  {building.map((item) => (
                    <span className="tag" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <span className="about__now-note">进行中的项目</span>
            </Reveal>
          </div>
        </div>

        <div className="about__history">
          <Reveal className="about__history-head">
            <span className="about__label">Work History</span>
            <span className="about__history-cn">工作经历</span>
          </Reveal>

          <div className="about__history-grid">
            {experience.map((item, index) => (
              <Reveal
                as="article"
                className="history-item"
                key={`${item.company}-${item.period}`}
                delay={index * 60}
              >
                <span className="history-item__date">{item.period}</span>
                <h4>{item.company}</h4>
                <span className="history-item__role">{item.role}</span>
                <ul>
                  {toLines(item.desc).map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
