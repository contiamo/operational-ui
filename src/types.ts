import * as React from "react"

/**
 * Default HTML props that can be applied to any component.
 */
export interface DefaultProps {
  id?: string
  className?: string
}

export interface DragProps {
  draggable?: boolean
  onDragStart?: (ev: React.DragEvent<HTMLElement>) => void
  onDragEnd?: (ev: React.DragEvent<HTMLElement>) => void
  onDragEnter?: (ev: React.DragEvent<HTMLElement>) => void
  onDragExit?: (ev: React.DragEvent<HTMLElement>) => void
  onDragLeave?: (ev: React.DragEvent<HTMLElement>) => void
  onDragOver?: (ev: React.DragEvent<HTMLElement>) => void
  onDrop?: (ev: React.DragEvent<HTMLElement>) => void
}
