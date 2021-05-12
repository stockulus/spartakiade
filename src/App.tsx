import React, { useState } from 'react';
import './App.css';

type Todo = {
  title: string
  done: boolean
} 

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newItem, setNewItem] = useState('')

  const handleInputChange = (event: any) => setNewItem(event.target.value)
  const handleAddItem = () => {
    if (!newItem) return
    
    setTodos(current => [...current, { title: newItem, done: false}])
    setNewItem('')
  }
  
  return (
    <div className="App">
      <div>
        <input type="text" value={newItem} onChange={handleInputChange} />
        <button type="button" onClick={handleAddItem}>Add</button>
      </div>
      <div>
        {todos.map((item, index) => <span key={index}>{item.title}</span>)}
      </div>
    </div>
  );
}

export default App;
