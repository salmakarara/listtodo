let input = document.querySelector(".input");
let btn = document.querySelector(".add");
let tasks = document.querySelector(".tasks");

let arr=[];

if(localStorage.getItem("tasks")){
    arr = JSON.parse(localStorage.getItem("tasks"));
}

getdata(); 
// check input not emty
btn.onclick = function(){
    if (input.value !== "") {
        addtask(input.value); //add task to tasks array
        input.value ="";
    }
}

tasks.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        // Remove Task From Local Storage
        deleteLS(e.target.parentElement.getAttribute("id"));


        // Remove Element From Page
        e.target.parentElement.remove();
        }

    });


function addtask(task){
    const obj ={
        id:Date.now(),
        title:task,
        status:false,
    };
    // push task to array
    arr.push(obj);
    // add task to page
    AddElement(arr);

    //add task l local storage
    Addtols(arr);

}

function AddElement(arr){
    tasks.innerhtml ="";
    // loop arr
    arr.forEach((obj) => {
        let div = document.createElement("div");
        div.className ="task";
        if(obj.status===true){
            div.className ="task done";
        }

        div.setAttribute("id",obj.id);
        div.appendChild(document.createTextNode(obj.title));

        let span = document.createElement("span");
        span.className ="del";
        span.appendChild(document.createTextNode("delete"));

        div.appendChild(span);
        tasks.appendChild(div);
        

    });
}

function Addtols(arr){
    window.localStorage.setItem("tasks",JSON.stringify(arr));
}
// get data from localstorage
function getdata(){
    let data = window.localStorage.getItem("TASKS");
    if(data){
        let TASKS= JSON.parse(data);
        AddElement(TASKS);
    }
}
function deleteLS(taskId) {
    // For Explain Only
    // for (let i = 0; i < arrayOfTasks.length; i++) {
    //   console.log(`${arrayOfTasks[i].id} === ${taskId}`);
    // }
    arr = arr.filter((task) => task.id != taskId);
    Addtols(arr);
  }