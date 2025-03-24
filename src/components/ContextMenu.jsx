import { useState } from "react";
import { Modal, Input } from "antd";

export const ContextMenu = ({
  top,
  left,
  setMenu,
  autoLayout,
  setTree,
  avlTree,
  treeToFlow,
}) => {
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
    setOpen(true);
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

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const onCancel = () => {
    setOpen(false);
    setMenu(null);
  };
  const handleOk = () => {
    avlTree.current.insert(Number(inputValue));
    console.log(avlTree.current)
    setTree(treeToFlow());
    setMenu(null)
  };

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
      <Modal title="添加节点" open={open} onOk={handleOk} onCancel={onCancel}>
        <Input
          placeholder="输入插入节点的值"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </Modal>
    </div>
  );
};
