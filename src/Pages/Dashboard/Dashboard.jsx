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
import axios from "axios";

const nodeTypes = { textUpdater: NodeType };

const Dashboard = () => {





  const flowKey = "example-flow";
  const [rfInstance, setRfInstance] = useState(null);

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      console.log(flow);
      localStorage.setItem(flowKey, JSON.stringify(flow));

      
      axios.post("https://knowing-cottony-metal.glitch.me/api/chatFlow",(flow))
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })

    }
  }, [rfInstance]);
 
  const yPos = useRef(0);

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
