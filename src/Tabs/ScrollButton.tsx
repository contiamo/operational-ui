import * as React from "react"

export const ScrollButton: React.FC<{ onClick: any }> = ({ children, onClick, ...props }) => {
  const isDown = React.useRef<number | null>(null)
  return (
    <button
      type="button"
      onMouseDown={e => {
        onClick(e)
        isDown.current = window.setInterval(() => onClick(), 100)
      }}
      onMouseUp={() => {
        isDown.current && clearTimeout(isDown.current)
        isDown.current = null
      }}
      onMouseLeave={() => {
        isDown.current && clearTimeout(isDown.current)
        isDown.current = null
      }}
      {...props}
    >
      {children}
    </button>
  )
}
