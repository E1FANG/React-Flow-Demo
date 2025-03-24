import React, { useMemo, useCallback, useState } from "react";
import { ReactFlow, Controls, MiniMap, Background } from "@xyflow/react";

import { InputNode } from "../components/node/InputNode";
import { CircleNode } from "../components/node/Circle";
import { ContextMenu } from "../components/ContextMenu.jsx";

import { useAvlTree } from "../hooks/useAvlTree.js";

import "@xyflow/react/dist/style.css";

export default function Canvas() {
  const nodeTypes = useMemo(() => ({ CircleNode, InputNode }), []);

  const {
    setTree,
    treeToFlow,
    avlTree,
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    autoLayout
  } = useAvlTree();

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
