import * as React from "react"
import { Draggable, Droppable, DropResult, ResponderProvided } from "react-beautiful-dnd"
import styled from "../utils/styled"
import ChildTree from "./ChildTree"

export interface Tree {
  label: string
  highlight?: boolean
  childNodes?: Tree[]
  initiallyOpen?: boolean
  tag?: string
  disabled?: boolean
  color?: string
  onClick?: () => void
  onRemove?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  forwardRef?: (element?: HTMLElement | null) => any
}

export interface TreeProps {
  trees: Tree[]
  draggable?: boolean
  onDrop?: (result: DropResult, provided: ResponderProvided) => void
  id?: string
}

const Container = styled("div")`
  user-select: none;
  & & {
    margin-left: ${({ theme }) => theme.space.content}px;
  }
`

const Tree: React.SFC<TreeProps> = ({ trees, id, draggable }) => {
  const isLowestLevel = trees.some(tree => !tree.childNodes || !tree.childNodes.length)

  /**
   * If this is a category with children, no drag and drop
   * because only children can be dragged/sorted.
   */

  if (!isLowestLevel || !draggable) {
    return (
      <Container>
        {trees.map((treeData, index) => (
          <ChildTree key={index} {...treeData} />
        ))}
      </Container>
    )
  }

  return (
    <Droppable droppableId={id || "tree"}>
      {droppableProvided => (
        <Container ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
          {trees.map((treeData, index) => (
            <Draggable key={index} draggableId={treeData.label} index={index}>
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
        </Container>
      )}
    </Droppable>
  )
}

export default Tree
