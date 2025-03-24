import { AVLTree } from '@/dataStructure/avlTree'
import { useRef, useState } from 'react';

export const useAvlTree = () => {
  const avlTree = useRef(new AVLTree(30))

  avlTree.current.insert(20);
  avlTree.current.insert(10); // 插入导致根节点失衡，触发右旋转
  

  const treeToFlow = () => {
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
  }
  const [tree, setTree] = useState(treeToFlow())


  return {
    tree,
    setTree,
    treeToFlow,
    avlTree
  }

}