import Reveal from './Reveal'
import { ArrowUpRight } from './icons'
import { profile } from '../data/content'

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact__bg" aria-hidden="true" />

      <div className="shell contact__shell">
        <div className="contact__left">
          <Reveal>
            <span className="eyebrow">04 — Contact / 联系方式</span>
          </Reveal>

          <Reveal delay={60}>
            <h2 className="contact__display">
              Let&apos;s make
              <br />
              the <em>next</em>
              <br />
              story
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6 18 18" stroke="currentColor" strokeWidth="1.5" />
                <path d="M9 18h9V9" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </h2>
          </Reveal>

          <Reveal className="contact__lead" delay={120}>
            <p>
              下一部短剧、下一支品牌片，或一个还没成形的画面想法，都可以直接找我。
              现居江西，面向全国，可接受线上测试或试做镜头。
            </p>
            <a className="contact__cta" href={`mailto:${profile.email}`}>
              聊聊合作
              <ArrowUpRight />
            </a>
          </Reveal>
        </div>

        <Reveal className="contact__card glow-alt" data-glow="" delay={180}>
          <div className="contact__card-head">
            <span>Contact</span>
            <i className="contact__status">Open to work</i>
          </div>

          <dl className="contact__list">
            <div className="contact__row">
              <dt>手机</dt>
              <dd>
                <a href={profile.phoneHref}>{profile.phone}</a>
              </dd>
            </div>
            <div className="contact__row">
              <dt>微信</dt>
              <dd>{profile.wechat}</dd>
            </div>
            <div className="contact__row">
              <dt>邮箱</dt>
              <dd>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </dd>
            </div>
          </dl>

          <p className="contact__role">AIGC 内容制作 / AI 短剧 / 视觉设计</p>

          <div className="contact__qr">
            <img
              src="/assets/wechat-qr.webp"
              alt="张峰的微信二维码"
              width="520"
              height="522"
              loading="lazy"
              decoding="async"
            />
            <span>
              微信扫码
              <br />
              直接聊需求
            </span>
          </div>
        </Reveal>

        <div className="contact__footer">
          <span>© 2026 张峰 · AIGC Filmmaker</span>
          <span>{profile.location}</span>
          <a className="contact__top" href="#top">
            回到顶部 ↑
          </a>
        </div>
      </div>
    </section>
  )
}
