// Photo placeholder. Pass `src` to show the real image; without it the labelled placeholder shows.
export default function Ph({ label, tone = 'sand', className = '', src, alt, focus, ...rest }) {
  if (src) {
    return (
      <div className={`ph ph-photo ${className}`} {...rest}>
        <img src={src} alt={alt || label || ''} style={focus ? { objectPosition: focus } : undefined} />
      </div>
    )
  }
  return (
    <div className={`ph ph-${tone} ${className}`} {...rest}>
      <span className="ph-label">{label}</span>
    </div>
  )
}
