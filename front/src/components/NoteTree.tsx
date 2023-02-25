'use client'

import {NoteNode} from "@/types/NoteNode";
import {TreeItem, TreeItemContentProps, TreeItemProps, TreeView, useTreeItem} from "@mui/lab";
import {ChevronRight as ChevronRightIcon, ExpandMore as ExpandMoreIcon} from "@mui/icons-material";
import {forwardRef, useCallback} from "react";
import clsx from "clsx";

type NoteTreeProps = {
  noteNodes: NoteNode[]
  onItemClick?(noteNode: NoteNode): void
}

export function NoteTree({noteNodes, onItemClick}: NoteTreeProps) {
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon/>}
      defaultExpandIcon={<ChevronRightIcon/>}
    >
      {
        noteNodes.map(noteNode => <NoteTreeNode onItemClick={onItemClick} key={noteNode.id} noteNode={noteNode}/>)
      }
    </TreeView>
  )
}

type NoteTreeNodeProps = {
  noteNode: NoteNode
  onItemClick?(noteNode: NoteNode): void
}

function NoteTreeNode({noteNode, onItemClick}: NoteTreeNodeProps) {

  const handleClick = useCallback(() => onItemClick?.(noteNode), [noteNode])

  if (!noteNode.children || noteNode.children.length === 0) {
    return (
      <CustomTreeItem onClick={handleClick} nodeId={noteNode.id.toString()} label={noteNode.name}/>
    )
  }

  return (
    <CustomTreeItem onClick={handleClick} nodeId={noteNode.id.toString()} label={noteNode.name}>
      {
        noteNode.children.map(subNoteNode => <NoteTreeNode onItemClick={onItemClick} key={subNoteNode.id}
                                                           noteNode={subNoteNode}/>)
      }
    </CustomTreeItem>
  )
}


const CustomItemContent = forwardRef(function CustomItemContent(props: TreeItemContentProps, ref) {
  const {
    classes,
    className,
    displayIcon,
    expansionIcon,
    icon: iconProp,
    label,
    nodeId,
    onClick,
    onMouseDown,
    ...other
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event) => {
    preventSelection(event);

    if (onMouseDown) {
      onMouseDown(event);
    }
  };

  const handleClick = (event) => {
    handleExpansion(event);
  };

  const handleMySelection = (event) => {
    handleSelection(event);
    if (onClick) {
      onClick(event);
    }
  }

  return (
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      ref={ref as any}
      {...other}
    >
      <div onClick={handleClick} className={classes.iconContainer}>{icon}</div>
      <div onClick={handleMySelection} className={classes.label}>{label}</div>
    </div>
  )
})

function CustomTreeItem(props: TreeItemProps) {
  return <TreeItem ContentComponent={CustomItemContent}  {...props} />;
}
