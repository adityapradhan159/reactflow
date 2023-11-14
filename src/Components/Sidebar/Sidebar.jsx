import React from 'react'
import "./sidebar.css"

const Sidebar = ({addNode}) => {

    
  return (
    <div className='Sidebar'>
        <button onClick={addNode}>Add Node</button>
    </div>
  )
}

export default Sidebar