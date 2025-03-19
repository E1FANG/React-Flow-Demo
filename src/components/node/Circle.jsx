import React from 'react';
import { Handle, Position } from '@xyflow/react';


export const CircleNode = () => {
  return (
    <>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} id="a" />

      <div className='flex justify-center	items-center border border-indigo-600	rounded-full
      h-25 w-25
    '>
        CircleNode
      </div>
    </>
  )
}