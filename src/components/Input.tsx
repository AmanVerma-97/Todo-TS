import { useState } from "react"
import { TodoItem } from "./TodoApp";

interface ChildProps{
    setTodos:(todo:TodoItem[])=> void,
    todos:TodoItem[], 
}
const Input: React.FC<ChildProps> = ({setTodos, todos}) => {

  const [newTodo, setNewTodo] = useState(' ');

  const handleAddTodo = (newId: string): void => {
    const newTodoItem: TodoItem = {
      id: newId,
      text: newTodo, 
      completed: false,
    };
    const updatedTodos = [...todos, newTodoItem];
    setTodos(updatedTodos); 
  };

  const addTodo = () => {
    if (newTodo !== '') {
        const newId = crypto.randomUUID();
        handleAddTodo(newId);
        localStorage.setItem('todos', JSON.stringify(todos));
        setNewTodo('');
    }
    else{
    alert("Enter some data")
    }
    };

  return (
    <div className='flex flex-col gap-4 lg:gap-7 m-auto justify-center items-center py-4 px-1 fixed top-0 bg-white w-10/12 md:w-8/12 lg:w-7/12'>
            <h1 className=' text-3xl font-bold text-teal-800 drop-shadow-md'>Todo App ✅</h1>

            {/* Input field */}
            <input
            className='w-11/12 md:w-8/12 border-2 border-gray-500 h-10 focus:outline-none focus:border-teal-700 rounded text-center '
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder='Enter task'
            />
            {/* Add button */}
            <button onClick={addTodo} 
            className='border-2 border-black p-2 text-black hover:text-green-600 rounded-md font-semibold'>
            Add Todo
            </button>
    </div>
  )
}

export default Input