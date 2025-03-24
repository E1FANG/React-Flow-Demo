import React, { useMemo, useEffect, useCallback, useState } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
} from "@xyflow/react";

import { InputNode } from "../components/node/InputNode";
import { CircleNode } from "../components/node/Circle";
import { ContextMenu } from "../components/ContextMenu.jsx";

import { useAvlTree } from "../hooks/useAvlTree.js";

import dagreLayout from "../utils/dagreLayout.js";

import "@xyflow/react/dist/style.css";

export default function Canvas() {
  const nodeTypes = useMemo(() => ({ CircleNode, InputNode }), []);

  const { tree, setTree, treeToFlow, avlTree } = useAvlTree();

  const [nodes, setNodes, onNodesChange] = useNodesState(tree.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(tree.edges);

  const autoLayout = useCallback(() => {
    if (!tree.nodes?.length) return;
    const positionedNodes = dagreLayout(tree.nodes,tree.edges);
    setNodes([...positionedNodes.nodes]);
    setEdges([...positionedNodes.edges]);
  }, [nodes, edges,tree]);

  useEffect(() => {
    autoLayout();
  }, [tree]);

  const [menu, setMenu] = useState(null);
  const onPaneContextMenu = useCallback((event) => {
    event.preventDefault();
    setMenu({
      top: event.clientY,
      left: event.clientX,
    });
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        fitView
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onPaneContextMenu={onPaneContextMenu}
        onPaneClick={() => setMenu(null)}
        onMove={() => setMenu(null)}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
        {menu && (
          <ContextMenu
            {...menu}
            setMenu={setMenu}
            nodes={nodes}
            setNodes={setNodes}
            setEdges={setEdges}
            autoLayout={autoLayout}
            treeToFlow={treeToFlow}
            setTree={setTree}
            avlTree={avlTree}
          />
        )}
      </ReactFlow>
    </div>
  );
}
