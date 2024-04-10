import { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

   interface TodoItem {
        id: string;
        text: string;
        completed: boolean;
      }

   const TodoApp = () => {
     const [todos, setTodos] = useState<TodoItem[]>([]);
     const [newTodo, setNewTodo] = useState('');
     const [total, setTotal] = useState(0);

     const addTodo = () => {
       if (newTodo !== '') {
         const newId = crypto.randomUUID();
         const newTodoItem: TodoItem = {
           id: newId,
           text: newTodo,
           completed: false,
         };
         setTodos([...todos, newTodoItem]);
         setNewTodo('');
         setTotal(prev=>prev+1);
       }
       else{
        alert("Enter some data")
       }
     };

     const removeTodo = (id: string) => {
       const updatedTodos = todos.filter((todo) => todo.id !== id);
       setTodos(updatedTodos);
       setTotal(prev=>prev-1);
     };

     const toggleComplete = (id: string) => {
       const updatedTodos = todos.map((todo) => {
         if (todo.id === id) {
           return { ...todo, completed: !todo.completed };
         }
         return todo;
       });
       setTodos(updatedTodos);
     };

     return (
       <div className=' w-10/12 md:w-8/12 lg:w-7/12 flex flex-col gap-4 lg:gap-7 m-auto justify-center items-center p-2 mt-5 pb-4'>
         <h1 className=' text-3xl font-bold text-blue-600 drop-shadow-lg'>Todo App</h1>

         {/* Input field */}
         <input
         className='w-11/12 md:w-8/12 border-2 border-gray-500 h-10 focus:outline-none focus:border-blue-800 rounded text-center'
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

        {/* Tasks */}
         <ul className='w-11/12 md:w-8/12 flex flex-col justify-center items-start p-2 gap-4 lg:gap-6'>

          {todos.length>0 ? <div className=' flex flex-col justify-center items-center w-full'> <span className=' font-semibold'>Total Tasks : {total}</span> <hr className=' w-full bg-blue-800 border border-blue-800 mb-2' /></div> : ""}

           {todos.map((todo) => (
             <li key={todo.id} className='h-auto p-3 border-2 border-teal-700 shadow-md shadow-blue-950/80 w-full flex justify-between items-center rounded-md flex-wrap bg-amber-50'>
                
                <button onClick={() => toggleComplete(todo.id)} className='mx-2 border-transparent border-2 rounded-full hover:border-black'> <FaCheck/></button>
               
               <div className={`${todo.completed?' line-through text-red-700/80':'none'} break-words w-9/12 text-center text-lg `}>
                    {todo.text}
                </div>
               
               <button onClick={() => removeTodo(todo.id)} className='mx-2 border-transparent border-2 rounded-full hover:border-black'> <MdDelete/></button>
             </li>
           ))}
         </ul>
       </div>
     );
   };

   export default TodoApp;