export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  return (
    <Tag className={`reveal ${className}`.trim()} style={{ '--d': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  )
}
