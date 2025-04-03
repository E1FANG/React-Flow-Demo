import React, { useState } from "react";
import { Table,Space } from "antd";

export const RecordsTable = ({ avlTree }) => {
  const [data, setData] = useState(avlTree.current.tasks);

  const review = (status)=>{
    console.log(status)
  }
  const columns = [
    {
      title: "record",
      dataIndex: "operate",
    },
    {
      title: "Action",  
      render: (_, record) => (
        <Space size="middle">
          <a onClick={()=>review(record)}>review</a>
        </Space>
      ),
  
    },
  ];
  return (
    <div className="w-1/5 h-1/5 bg-conic-240 absolute top-0 right-0 z-10">
      <Table columns={columns} dataSource={data} size="small"/>
    </div>
  );
};
