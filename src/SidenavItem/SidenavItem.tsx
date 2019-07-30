import * as React from "react"

import { useOperationalContext } from "../OperationalContext/OperationalContext"
import { isModifiedEvent, isOutsideLink } from "../utils"
import { useListbox } from "../useListbox"
import Popout from "./Popout"
import { StyledSidenavItem, Caret, IconContainer } from "./SidenavItem.styled"
import { SidenavItemProps } from "./SidenavItem.types"
import SidenavTooltip from "./Tooltip"

const SidenavItem: React.SFC<SidenavItemProps> = ({
  to,
  active,
  icon: Icon,
  label,
  compact,
  compactLabel,
  end,
  className,
  items,
  onClick,
  dark,
  ...props
}) => {
  const isActive = Boolean(active)
  const [isLabelVisible, setIsLabelVisible] = React.useState(false)
  const { isOpen, setIsOpen, buttonProps, getChildProps } = useListbox({ itemCount: items ? items.length : 0 })
  const ctx = useOperationalContext()

  React.useEffect(() => {
    if (items && setIsOpen) {
      const handleClickOnBodyWhenWeHaveItems = () => {
        setIsOpen(false)
      }

      document.addEventListener("click", handleClickOnBodyWhenWeHaveItems)
      return () => document.removeEventListener("click", handleClickOnBodyWhenWeHaveItems)
    }
  }, [items])

  const handleClickOnSidenavItem = React.useCallback(
    e => {
      e.stopPropagation()
      if (onClick) {
        onClick(e)
      }

      if (!isModifiedEvent(e) && ctx.pushState && to && !isOutsideLink(to)) {
        e.preventDefault()
        ctx.pushState(to)
      }
    },
    [onClick, to],
  )

  const handleClickOnNestedItem = React.useCallback(
    item => (e: React.MouseEvent) => {
      e.preventDefault()
      if (item.onClick) {
        item.onClick(item)
      }
    },
    [],
  )

  const handleKeyDownOnNestedItem = React.useCallback(
    item => (e: React.KeyboardEvent) => {
      if (!item.onClick) {
        return
      }
      e.preventDefault()
      e.stopPropagation()
      switch (e.key) {
        case " ":
          item.onClick(item)
          return
      }
    },
    [],
  )

  return (
    <StyledSidenavItem
      tabIndex={to ? 0 : -1}
      {...buttonProps}
      {...props}
      isDark={Boolean(dark)}
      hasIcon={Boolean(Icon)}
      hasItems={Boolean(items)}
      compact={Boolean(compact)}
      as={Boolean(to) ? "a" : "div"}
      className={`${className || ""}${end ? " operational-ui__sidenav-item_end" : ""}`}
      onMouseEnter={() => (Boolean(items) ? setIsOpen && setIsOpen(true) : setIsLabelVisible(true))}
      onMouseLeave={() => (Boolean(items) ? setIsOpen && setIsOpen(false) : setIsLabelVisible(false))}
      hasOnClick={Boolean(onClick)}
      isActive={isActive}
      onClick={handleClickOnSidenavItem}
      {...to && { href: to }} // This is an `a` if there's a to, so `href` is valid but TS can't figure it out yet
    >
      {Icon && (
        <IconContainer compact={Boolean(compact)}>
          <Icon size={compact ? 24 : 18} />
        </IconContainer>
      )}
      {label &&
        (compact
          ? isLabelVisible && <SidenavTooltip dark={Boolean(dark)}>{compactLabel || label}</SidenavTooltip>
          : label)}
      {!compact && items && <Caret isOpen={isOpen || false} />}
      {items && isOpen && (
        <Popout data-cy="operational-ui__SidenavItemPopover">
          {items.map((item, index) => (
            <SidenavItem
              items={item.items}
              icon={item.icon}
              key={index}
              label={item.label}
              onClick={handleClickOnNestedItem(item)}
              onKeyDown={handleKeyDownOnNestedItem(item)}
              dark={dark}
              {...getChildProps && getChildProps(index)}
            />
          ))}
        </Popout>
      )}
    </StyledSidenavItem>
  )
}

export default SidenavItem
