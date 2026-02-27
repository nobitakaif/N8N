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


export function Sidebar({onSelect}:{
    onSelect : (kind : NodeKind, metadata : NodeMetadata) =>void
}) {
    const [metadata, setMetadata] = useState({})
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
        <SheetFooter>
          <Button onClick={() =>{
            onSelect(selectTrigger,metadata)
          }} type="submit">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
