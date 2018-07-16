import * as React from "react"
import styled from "react-emotion"

import { OperationalStyleConstants } from "../utils/constants"
import NameTag from "../NameTag/NameTag"
import Icon from "../Icon/Icon"
import { togglePath, containsPath } from "./Tree.utils"

/**
 * ITree naming convention is used because it would otherwise clash with the name of the component.
 * (in this case, component cannot be renamed TreeComponent because of styleguidist constraints)
 */
export interface ITree {
  label: string
  tag?: string
  childNodes: ITree[]
}

export interface Props {
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
  cursor: pointer;
  ${({
    theme,
    hasChildren,
    hasTag,
    isTopLevel,
  }: {
    theme?: OperationalStyleConstants
    hasChildren: boolean
    hasTag: boolean
    isTopLevel: boolean
  }) => `
    font-size: ${hasTag ? theme.font.size.fineprint : theme.font.size.small}px;
    font-weight: ${hasTag || isTopLevel ? theme.font.weight.bold : theme.font.weight.regular};
    font-family: ${hasTag ? theme.font.family.code : theme.font.family.main};
    color: ${theme.color.text.dark};
    :hover {
      background-color: ${theme.color.background.lighter};
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
  return (
    <TreeContainer {...tree}>
      <TreeItem
        hasTag={Boolean(tree.tag)}
        hasChildren={tree.childNodes.length > 0}
        isTopLevel={path.length < 2}
        onClick={() => {
          togglePath(path)
        }}
      >
        <Icon left name={isOpen ? "ChevronDown" : "Add"} size={12} />
        {tree.tag && <NameTag left>{tree.tag}</NameTag>}
        {tree.label}
      </TreeItem>
      {isOpen && (
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
  state: State = {
    openPaths: [],
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
