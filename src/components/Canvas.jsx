import React, { useMemo, useCallback, useState } from "react";
import { ReactFlow, Controls, MiniMap, Background } from "@xyflow/react";

import { InputNode } from "../components/node/InputNode";
import { CircleNode } from "../components/node/Circle";
import { AnimatedNode } from "./node/AnimatedNode.jsx";

import { ContextMenu } from "../components/ContextMenu.jsx";
import { RecordsTable } from "@/components/RecordsTable";

import { useAvlTree } from "../hooks/useAvlTree.js";

import "@xyflow/react/dist/style.css";

export default function Canvas() {
  const nodeTypes = useMemo(
    () => ({ CircleNode, InputNode, default: AnimatedNode }),
    []
  );

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
    autoLayout,
  } = useAvlTree(30);

  const [menu, setMenu] = useState(null);
  const onPaneContextMenu = useCallback((event) => {
    event.preventDefault();
    setMenu({
      top: event.clientY,
      left: event.clientX,
    });
  }, []);

  const onInit = () => {
    console.log("init");

    avlTree.current.insert(20);
    // avlTree.current.insert(10); // 插入导致根节点失衡，触发右旋转
    setTree(treeToFlow());
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <RecordsTable avlTree={avlTree} />
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
        onInit={onInit}
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
