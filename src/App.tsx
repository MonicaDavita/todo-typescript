import React, { useState } from 'react';
import InputField from './components/InputField';
import './index.css';
import { Todo } from './model';
import TodoList from './components/TodoList';

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if(todo){
      setTodos([...todos, {id: Date.now(), todo, isDone: false}])
      setTodo("");
    }

  }

  console.log(todo);

  return (
    <div className='w-[100vw] h-[100vh] flex flex-col justify-start items-center bg-blue-300'>
      <div>
        <h1 className='font-bold text-xl md:text-2xl my-8 text-white'>
          Monica To-Do List
        </h1>
      </div>

      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      <TodoList todos={todos} setTodos={setTodos} />
    
    </div>
  )
}

export default App;
