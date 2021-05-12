import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import './App.css';

import { useSessionStorage } from './useSessionStorage'

type Todo = {
  title: string
  done: boolean
} 

function App() {
  const [todos, setTodos] = useSessionStorage<Todo[]>('todos', [])
  const [newItem, setNewItem] = useState('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => setNewItem(event.target.value)
  const handleAddItem = () => {
    if (!newItem) return
    
    setTodos(current => [...current, { title: newItem, done: false}])
    setNewItem('')
  }
  
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleAddItem()
  }
  const handleItemDone = (index: number) => {
    setTodos([...todos.slice(0, index), {...todos[index], done: true}, ...todos.slice(index+1)])
  } 

  return (
    <div className="App">
      <div>
        <input type="text" value={newItem} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
        <button type="button" onClick={handleAddItem} disabled={!newItem}>Add</button>
      </div>
      <div>
        {todos.map((item, index) => {
           return (
             <div key={index} className={item.done ? 'done': ''}>
              <span>{item.title}</span>
              {!item.done && <button onClick={() => handleItemDone(index)}>Done</button>}
            </div>
            )
        })}
      </div>
    </div>
  );
}

export default App;
