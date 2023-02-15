import React, { useState, useRef, useEffect } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { AiFillEdit, AiFillDelete, AiOutlineCheck } from 'react-icons/ai'
import { Todo } from '../model'

interface Props {
    index: number,
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo = ({ todo, todos, setTodos, index }: Props) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);
    const inputRef = useRef<HTMLInputElement>(null)

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        setTodos(
            todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
        )

        setEdit(false);
    }

    const handleDone = (id: number) => {
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo))
    }

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided) => (
                    <form className='flex flex-row w-[80%] rounded p-4 my-4 bg-transparent text-black justify-center items-center border-b border-white ' onSubmit={(e) => handleEdit(e, todo.id)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {
                            edit ? (
                                <input value={editTodo} onChange={(e) => setEditTodo(e.target.value)}
                                    ref={inputRef}
                                    className='appearance-none bg-transparent border-b border-b-white w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
                                />
                            ) :
                                todo.isDone ? (
                                    <span className='line-through text-white'>
                                        {todo.todo}
                                    </span>
                                ) : (
                                    <span className=''>
                                        {todo.todo}
                                    </span>
                                ) }

                        <div className='flex flex-row ml-8'>
                            <span className='cursor-pointer' onClick={() => {
                                if (!edit && !todo.isDone) {
                                    setEdit(!edit)
                                }
                            }
                            }>
                                <AiFillEdit />
                            </span>
                            <span className='ml-4 cursor-pointer' onClick={() => handleDelete(todo.id)}>
                                <AiFillDelete />
                            </span>
                            <span className='ml-4 cursor-pointer' onClick={() => handleDone(todo.id)}>
                                <AiOutlineCheck />
                            </span>
                        </div>
                    </form>
                )
            }

        </Draggable>

    );
};

export default SingleTodo