import { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import TodoSearch from './components/TodoSearch';
import axios from 'axios'

import './App.css';



function App() {

  const [todo, setTodo] = useState([])
  const [filtertodo , setFilterTodo]=useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000');
        // Update state inside the then block of the Axios request
        setTodo(response.data);
        setFilterTodo(response.data);
      } catch (error) {
        // Handle error appropriately
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData(); // Call fetchData function to fetch data when component mounts
  }, []);
  

  const deleteFunction = (id) => {
    setTodo(todo.filter((todolist) => todolist.id !== id));
    setFilterTodo(filtertodo.filter((todolist) => todolist.id !== id));
    axios.delete('http://127.0.0.1:8000/todo_detail/'+id)
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const task = e.target.task.value
    const newTodo = { id:todo.length, task: task, completed: 'false' }
    axios.post('http://127.0.0.1:8000',newTodo).then((response)=>{
     
      setTodo((prevtodo) => [...prevtodo, {  task: task, completed: 'false' }]);  
      setFilterTodo((prevtodo) => [...prevtodo, newTodo ]);
      console.log(filtertodo)
      e.target.reset();

    }).catch((error)=>{
                  console.log(error)
    })
    
    
   
    
   
  

  };

  const updateTodo = (id, new_task) => {
    setTodo(todo.map((t) => (t.id === id ? { ...t, task: new_task, completed: 'false' } : t)));
    setFilterTodo(filtertodo.map((t) => (t.id === id ? { ...t, task: new_task, completed: 'false' } : t)));
    const updatedTodo = { task: new_task, completed: 'false' }
    axios.put('http://127.0.0.1:8000/todo_detail/'+id ,updatedTodo )
  };


  const complateTodo = (id, e, checkedTask, thetodo) => {
    const task = checkedTask;
    const newStatus = e.target.checked ? 'true' : 'false';
    
    axios.put('http://127.0.0.1:8000/todo_detail/' + id, { task: task, completed: newStatus })
      .then(response => {
        // Update the state after the PUT request is successful
        setTodo(todo.map(t => (t.id === id ? { ...t, completed: newStatus } : t)));
        setFilterTodo(filtertodo.map(t => (t.id === id ? { ...t, completed: newStatus } : t)));
      })
      .catch(error => {
        // Handle errors
        console.error('Error updating task:', error);
      });
  };
  
  
  
      
  const filterTodo = (cat_value) => {
    if (cat_value === 'All') {
      setFilterTodo(todo); // Set filtertodo to the entire todo list
    } else {
      let thevalue;
      if (cat_value === 'Active') {
        thevalue = false; // You need to use string 'false' instead of boolean false
      } else if (cat_value === 'Completed') {
        thevalue = true; // You need to use string 'true' instead of boolean true
      }
      setFilterTodo(todo.filter((t) => t.completed === thevalue, ));
      console.log(filtertodo)
      console.log(todo)
       
    }
  };
  
  
      
      

      

  return (
    <>
      <div className="todo-container">
        <TodoSearch handel_Submit={handelSubmit} />
        <TodoFilter filter_todo = { filterTodo }/>
        <TodoList todos={filtertodo} delet_Function={deleteFunction} update_todo={updateTodo} complate_todo = {complateTodo} />
      </div>
    </>
  );
}

export default App;
