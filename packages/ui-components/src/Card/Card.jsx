import React from 'react'
import glamorous from 'glamorous'

const Card = ({ className, children }: { className?: string, children: mixed }) =>
  (<div className={className}>
    {children}
  </div>)

const style = ({ theme, width, padding }: { theme: THEME, width?: number, padding?: number }) => ({
  width,
  padding,
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.14)',
  backgroundColor: 'white',

  '& > img': {
    maxWidth: '100%',
  },
})

export default glamorous(Card)(style)
export { Card }
