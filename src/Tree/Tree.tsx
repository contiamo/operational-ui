import { Omit } from "emotion-theming/types/helper"
import * as React from "react"
import { Draggable, DraggableProps, Droppable, DroppableProps, DroppableStateSnapshot } from "react-beautiful-dnd"
import styled from "../utils/styled"
import ChildTree from "./ChildTree"
import { IconComponentType } from "../Icon/Icon"

interface BaseTree {
  label: string
  highlight?: boolean
  initiallyOpen?: boolean
  tag?: string
  disabled?: boolean
  color?: string
  icon?: IconComponentType
  iconColor?: string
  onClick?: () => void
  cursor?: string
  onRemove?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  forwardRef?: (element?: HTMLElement | null) => any
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
  droppableProps?: Omit<DroppableProps, "children">
  placeholder?: React.ComponentType<DroppableStateSnapshot>
  _extraOffset?: boolean // internal props to deal with the extra offset (tag)
}

const Container = styled("div")<{ _extraOffset: boolean }>`
  user-select: none;
  & {
    margin-left: ${({ _extraOffset }) => (_extraOffset ? 42 : 16)}px;
  }
`

const Tree: React.SFC<TreeProps> = ({ trees, droppableProps, placeholder, _extraOffset }) => {
  const isLowestLevel = trees.length === 0 || trees.some(tree => !tree.childNodes || !tree.childNodes.length)

  /**
   * If this is a category with children, no drag and drop
   * because only children can be dragged/sorted.
   */
  if (!isLowestLevel || !droppableProps) {
    return (
      <Container _extraOffset={Boolean(_extraOffset)}>
        {trees.map((treeData, index) => (
          <ChildTree key={index} {...treeData} />
        ))}
      </Container>
    )
  }

  return (
    <Droppable {...droppableProps}>
      {(droppableProvided, droppableSnapshot) => (
        <Container
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
          _extraOffset={Boolean(_extraOffset)}
        >
          {trees.length ? (
            <>
              {trees.map((treeData, index) => (
                <Draggable key={index} {...treeData.draggableProps || { draggableId: treeData.label }} index={index}>
                  {draggableProvided => {
                    return (
                      <ChildTree
                        forwardRef={draggableProvided.innerRef}
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
