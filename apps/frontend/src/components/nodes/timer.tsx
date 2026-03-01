import { Handle, Position } from "@xyflow/react"


export type TimerNodeMetadata ={
    time : number
}


export function Timer({data, isConnected} : {
    data : {
        metadata : TimerNodeMetadata
    },
    isConnected : boolean
}){
    return <div className="p-4 border">
        Every {data.metadata.time /3600 } seconds
        <Handle type="source" position={Position.Right}/>
    </div>
}