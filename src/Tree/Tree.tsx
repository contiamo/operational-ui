import { Omit } from "emotion-theming/types/helper"
import * as React from "react"
import { Draggable, DraggableProps, Droppable, DroppableProps, DroppableStateSnapshot } from "react-beautiful-dnd"
import styled from "../utils/styled"
import ChildTree from "./ChildTree"
import { IconComponentType } from "../Icon"

interface BaseTree {
  label: string
  highlight?: boolean
  initiallyOpen?: boolean
  tag?: string
  disabled?: boolean
  color?: string
  icon?: IconComponentType
  iconColor?: string
  onClick?: (event: React.MouseEvent) => void
  onContextMenu?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  cursor?: string
  actions?: React.ReactNode
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
  searchWords?: string[]
  droppableProps?: Omit<DroppableProps, "children">
  placeholder?: React.ComponentType<DroppableStateSnapshot>
  _level?: number
}

const Container = styled("div")`
  user-select: none;
`

const Tree: React.SFC<TreeProps> = ({ _level = 0, trees, droppableProps, placeholder, searchWords }) => {
  const isLowestLevel = trees.length === 0 || trees.some(tree => !tree.childNodes || !tree.childNodes.length)

  /**
   * If this is a category with children, no drag and drop
   * because only children can be dragged/sorted.
   */
  if (!isLowestLevel || !droppableProps) {
    return (
      <Container>
        {trees.map((treeData, index) => (
          <ChildTree level={_level} key={index} {...treeData} searchWords={searchWords} />
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
                <Draggable key={index} {...treeData.draggableProps || { draggableId: treeData.label }} index={index}>
                  {draggableProvided => {
                    return (
                      <ChildTree
                        level={_level}
                        forwardRef={draggableProvided.innerRef}
                        searchWords={searchWords}
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
