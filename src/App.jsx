import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'reactflow/dist/style.css';
import FlowDiagram from './Components/FlowDiagram/FlowDiagram';
import Dashboard from './Pages/Dashboard/Dashboard';

function App() {
  

  return (
    <>
      <Dashboard/>
    </>
  )
}

export default App
