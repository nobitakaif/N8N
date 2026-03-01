import { useState } from "react"
import type { NodeKind, NodeMetadata } from "./createWorkflow"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import type { PriceTriggerMetadata } from "./nodes/price-trigger"
import type { TimerNodeMetadata } from "./nodes/timer"
import { Divide } from "lucide-react"

const TRIGGER_OPTION = [{
        id : "timer",
        title : "Timer",
        discription : "Run this trigger every minutes"
    },{
        id : "price-trigger",
        title : "Price Trigger",
        discription : "Runs whenve rthe price goes above or below certain number "
    }
]

const SUPPORTED_ASSET = ['SOL','BTC','ETH']

export function Sidebar({onSelect}:{
    onSelect : (kind : NodeKind, metadata : NodeMetadata) =>void
}) {
    const [metadata, setMetadata] = useState<PriceTriggerMetadata | TimerNodeMetadata>({
      time : 3600
    })
    const [selectTrigger, setSelectTrigger ] = useState(TRIGGER_OPTION[0].id)
  return (
    <Sheet open={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Event</SheetTitle>
        </SheetHeader>
            <Select value={selectTrigger} onValueChange={(value) => setSelectTrigger(value)}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
               {TRIGGER_OPTION.map(({id, title}) =>(
                <SelectItem value={id} key={id}>{title}</SelectItem>
              
               ))}
            </SelectContent>
            </Select>
            {selectTrigger === "timer" && <div>
              Number of seconds after which to run the timer
              <Input value={metadata.time} type="number" onChange={(e)=>setMetadata((m) => ({...m, time : Number(e.target.value)}))}/>
              </div>
            }
            {selectTrigger === "price-trigger" && <div>
              Price : 
              <Input type="text" onChange={(e)=>setMetadata((m) =>({...m, price : Number(e.target.value)}))} className="mb-2"/>
              <Select value={metadata.asset} onValueChange={(value) => setMetadata(metadata =>({
                ...metadata,
                asset : value
              }))}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_ASSET.map((id) =>(
                    <SelectItem value={id} key={id}>{id}</SelectItem>
                  
                  ))}
                </SelectContent>
              </Select>
              </div>
            }
        <SheetFooter>
          <Button onClick={() =>{
            onSelect(selectTrigger,metadata)
          }} type="submit">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
