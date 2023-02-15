import React from 'react'

interface Props {
  todo: string,
  setTodo: React.Dispatch<React.SetStateAction<string>>,
  handleAdd: (e: React.FormEvent) => void
}

const InputField = ({ todo, setTodo, handleAdd }: Props) => {
  return (
    <form className='w-full max-w-sm' onSubmit={(e) => handleAdd(e)}>
      <div className='flex items-center border-b border-blue-800 py-2 mx-12 md:mx-4'>
        <input
          className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
          type='text'
          placeholder='Input Task'
          value={todo}
          onChange={
            (e) => setTodo(e.target.value)
          }
        ></input>
        <button className='flex-shrink-0 bg-blue-700 hover:bg-blue-800 border-blue-700 hover:border-blue-800 text-sm border-4 text-white py-1 px-2 rounded-full' type='submit'>
          Add
        </button>
      </div>

    </form>
  )
}

export default InputField