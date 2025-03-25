import React, { useEffect, useState } from "react";
import toast, {Toaster} from "react-hot-toast";
import TodoCard from "./Components/TodoCard";
import "./App.css"


const App = () => {
const [selectedTab, setSelectedTab] = useState("All");
const [todoItem, setTodoItem] = useState({
   task: "",
   priority: ""
});


const [todoList, setTodoList] = useState([]);

 useEffect(()=> {

  if(todoList.length == 0) return;
  localStorage.setItem("todoList", JSON.stringify(todoList));

 }, [todoList])

 useEffect(()=> {
  const getListFromLS = JSON.parse(localStorage.getItem("todoList") || "[]");
  setTodoList(getListFromLS);
 }, [])

 const onDelete = (index)=> {
    const listAfterDeletion = todoList.filter((todoItem, i)=> i != index);
    setTodoList(listAfterDeletion);
    toast.success("Task Deleted Successfully")
 }

  return (
    <div className="main-container h-dvh p-6 relative">

      <div className="flex  border-none justify-between m-auto rounded-xl p-6 bg-white/50 lg:w-[60%] md:w-[100%] sm:w-[100%]">
        <input type="text" className="border focus:outline-none bg-white/50 p-2 w-[450px] rounded-xl sm:w-[300px]" placeholder="task" 
         onChange={(e)=> {
          setTodoItem({
            ...todoItem,
            task:e.target.value
          })
         }}
         value={todoItem.task}
        />
        
        <div className="border-none rounded-xl px-2 py-1 bg-blue-800 sm:text-sm">

          <select className="outline-none text-white cursor-pointer"
           onChange={(e)=> {
            setTodoItem({
              ...todoItem,
              priority:e.target.value
            })
           }}
          value={todoItem.priority}
          >
            <option value={""} className="bg-blue-400">Priority</option>
            <option value={"High"} className="bg-blue-400">High</option>
            <option value={"Medium"} className="bg-blue-400">Medium</option>
            <option value={"Low"} className="bg-blue-400">Low</option>
          </select>
        </div>
        <button className="border-none rounded-xl text-white px-6  bg-blue-800 cursor-pointer sm:text-sm"
        onClick={()=> {
           if(!todoItem.task){
            toast.error("Please Enter the task")
           }
           
           if(!todoItem.priority){
            toast.error("select priority")
          }
      
           setSelectedTab("All");
          

          setTodoList([todoItem, ...todoList])
        }}
        >Add</button>
      </div>

      <div className="text-white my-2 w-[50%] rounded-xl m-auto mt-6 border-4 p-2 flex justify-between ">
        {["All","High","Medium","Low"].map((tab, i)=> {
         
         return (
        <span className={`px-2 rounded-xl cursor-pointer 
          ${tab == selectedTab ? "bg-white text-black":"text-white"}`}
          key={i}
          onClick={()=> setSelectedTab(tab)}
          >{tab}</span>
         );
        })}

      </div>

      <div className="flex justify-center pt-6 flex-wrap ">
        {todoList.map((taskList, index)=> {
        const {task, priority} = taskList;

        if(selectedTab != "All" && priority != selectedTab){
          return null;
        }

        return <TodoCard 
        task={task} 
        priority={priority} 
        key={index}
        index={index}
        onDelete={onDelete}
        />
        })}
      </div>
      <Toaster/>
    </div>
  );
};

export default App;
