import React, { useState } from 'react';
import './App.css';

import { useSessionStorage } from './useSessionStorage'

type Todo = {
  title: string
  done: boolean
} 

function App() {
  const [todos, setTodos] = useSessionStorage<Todo[]>('todos', [])
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
        <button type="button" onClick={handleAddItem} disabled={!newItem}>Add</button>
      </div>
      <div>
        {todos.map((item, index) => <div key={index}>{item.title}</div>)}
      </div>
    </div>
  );
}

export default App;
