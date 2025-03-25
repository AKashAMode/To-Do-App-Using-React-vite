import React from 'react'
import DeleteIcon from "../assets/delete.png"


const BADGE_PRIORITY_CLASSES = {
    High:"text-green-500 border-geen-500",
    Medium:"text-yellow-500 border-yellow-500",
    Low:"text-red-500 border-red-500",
  };

  const TASK_PRIORITY_CLASSES = {
    High:"border-6 border-green-500 ",
    Medium:"border-6 border-yellow-500",
    Low:"border-6 border-red-500",
  }

const TodoCard = ({task, priority, index, onDelete}) => {
  return (
    <div key={index} className={` p-2 w-[90%] h-[100px] text-white my-2 px-2 shadow-lg 
         mt-4 border-5 rounded-2xl  relative ${TASK_PRIORITY_CLASSES[priority]}`}>
       <h2 className="p-2 text-xl">{task}</h2>
       <span className={`absolute right-5 px-2 top-3.5 border rounded-xl ${BADGE_PRIORITY_CLASSES[priority]}`}
       >{priority}</span>
       <img src={DeleteIcon} alt="deleteIcon" 
       className='cursor-pointer h-[25px] absolute right-5 bottom-2 text-white px-2  rounded-2xl'
       onClick={()=> {
        onDelete(index);
       }}
       />

     </div>
  )
}

export default TodoCard