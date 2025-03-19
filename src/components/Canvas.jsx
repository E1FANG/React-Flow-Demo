import React, { useMemo, useState } from "react";
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

import dagreLayout from "../utils/dagreLayout.js";

import "@xyflow/react/dist/style.css";

export default function Canvas() {
  const nodeTypes = useMemo(() => ({ CircleNode, InputNode }), []);

  const treeData = [
    {
      id: "1",
      data: { label: "根节点" },
      children: [
        {
          id: "2",
          data: { label: "子节点 1" },
          children: [
            { id: "3", data: { label: "子节点 1.1" } },
            { id: "4", data: { label: "子节点 1.2" } },
          ],
        },
        { id: "5", data: { label: "子节点 2" } },
      ],
    },
  ];

  const treeToReactFlow = (treeData) => {
    const nodes = [];
    const edges = [];
    let nodeIdCounter = 1;

    const traverse = (node, parentId = null) => {
      const nodeId = node.id || `${nodeIdCounter++}`;
      nodes.push({ id: nodeId, data: node.data, position: { x: 0, y: 0 } });
      if (parentId) {
        edges.push({
          id: `edge_${parentId}_${nodeId}`,
          target: nodeId,
          source: parentId,
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

  React.useEffect(() => {
    const positionedNodes = dagreLayout([...nodes], edges);
    console.log(positionedNodes);
    setNodes([...positionedNodes.nodes]);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
