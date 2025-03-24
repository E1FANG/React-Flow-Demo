import { useState, useRef } from "react";
import { Modal, InputNumber,message } from "antd";
import { TraverseTreeWithPreOrder } from "@/dataStructure/avlTree.js";

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

  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState();

  const afterOpenChange = (isOpen) => {
    isOpen && inputRef.current && inputRef.current.focus();
  };

  const onCancel = () => {
    setOpen(false);
    setMenu(null);
  };
  const handleOk = () => {
    const treeFlatArray = TraverseTreeWithPreOrder(avlTree.current);
    if (treeFlatArray.includes(inputValue)) {
      message.warning("已有相等的节点");
      return;
    }
    avlTree.current.insert(inputValue);
    setTree(treeToFlow());
    setMenu(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleOk();
    }
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
      <Modal
        title="添加节点"
        open={open}
        onOk={handleOk}
        onCancel={onCancel}
        afterOpenChange={afterOpenChange}
      >
        <InputNumber
          ref={inputRef}
          className="w-full"
          placeholder="输入插入节点的值"
          onKeyPress={handleKeyPress}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e);
          }}
        />
      </Modal>
    </div>
  );
};
