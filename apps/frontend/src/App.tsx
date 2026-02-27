
import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import {CreateWorkflow }from "./components/createWorkflow"
import '@xyflow/react/dist/style.css';


function App() {
  return (
    <>
    <Routes>
      <Route path="/create-workflow" element={<CreateWorkflow/>}/>
    </Routes>
      
    </>
  )
}

export default App
