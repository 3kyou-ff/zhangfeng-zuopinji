import Reveal from './Reveal'
import { strengths, tools } from '../data/content'

function StrengthArt({ index }) {
  if (index === 0) {
    return (
      <svg className="str-art" viewBox="0 0 200 200" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1.2">
          <ellipse cx="100" cy="100" rx="74" ry="29" transform="rotate(-18 100 100)" opacity="0.45" />
          <ellipse cx="100" cy="100" rx="54" ry="19" transform="rotate(28 100 100)" opacity="0.28" />
        </g>
        <circle cx="100" cy="100" r="13" fill="currentColor" opacity="0.5" />
        <circle cx="42" cy="82" r="3.5" fill="currentColor" />
        <circle cx="157" cy="117" r="3" fill="#8B7BFF" />
      </svg>
    )
  }

  if (index === 1) {
    return (
      <svg className="str-art" viewBox="0 0 200 200" fill="none" aria-hidden="true">
        <g transform="rotate(-8 100 100)" stroke="currentColor" strokeWidth="1.2">
          <rect x="38" y="46" width="102" height="76" rx="10" opacity="0.22" />
          <rect x="50" y="58" width="102" height="76" rx="10" opacity="0.4" />
          <rect x="62" y="70" width="102" height="76" rx="10" fill="currentColor" fillOpacity="0.06" opacity="0.75" />
        </g>
      </svg>
    )
  }

  if (index === 2) {
    return (
      <svg className="str-art" viewBox="0 0 200 200" fill="none" aria-hidden="true">
        <line x1="36" y1="152" x2="164" y2="152" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <g fill="currentColor">
          <rect x="42" y="122" width="11" height="30" rx="5.5" opacity="0.3" />
          <rect x="63" y="104" width="11" height="48" rx="5.5" opacity="0.45" />
          <rect x="84" y="82" width="11" height="70" rx="5.5" opacity="0.6" />
          <rect x="105" y="98" width="11" height="54" rx="5.5" opacity="0.45" />
          <rect x="126" y="66" width="11" height="86" rx="5.5" opacity="0.8" />
          <rect x="147" y="112" width="11" height="40" rx="5.5" opacity="0.35" />
        </g>
        <circle cx="131.5" cy="58" r="3" fill="#8B7BFF" />
      </svg>
    )
  }

  if (index === 3) {
    return (
      <svg className="str-art" viewBox="0 0 200 200" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1.2">
          <path d="M58 128 100 106l42 22-42 22-42-22Z" fill="currentColor" fillOpacity="0.1" opacity="0.65" />
          <path d="M58 128v-13l42-22 42 22v13" opacity="0.45" />
          <path d="M72 104 114 82l42 22-42 22-42-22Z" fill="currentColor" fillOpacity="0.05" opacity="0.4" />
          <path d="M72 104V91l42-22 42 22v13" opacity="0.28" />
        </g>
        <circle cx="114" cy="82" r="3" fill="#8B7BFF" />
      </svg>
    )
  }

  if (index === 4) {
    return (
      <svg className="str-art" viewBox="0 0 200 200" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1.2">
          <path d="M100 46 150 75v58l-50 29-50-29V75Z" opacity="0.5" />
          <path d="M50 75 100 104l50-29" opacity="0.32" />
          <path d="M100 104v58" opacity="0.32" />
        </g>
        <circle cx="100" cy="46" r="3" fill="currentColor" />
        <circle cx="150" cy="133" r="3" fill="#8B7BFF" />
      </svg>
    )
  }

  return (
    <svg className="str-art" viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1" opacity="0.28">
        <path d="M70 68h60M70 100h60M70 132h60M70 68v64M100 68v64M130 68v64" />
      </g>
      <g fill="currentColor">
        <circle cx="70" cy="68" r="3.2" />
        <circle cx="100" cy="68" r="3.2" opacity="0.6" />
        <circle cx="130" cy="68" r="3.2" opacity="0.35" />
        <circle cx="70" cy="100" r="3.2" opacity="0.6" />
        <circle cx="100" cy="100" r="3.2" />
        <circle cx="130" cy="100" r="3.2" opacity="0.6" />
        <circle cx="70" cy="132" r="3.2" opacity="0.35" />
        <circle cx="100" cy="132" r="3.2" opacity="0.6" />
        <circle cx="130" cy="132" r="3.2" fill="#8B7BFF" />
      </g>
    </svg>
  )
}

export default function Strengths() {
  return (
    <section className="sec strengths" id="strengths">
      <div className="str__bg" aria-hidden="true" />
      <div className="shell">
        <Reveal className="show-head">
          <span className="eyebrow">03 — Core Strengths</span>
          <h2 className="show-title">
            Core Strengths
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6 18 18" stroke="currentColor" strokeWidth="1.4" />
              <path d="M9 18h9V9" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </h2>
          <p className="show-cn">个人优势</p>
        </Reveal>

        <div className="str__grid">
          {strengths.map((item, index) => (
            <Reveal className="str-card" key={item.index} delay={(index % 3) * 70}>
              <div className="str-card__top">
                <span className="str-card__num">{item.index}</span>
                <span className="str-card__kicker">{index < 2 ? 'CORE' : 'SYSTEM'}</span>
              </div>

              <h3 className="str-card__title">
                {item.title}
                <i>.</i>
              </h3>

              <p className="str-card__desc">{item.desc}</p>

              <span className="str-card__foot">{item.foot}</span>
              <StrengthArt index={index} />
            </Reveal>
          ))}
        </div>

        <Reveal className="toolkit">
          <span className="toolkit__label">Toolkit / 工具链</span>
          <div className="toolkit__list">
            {tools.map((tool) => (
              <span className="toolkit__item" key={tool}>
                {tool}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
