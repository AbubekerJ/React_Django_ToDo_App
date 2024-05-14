import React, { useState } from 'react'

function TodoFilter({filter_todo}) {


  return (
   
         <select name="" id="" onChange={(e) => filter_todo(e.target.value)}>
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>

    
  )
}

export default TodoFilter

