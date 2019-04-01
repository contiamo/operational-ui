import { Omit } from "emotion-theming/types/helper"
import * as React from "react"
import { Draggable, DraggableProps, Droppable, DroppableProps } from "react-beautiful-dnd"
import styled from "../utils/styled"
import ChildTree from "./ChildTree"

interface BaseTree {
  label: string
  highlight?: boolean
  initiallyOpen?: boolean
  tag?: string
  disabled?: boolean
  color?: string
  onClick?: () => void
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
}

const Container = styled("div")`
  user-select: none;
  & & {
    margin-left: ${({ theme }) => theme.space.content}px;
  }
`

const Tree: React.SFC<TreeProps> = ({ trees, droppableProps }) => {
  const isLowestLevel = trees.some(tree => !tree.childNodes || !tree.childNodes.length)

  /**
   * If this is a category with children, no drag and drop
   * because only children can be dragged/sorted.
   */
  if (!isLowestLevel || !droppableProps) {
    return (
      <Container>
        {trees.map((treeData, index) => (
          <ChildTree key={index} {...treeData} />
        ))}
      </Container>
    )
  }

  return (
    <Droppable {...droppableProps}>
      {droppableProvided => (
        <Container ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
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
          {droppableProvided.placeholder}
        </Container>
      )}
    </Droppable>
  )
}

export default Tree
