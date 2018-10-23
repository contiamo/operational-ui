import * as React from "react"

import Icon from "../Icon/Icon"
import SmallNameTag from "../Internals/SmallNameTag"
import { DefaultProps } from "../types"
import constants, { expandColor } from "../utils/constants"
import styled from "../utils/styled"
import { Tree as ITree } from "./Tree.types"
import { containsPath, getInitialOpenPaths, getMaxDepth, togglePath } from "./Tree.utils"

export interface TreeProps extends DefaultProps {
  /** An array of tree structures */
  trees: ITree[]
}

export interface State {
  /** Stores all open paths. E.g. if this.state.openPaths is [ [ 0 ], [ 1, 2 ] ], then the first root, and the third child of the second root are open.  */
  openPaths: number[][]
}

const Container = styled("div")`
  display: block;
`

const TreeContainer = styled("div")`
  margin: 2px 0;
`

const TreeChildren = styled("div")`
  margin-left: 14px;
`

const TreeItem = styled("div")<{
  hasChildren: boolean
  hasTag: boolean
  isTopLevel: boolean
  isDisabled: boolean
  isRemovable: boolean
}>`
  display: flex;
  min-height: 24px;
  align-items: center;
  margin-bottom: 2px;
  :last-child {
    margin-bottom: 0px;
  }
  ${({ theme, hasChildren, hasTag, isTopLevel, isDisabled }) => `
    padding: ${theme.space.base / 2}px;
    font-size: ${hasTag ? theme.font.size.fineprint : theme.font.size.small}px;
    font-weight: ${hasTag || isTopLevel ? theme.font.weight.bold : theme.font.weight.regular};
    font-family: ${hasTag ? theme.font.family.code : theme.font.family.main};
    color: ${theme.color.text.dark};
    opacity: ${isDisabled ? "0.4" : "1.0"};
    cursor: pointer;
    :hover {
      background-color: ${theme.color.background.lighter};
    }
    & svg {
      color: ${theme.color.text.lightest};
    }
    & > svg:first-child {
      flex-shrink: 0;
      visibility: ${hasChildren ? "visible" : "hidden"};
    }
  `};
`

const TreeLabel = styled("span")`
  padding-left: ${props => props.theme.space.base}px;
  display: inline-block;
  word-wrap: break-word;
  flex: 1;
`

/**
 * This is a single-use close button with hard-coded padding to ensure the close icon inside stays readable.
 * @todo look into re-using and formalizing this element.
 */
const IconButton = styled("div")<{ hidden_?: boolean; hoverEffect?: boolean }>(({ theme, hidden_, hoverEffect }) => ({
  cursor: "pointer",
  width: 20,
  height: 20,
  padding: 4,
  borderRadius: theme.borderRadius,
  "& svg": {
    cursor: "pointer",
  },
  ...(hidden_ ? { visibility: "hidden" } : {}),
  ...(hoverEffect
    ? {
        ":hover": {
          backgroundColor: theme.color.background.light,
        },
      }
    : {}),
}))

const TreeRecursive: React.SFC<{
  tree: ITree
  path: number[]
  recursiveTogglePath: (path: number[]) => void
  openPaths: number[][]
  maxDepth: number
}> = ({ tree, path, recursiveTogglePath, openPaths, maxDepth }) => {
  const isOpen = containsPath(path)(openPaths)
  const { label, tag, disabled, initiallyOpen, childNodes, color, onRemove, ...treeHtmlProps } = tree
  const tagColor = expandColor(constants, color) || ""
  return (
    <TreeContainer>
      <TreeItem
        {...treeHtmlProps}
        hasTag={Boolean(tree.tag)}
        hasChildren={tree.childNodes.length > 0}
        isTopLevel={path.length < 2}
        isDisabled={Boolean(tree.disabled)}
        isRemovable={Boolean(onRemove)}
        onClick={() => {
          if (treeHtmlProps.onClick) {
            treeHtmlProps.onClick()
          }
          recursiveTogglePath(path)
        }}
      >
        {maxDepth > 1 && (
          <IconButton hidden_={childNodes.length === 0}>
            <Icon name={isOpen ? "ChevronDown" : "Add"} size={12} />
          </IconButton>
        )}
        {tree.tag && <SmallNameTag color={tagColor}>{tree.tag}</SmallNameTag>}
        <TreeLabel>{tree.label}</TreeLabel>
        {onRemove && (
          <IconButton
            hoverEffect
            onClick={ev => {
              ev.stopPropagation()
              onRemove()
            }}
          >
            <Icon name="No" size={12} />
          </IconButton>
        )}
      </TreeItem>
      {isOpen &&
        !tree.disabled && (
          <TreeChildren>
            {tree.childNodes.map((childTree, index) => (
              <TreeRecursive
                key={index}
                tree={childTree}
                path={[...path, index]}
                recursiveTogglePath={recursiveTogglePath}
                openPaths={openPaths}
                maxDepth={maxDepth}
              />
            ))}
          </TreeChildren>
        )}
    </TreeContainer>
  )
}

class Tree extends React.Component<TreeProps, State> {
  public readonly state: State = {
    openPaths: this.getOpenPaths(),
  }

  private getOpenPaths() {
    return this.props.trees
      .map((tree, index) => getInitialOpenPaths([index])(tree))
      .reduce((current, accumulator) => [...current, ...accumulator], [])
  }

  public componentDidUpdate(prevProps: TreeProps) {
    if (getMaxDepth(this.props.trees) !== getMaxDepth(prevProps.trees)) {
      this.setState(() => ({
        openPaths: this.getOpenPaths(),
      }))
    }
  }

  private togglePath = (path: number[]) => {
    this.setState(prevState => ({
      openPaths: togglePath(path)(prevState.openPaths),
    }))
  }

  public render() {
    const { trees, ...props } = this.props
    return (
      <Container {...props}>
        {trees.map((tree, index) => (
          <TreeRecursive
            key={index}
            tree={tree}
            path={[index]}
            recursiveTogglePath={this.togglePath}
            openPaths={this.state.openPaths}
            maxDepth={getMaxDepth(trees)}
          />
        ))}
      </Container>
    )
  }
}

export default Tree
