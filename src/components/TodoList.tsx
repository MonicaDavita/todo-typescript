import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Todo } from '../model'
import SingleTodo from './SingleTodo'

interface Props {
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    completedTodos: Todo[],
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
}

const TodoList = ({ todos, setTodos, completedTodos, setCompletedTodos }: Props) => {
    return (
        <div className='w-[95%] h-screen flex flex-col md:flex-row mx-4 mt-8 px-8 justify-start md:justify-between'>
            <Droppable droppableId='ToDoActive'>
                {(provided) => (
                    <div className='flex flex-col justify-start items-center w-full h-max my-8 bg-green-200 rounded-lg mx-2'
                        ref={provided.innerRef} {...provided.droppableProps}>
                        <span className='text-xl border-b-2 border-green-400 font-bold text-green-800 mt-4 mb-6'>
                            Active Task
                        </span>
                        {todos?.map((todo, index) => (
                            <SingleTodo
                                index={index}
                                todo={todo}
                                key={todo.id}
                                todos={todos}
                                setTodos={setTodos}

                            />
                        ))}
                        {provided.placeholder}

                    </div>
                )}
            </Droppable>
            <Droppable droppableId='ToDoCompleted'>
                {(provided) => (
                    <div className='flex flex-col justify-start items-center w-full h-max my-8 bg-red-200 rounded-lg mx-2'
                        ref={provided.innerRef} {...provided.droppableProps}>
                        <span className='text-xl font-bold text-red-800 mt-4 border-b-2 border-red-400 mb-6'>
                            Completed Task
                        </span>
                        {completedTodos?.map((todo, index) => (
                            <SingleTodo
                                index={index}
                                todo={todo}
                                key={todo.id}
                                todos={completedTodos}
                                setTodos={setCompletedTodos}

                            />
                        ))}
                        {provided.placeholder}

                    </div>
                )}
            </Droppable>


        </div>
    )
}

export default TodoList