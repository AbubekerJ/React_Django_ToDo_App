import React from 'react'

function TodoSearch({handel_Submit ,todos}) {


  return (
    <div>
         <div className="todo-search">

<form  onSubmit={handel_Submit}>
  <input type="text" id="task" name='task'placeholder="Enter Todo" />
  
  <button >Add</button>
</form>
</div>
    </div>
  )
}

export default TodoSearch
