import * as React from "react"
import styled from "react-emotion"

import constants, { OperationalStyleConstants, expandColor } from "../utils/constants"
import Icon from "../Icon/Icon"
import { togglePath, containsPath, getInitialOpenPaths } from "./Tree.utils"
import { Tree as ITree } from "./Tree.types"
import SmallNameTag from "../Internals/SmallNameTag"

export interface Props {
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
  margin-left: 28px;
`

const TreeItem = styled("div")`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  width: fit-content;
  min-width: 160px;
  user-select: none;
  ${({
    theme,
    hasChildren,
    hasTag,
    isTopLevel,
    isDisabled,
  }: {
    theme?: OperationalStyleConstants
    hasChildren: boolean
    hasTag: boolean
    isTopLevel: boolean
    isDisabled: boolean
  }) => `
    font-size: ${hasTag ? theme.font.size.fineprint : theme.font.size.small}px;
    font-weight: ${hasTag || isTopLevel ? theme.font.weight.bold : theme.font.weight.regular};
    font-family: ${hasTag ? theme.font.family.code : theme.font.family.main};
    color: ${theme.color.text.dark};
    ${
      isDisabled
        ? "opacity: 0.4;"
        : `
      cursor: pointer;
      :hover {
        background-color: ${theme.color.background.lighter};
      }
    `
    }
    & svg {
      visibility: ${hasChildren ? "visible" : "hidden"};
      color: ${theme.color.text.lightest};
    }
  `};
`

const TreeRecursive: React.SFC<{
  tree: ITree
  path: number[]
  togglePath: (path: number[]) => void
  openPaths: number[][]
}> = ({ tree, path, togglePath, openPaths }) => {
  const isOpen = containsPath(path)(openPaths)
  const { label, tag, disabled, initiallyOpen, childNodes, color, ...treeHtmlProps } = tree
  const tagColor = expandColor(constants, color)
  return (
    <TreeContainer>
      <TreeItem
        {...treeHtmlProps}
        hasTag={Boolean(tree.tag)}
        hasChildren={tree.childNodes.length > 0}
        isTopLevel={path.length < 2}
        isDisabled={Boolean(tree.disabled)}
        onClick={() => {
          treeHtmlProps.onClick && treeHtmlProps.onClick()
          togglePath(path)
        }}
      >
        <Icon left name={isOpen ? "ChevronDown" : "Add"} size={12} />
        {tree.tag && (
          <SmallNameTag color={tagColor} left>
            {tree.tag}
          </SmallNameTag>
        )}
        {tree.label}
      </TreeItem>
      {isOpen &&
        !tree.disabled && (
          <TreeChildren>
            {tree.childNodes.map((tree, index) => (
              <TreeRecursive
                key={index}
                tree={tree}
                path={[...path, index]}
                togglePath={togglePath}
                openPaths={openPaths}
              />
            ))}
          </TreeChildren>
        )}
    </TreeContainer>
  )
}

class Tree extends React.Component<Props, State> {
  readonly state: State = {
    openPaths: this.props.trees
      .map((tree, index) => getInitialOpenPaths([index])(tree))
      .reduce((current, accumulator) => [...current, ...accumulator], []),
  }

  togglePath = (path: number[]) => {
    this.setState(prevState => ({
      openPaths: togglePath(path)(prevState.openPaths),
    }))
  }

  render() {
    return (
      <Container {...this.props}>
        {this.props.trees.map((tree, index) => (
          <TreeRecursive
            key={index}
            tree={tree}
            path={[index]}
            togglePath={this.togglePath}
            openPaths={this.state.openPaths}
          />
        ))}
      </Container>
    )
  }
}

export default Tree
