import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import './App.css';

import { useSessionStorage } from './useSessionStorage'

type Todo = {
  title: string
  done: boolean
} 


type NewTodoProps = {
  onNewTodo: (value: Todo) => void
}

function NewTodo({ onNewTodo }: NewTodoProps) {
  const [newItem, setNewItem] = useState('')
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => setNewItem(event.target.value)
  const handleAddItem = () => {
    if (!newItem) return

    onNewTodo({ title: newItem, done: false})
    setNewItem('')
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleAddItem()
  }

  return (
    <div>
      <input type="text" value={newItem} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
      <button type="button" onClick={handleAddItem} disabled={!newItem}>Add</button>
    </div>
  )
}

function App() {
  const [todos, setTodos] = useSessionStorage<Todo[]>('todos', [])
  
  const handleItemDone = (index: number) => {
    setTodos([...todos.slice(0, index), {...todos[index], done: true}, ...todos.slice(index+1)])
  } 

  const handleNewTodo = (todo: Todo) => {
    setTodos(current => [...current, todo])
  }

  return (
    <div className="App">
      <NewTodo onNewTodo={handleNewTodo}/>
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
