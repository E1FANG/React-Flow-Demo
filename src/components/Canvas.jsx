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

import dagreLayout from "../utils/dagreLayout.js";

import "@xyflow/react/dist/style.css";

export default function Canvas() {
  const nodeTypes = useMemo(() => ({ CircleNode, InputNode }), []);

  const treeData = [
    {
      id: "1",
      children: [
        {
          id: "2",
          children: [{ id: "4" }, { id: "5" }],
        },
        { id: "3" },
      ],
    },
  ];

  const treeToReactFlow = (treeData) => {
    const nodes = [];
    const edges = [];
    let nodeIdCounter = 1;

    const traverse = (node, parentId = null) => {
      const nodeId = node.id || `${nodeIdCounter++}`;
      nodes.push({
        id: nodeId,
        data: { label: nodeId },
        position: { x: 0, y: 0 },
      });
      if (parentId) {
        edges.push({
          id: `edge_${parentId}_${nodeId}`,
          target: nodeId,
          source: parentId,
          animated: true,
        });
      }
      node.children?.forEach((e) => traverse(e, nodeId));
    };
    treeData.forEach((e) => traverse(e));
    return { nodes, edges };
  };

  const tree = treeToReactFlow(treeData);

  const [nodes, setNodes, onNodesChange] = useNodesState(tree.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(tree.edges);

  const autoLayout = useCallback(() => {
    const positionedNodes = dagreLayout(nodes, edges);
    console.log(positionedNodes.nodes);
    setNodes([...positionedNodes.nodes]);
  }, [nodes, edges]);

  useEffect(() => {
    autoLayout();
  }, []);

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
          />
        )}
      </ReactFlow>
    </div>
  );
}
