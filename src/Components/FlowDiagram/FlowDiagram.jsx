import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';


const FlowDiagram = ({ nodes, edges, onNodesChange, onConnect, onEdgesChange}) => {


  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  // const onConnect = useCallback(
  //   (params) => setEdges((eds) => addEdge(params, eds)),
  //   [setEdges],
  // );


    

  return (
    <div className='flowDiagram'>
        {/* <ReactFlow
          nodes={els}
          // elements={els} 
          onConnect={addEdge}  
          onNodesChange={onNodesChange}
          // onEdgesChange={onEdgesChange}  
        > */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>

        

    </div>
  )
}

export default FlowDiagram