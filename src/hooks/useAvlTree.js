import { AVLTree } from '@/dataStructure/avlTree'
import { useRef, useState, useCallback, useEffect, useLayoutEffect } from 'react';
import dagreLayout from "../utils/dagreLayout.js";
import {
  useNodesState,
  useEdgesState,
} from "@xyflow/react";

export const useAvlTree = (initialValue) => {
  const avlTree = useRef(new AVLTree(initialValue))

  // avlTree.current.insert(20);
  // avlTree.current.insert(10); // 插入导致根节点失衡，触发右旋转

  const treeToFlow = useCallback(() => {
    const nodes = []
    const edges = []

    const traverse = (node, parent) => {
      if (!node) return
      const nodeValue = String(node.value)
      const parentValue = String(parent?.value)
      nodes.push({
        id: nodeValue,
        data: { label: nodeValue },
        position: { x: 0, y: 0 },
      })
      parent && edges.push({
        target: nodeValue,
        source: parentValue,
        id: parentValue + '_' + nodeValue
      })
      traverse(node.left, node)
      traverse(node.right, node)
    }
    traverse(avlTree.current.root)
    return {
      nodes,
      edges
    }
  }, [])
  const [tree, setTree] = useState({})

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const autoLayout = useCallback(() => {
    if (!tree.nodes?.length) return;
    const positionedNodes = dagreLayout(tree.nodes, tree.edges);
    setNodes([...positionedNodes.nodes]);
    setEdges([...positionedNodes.edges]);
  }, [nodes, edges, tree]);

  useEffect(() => {
    autoLayout();
  }, [tree]);


  return {
    nodes, setNodes, onNodesChange,
    edges, setEdges, onEdgesChange,
    tree,
    setTree,
    treeToFlow,
    avlTree,
    autoLayout
  }

}