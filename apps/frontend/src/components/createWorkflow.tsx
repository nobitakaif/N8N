import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import { Sheet } from './ui/sheet';
import { Sidebar } from './sidebare';

 
export type NodeKind =  "price-trigger" | "timer-trigger" | "hyperliquid" | "backpack" | "lighter"
export interface NodeType {
  data : {
    type : "action" | "trigger",
    kind : NodeKind,
    metadata : NodeMetadata
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
 
  return (

    <div style={{ width: '100vw', height: '100vh' }}>
      {/* if the node's length == 0 then user will chose first nodes */}
      {nodes.length == 0 && <Sidebar onSelect={(kind, metadata) =>{
        console.log("reach here!!!")
        setNodes([...nodes, {
          id : "1"+Math.random(),
          data : {
            type : "trigger",
            kind,
            metadata,
          },
          position : {x : 0, y : 0 }
        }])
      }}/>}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </div>
  );
}