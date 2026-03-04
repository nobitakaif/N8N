import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import { PriceTrigger } from './nodes/price-trigger';
import { Timer } from './nodes/timer';
import { Sidebar } from './sidebare';

 
const nodeT = {
  "price-trigger" : PriceTrigger,
  "timer" : Timer
}


export type NodeKind =  "price-trigger" | "timer" | "hyperliquid" | "backpack" | "lighter"
export interface NodeType {
  type : NodeKind,
  data : {
    kind : "action" | "trigger",
    metadata : NodeMetadata,
  },
  id : string,
  position : {
    x : number, 
    y : number 
  }
}
export type NodeMetadata = any;
interface EdgesType{
  id  : string, 
  source : string, 
  target : string
}
 
export function CreateWorkflow() {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<EdgesType[]>([]);
 
  const onNodesChange = useCallback(
    (changes:any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes:any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params:any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
 
  const onConnectEnd = useCallback((params,info )=>{
    console.log(info)
    
  },[])
  
  return (

    <div style={{ width: '100vw', height: '100vh' }}>
      {/* if the node's length == 0 then user will chose first nodes */}
      
      {nodes.length == 0 && <Sidebar onSelect={(type, metadata) =>{
        
        console.log("reach here!!!")
        setNodes([...nodes, {
          id : "1"+ Math.random(),
          type ,
          data : {
            kind : "trigger",
            metadata,
          },
          position : {x : 0, y : 0 }
        }])
      }}/>}
      <ReactFlow
        nodeTypes={nodeT}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        fitView
      />
    </div>
  );
}