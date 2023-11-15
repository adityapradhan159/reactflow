import React, { useCallback, useRef, useState } from "react";
import "./dashboard.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import FlowDiagram from "../../Components/FlowDiagram/FlowDiagram";
import {
  ReactFlowProvider,
  addEdge,
  applyNodeChanges,
  useEdgesState,
  useNodesState,
} from "reactflow";
import NodeType from "../../Components/NodeType/NodeType";

const nodeTypes = { textUpdater: NodeType };

const Dashboard = () => {





  const flowKey = "example-flow";
  const [rfInstance, setRfInstance] = useState(null);

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      console.log(flow);
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);
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
    yPos.current += 100;
    setNodes((els) => {
      console.log(els);
      return [
        ...els,
        {
          id: Math.random().toString(),
          type: "textUpdater",
          position: { x: 100, y: yPos.current },
          data: {},
        },
      ];
    });
  }, []);


  const initialNodes = [
  ];
  const initialEdges = [];

   // const [nodes, setNodes] = useState(initialNodes);
  // const [edges, setEdges] = useState([]);


  // const onNodesChange = useCallback(
  //   (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
  //   [setNodes]
  // );

  // const onEdgesChange = useCallback(
  //   (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
  //   [setEdges]
  // );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

 

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // console.log(onNodesChange)

  return (
    <ReactFlowProvider>
      <div className="Dashboard">
        <Sidebar addNode={addNode} onSave={onSave} onc/>
        <FlowDiagram
          nodeTypes={nodeTypes}
          setNodes={setNodes}
          setRfInstance={setRfInstance}
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
        />
        {/* <FlowDiagram addEdge={addEdge} els={els} onNodesChange={onNodesChange}/> */}
      </div>
    </ReactFlowProvider>
  );
};

export default Dashboard;
