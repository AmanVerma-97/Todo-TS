import React from "react";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import {TodoItem} from "./TodoApp";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ChildProps {
    todo:TodoItem[] ;
    toggleComplete: (id: string) => void;
    removeTodo:(id:string) => void;
    id:string;
}

const Task : React.FC<ChildProps> = ({todo, toggleComplete, removeTodo, id}) => {

  const {attributes, listeners, transform, transition, setNodeRef} = useSortable({id})  ;



  const style={
    transition,
    transform:CSS.Transform.toString(transform),
  }

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style} className=" w-full flex justify-between items-center touch-none">
        <li key={todo[0].id} className='h-auto p-3 border-2 border-teal-700 shadow-md shadow-blue-950/80 w-full flex justify-between items-center rounded-md bg-amber-50'>
        
            <button onClick={()=>toggleComplete(todo[0].id)} className='mx-2 border-transparent border-2 rounded-full hover:border-black'> <FaCheck/></button>
            
            <p className={`${todo[0].completed?' line-through text-red-700/80':'none'} break-words w-9/12 text-center text-lg `}>
                {todo[0].text}
            </p>
            
            <button onClick={()=>removeTodo(todo[0].id)} className='mx-2 border-transparent border-2 rounded-full hover:border-black'><MdDelete/></button>
        </li>
        <div className=' ml-3'> { !todo[0].completed ? '👍':'✌️' }  </div>
    </div>
  )
}

export default Task