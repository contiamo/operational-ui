import { Omit } from "emotion-theming/types/helper"
import * as React from "react"
import { Draggable, DraggableProps, Droppable, DroppableProps, DroppableStateSnapshot } from "react-beautiful-dnd"
import styled from "../utils/styled"
import ChildTree from "./ChildTree"
import { IconComponentType } from "../Icon"

interface BaseTree {
  label: string
  key?: string | number
  paddingLeft?: number
  paddingRight?: number
  highlight?: boolean
  initiallyOpen?: boolean
  tag?: string
  tagColor?: string
  disabled?: boolean
  icon?: IconComponentType
  iconColor?: string
  onClick?: (event: React.MouseEvent) => void
  onContextMenu?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  cursor?: string
  actions?: React.ReactNode
  forwardRef?: (element?: HTMLElement | null) => any
  strong?: boolean
  fontSize?: number
  fontColor?: string
  emphasized?: boolean
  monospace?: boolean
  ignoreSearchWords?: boolean
}

interface TreeWithChildren extends BaseTree {
  childNodes?: Tree[]
  draggableProps?: never
  droppableProps?: Omit<DroppableProps, "children">
}

interface TreeWithoutChildren extends BaseTree {
  childNodes?: never
  draggableProps?: Omit<DraggableProps, "children" | "index">
  droppableProps?: never
}

export type Tree = TreeWithChildren | TreeWithoutChildren

export interface TreeProps {
  trees: Tree[]
  paddingLeft?: number
  paddingRight?: number
  searchWords?: string[]
  droppableProps?: Omit<DroppableProps, "children">
  placeholder?: React.ComponentType<DroppableStateSnapshot>
  freeze?: boolean
  _level?: number
  _hasIconOffset?: boolean
}

const Container = styled.div`
  label: TreeContainer;
  user-select: none;
`

const Tree: React.SFC<TreeProps> = ({
  _level = 0,
  _hasIconOffset = false,
  paddingLeft,
  paddingRight,
  trees,
  droppableProps,
  placeholder,
  searchWords,
  freeze,
}) => {
  const isLowestLevel = trees.length === 0 || trees.some(tree => !tree.childNodes || !tree.childNodes.length)

  /**
   * If this is a category with children, no drag and drop
   * because only children can be dragged/sorted.
   */
  if (!isLowestLevel || !droppableProps) {
    return (
      <Container>
        {trees.map((treeData, index) => (
          <ChildTree
            paddingLeft={paddingLeft}
            paddingRight={paddingRight}
            level={_level}
            hasIconOffset={_hasIconOffset}
            key={index}
            {...treeData}
            searchWords={searchWords}
            freeze={freeze}
          />
        ))}
      </Container>
    )
  }

  return (
    <Droppable {...droppableProps}>
      {(droppableProvided, droppableSnapshot) => (
        <Container ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
          {trees.length ? (
            <>
              {trees.map((treeData, index) => (
                <Draggable
                  key={treeData.key !== undefined ? treeData.key : index}
                  {...treeData.draggableProps || { draggableId: treeData.label }}
                  index={index}
                >
                  {draggableProvided => {
                    return (
                      <ChildTree
                        paddingLeft={paddingLeft}
                        paddingRight={paddingRight}
                        hasIconOffset={_hasIconOffset}
                        level={_level}
                        forwardRef={draggableProvided.innerRef}
                        searchWords={searchWords}
                        freeze={freeze}
                        {...treeData}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                      />
                    )
                  }}
                </Draggable>
              ))}
            </>
          ) : (
            placeholder && React.createElement(placeholder, droppableSnapshot)
          )}
          {droppableProvided.placeholder}
        </Container>
      )}
    </Droppable>
  )
}

export default Tree
