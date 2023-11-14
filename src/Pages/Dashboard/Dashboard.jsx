import React, { useCallback, useRef, useState } from 'react'
import "./dashboard.css"
import Sidebar from '../../Components/Sidebar/Sidebar'
import FlowDiagram from '../../Components/FlowDiagram/FlowDiagram'
import { addEdge, applyNodeChanges, useEdgesState, useNodesState } from 'reactflow'
import NodeType from '../../Components/NodeType/NodeType'




const nodeTypes = { textUpdater: NodeType };

const Dashboard = () => {



    // const initialElements = [
    //     {
    //       id: "1",
    //       type: "input", // input node
    //       data: { label: "Input Node" },
    //       position: { x: 100, y: 0 }
    //     }
    // ]

    // const [els, setEls] = useState(initialElements);
    const yPos = useRef(0);


    // const onNodesChange = useCallback(
    //     (changes) => setEls((els) => applyNodeChanges(changes, els)),
    //     []
    //   );

    const addNode = useCallback(() => {
        yPos.current += 50;
        setNodes((els) => {
          console.log(els);
          return [
            ...els,
            {
              // id: (Math.random()).toString(),
              // position: { x: 100, y: yPos.current },
              // data: { label: "Hello" }
              id: (Math.random()).toString(), 
              type:'textUpdater' ,
              position: { x: 100, y: yPos.current  }, 
              data: { label: '2' }
              
            }
          ];
        });
      }, []);

    //   const addEdge = useCallback(({ source, target }) => {
    //     setEls((els) => {
    //       console.log(source, target);
    //       return [
    //         ...els,
    //         JSON.stringify({
    //           id: (Math.random()).toString(),
    //           source,
    //           target
    //         })
    //       ];
    //     });
    //   }, []);


  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
    // { id: '3', type:'textUpdater' ,position: { x: 0, y: 100 }, data: { label: '2' } },
  ];
  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];


  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className='Dashboard'>
        <Sidebar addNode={addNode}/>
        <FlowDiagram nodeTypes={nodeTypes} nodes={nodes} edges={edges} onConnect={onConnect} onEdgesChange={onEdgesChange} onNodesChange={onNodesChange}/>
        {/* <FlowDiagram addEdge={addEdge} els={els} onNodesChange={onNodesChange}/> */}
    </div>
  )
}

export default Dashboard