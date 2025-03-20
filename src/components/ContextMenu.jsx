import { useReactFlow } from "@xyflow/react";

export const ContextMenu = ({
  top,
  left,
  setNodes,
  setEdges,
  setMenu,
  autoLayout,
}) => {
  const { screenToFlowPosition } = useReactFlow();

  const menuStyle = {
    position: "fixed",
    left,
    top,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    padding: "8px 0",
    zIndex: 1000,
  };

  const menuItemStyle = {
    padding: "8px 16px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  const addNode = () => {
    const position = screenToFlowPosition({
      x: left,
      y: top,
    });

    const newNode = {
      id: "6",
      position,
      data: { label: "6" },
    };
    setNodes((nds) => nds.concat(newNode));
    setEdges((edges) =>
      edges.concat({
        id: `edge_${"1"}_${"6"}`,
        target: "6",
        source: "1",
        animated: true,
      })
    );
    setMenu(null);
  };
  const menuItems = [
    {
      id: "1",
      label: "添加节点",
      action: addNode,
    },
    {
      id: "2",
      label: "自动布局",
      action: () => {
        autoLayout();
        setMenu(null);
      },
    },
  ];

  return (
    <div style={menuStyle} className="absolute p-4 bg-cyan-800">
      {menuItems.map((item) => (
        <div
          key={item.id}
          style={{
            ...menuItemStyle,
          }}
          className="hover:bg-sky-700 text-black hover:text-white"
          onClick={() => item.action()}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};
