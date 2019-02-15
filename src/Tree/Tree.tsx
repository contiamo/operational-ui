import * as React from "react"
import { Draggable, Droppable, DropResult, ResponderProvided } from "react-beautiful-dnd"
import styled from "../utils/styled"
import ChildTree from "./ChildTree"

export interface TreeData<Meta> {
  label: string
  highlight?: boolean
  childNodes?: Array<TreeData<Meta>>
  initiallyOpen?: boolean
  tag?: string
  disabled?: boolean
  color?: string
  meta?: Meta
  /**
   * @todo move those properties from TreeData to TreeSharedProps
   */
  onRemove?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export interface TreeSharedProps<Meta> {
  onClick?: (node: TreeData<Meta>) => void
  innerRef?: (element?: HTMLElement | null) => any
}

export interface TreeProps<Meta> extends TreeSharedProps<Meta> {
  trees: Array<TreeData<Meta>>
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

export default function Tree<Meta = any>({ trees, id, draggable, onClick }: TreeProps<Meta>) {
  const isLowestLevel = trees.some(tree => !tree.childNodes || !tree.childNodes.length)

  /**
   * If this is a category with children, no drag and drop
   * because only children can be dragged/sorted.
   */

  if (!isLowestLevel || !draggable) {
    return (
      <Container>
        {trees.map((treeData, index) => (
          <ChildTree key={index} {...treeData} onClick={onClick} />
        ))}
      </Container>
    )
  }

  return (
    <Droppable droppableId={id || "tree"}>
      {droppableProvided => (
        <Container innerRef={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
          {trees.map((treeData, index) => (
            <Draggable key={index} draggableId={treeData.label} index={index}>
              {draggableProvided => (
                <ChildTree
                  innerRef={draggableProvided.innerRef}
                  {...treeData}
                  {...draggableProvided.draggableProps}
                  {...draggableProvided.dragHandleProps}
                  onClick={onClick}
                />
              )}
            </Draggable>
          ))}
        </Container>
      )}
    </Droppable>
  )
}
