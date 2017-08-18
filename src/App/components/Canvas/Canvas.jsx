// @flow
import React from 'react'
import glamorous from 'glamorous'

const Canvas = ({ className, children }: { className: string, children: HTMLElement }) =>
  (<div className={className}>
    <div className="Canvas__body">
      {children}
    </div>
  </div>)

const styles = ({ theme }: { theme: THEME }): {} => ({
  display: 'flex',
  alignItems: 'flex-start',
  height: '100%',
  overflow: 'auto',
  WebkitOverflowScrolling: 'touch',

  '& a:link, & a:visited': {
    color: theme.colors.primary,
  },

  '& a:hover': {
    color: theme.colors.secondary,
  },

  '& .Canvas__body': {
    maxWidth: 768,
  },

  '& .playground': {
    display: 'flex',
    width: '80vw',
    maxWidth: 1500,
  },

  '& .playgroundCode, & .playgroundPreview': {
    flex: '1 1 50%',
  },
  '& .playgroundPreview': {
    marginLeft: 16,
  },
  '& .CodeMirror-wrap.CodeMirror': {
    minHeight: 480,
  },
})

export default glamorous(Canvas)(styles)
export { Canvas }
