import React, { useState } from 'react';
import InputField from './components/InputField';
import './index.css';
import { Todo } from './model';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }])
      setTodo("");
    }

  }

  const onDragEnd = ( result: DropResult ) => {

    const { destination, source } = result;

    if(!destination){
      return;
    }
    if(destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    
    let add
    let active = todos
    let complete = completedTodos;
    
    if(source.droppableId === "ToDoActive"){
      add = active[source.index]
      active.splice(source.index, 1)
    } else {
      add = complete[source.index]
      complete.splice(source.index, 1)
    }

    if(destination.droppableId === "ToDoActive"){
      active.splice(destination.index, 0, add)
    } else {
      complete.splice(destination.index, 0, add)
    }

    setCompletedTodos(complete)
    setTodos(active)

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='w-full min-h-screen md:h-screen flex flex-col justify-start items-center bg-blue-300'>
        <div>
          <h1 className='font-bold text-xl md:text-2xl my-8 text-white'>
            Monica To-Do List
          </h1>
        </div>

        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />

      </div>
    </DragDropContext>

  )
}

export default App;
