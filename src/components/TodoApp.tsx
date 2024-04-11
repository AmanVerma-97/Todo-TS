import React, { useState } from 'react';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, MouseSensor, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors } from "@dnd-kit/core"
import Task from './Task';
import Input from './Input';

export interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
}

const TodoApp:React.FC = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [total, setTotal] = useState(0);

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

    //to set dragged element's position.
    const getTaskPos = (id:string)=> todos.findIndex(task => task.id===id);
    
    const handleDragEnd=(event:any)=>{
        const {active, over}=event;
        if(active.id === over.id){
            return;
        }

        setTodos( todos => {
            const ogPos= getTaskPos(active.id);
            const newPos= getTaskPos(over.id);

            return arrayMove(todos, ogPos, newPos);
        })
    }

    const sensors= useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { //THIS ENSURES 'Onclik' FUNCTIONALITIES STILL WORKS FOR ELEMENTS.
              distance: 5
            }
          }),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
        useSensor(MouseSensor),
    )

    return (
    <div className=' w-10/12 md:w-8/12 lg:w-7/12 flex flex-col gap-4 lg:gap-7 m-auto justify-center items-center p-2 mt-5 pb-4'>
        
        <Input todos={todos} setTodos={setTodos} setTotal={setTotal} total={total}/>

    {/* Tasks */}
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd} sensors={sensors}>
        <ul className='w-11/12 md:w-8/12 flex flex-col justify-center items-start p-3 gap-4 lg:gap-6 mt-52'>

        {todos.length>0 ? <div className=' flex flex-col justify-center items-center w-full'> <span className=' font-semibold'>Total Tasks : {total}</span> <hr className=' w-full bg-blue-800 border border-blue-800 mb-2' /></div> : ""}
        
        <SortableContext items={todos} strategy={verticalListSortingStrategy}>
        
        {todos.map((todo) => (

            <Task todo={[todo]} toggleComplete={toggleComplete} removeTodo={removeTodo} key={todo.id} id={todo.id}/>
            //Pass todo as an 'array' and access each property using todo[0].property.
        ))}

        </SortableContext>

        </ul>
    </DndContext>
    </div>
    );
};

export default TodoApp;