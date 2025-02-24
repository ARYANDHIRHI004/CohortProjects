const input = document.getElementById('taskInput')
const addBtn = document.getElementById('addButton')
const taskList = document.getElementById('taskList')
const deleteBtn = document.getElementById('deleteBtn')
const task_List = document.getElementsByClassName('task-list ')
let a = 1
addBtn.addEventListener('click', (e) => {
    let Input = input.value
    taskList.innerHTML += `<li id= ${a++} class = "task-item completed task-text " > <input type="checkbox"class="complete-checkbox " name="" id="">${Input}<button id = "deleteBtn" class="delete-button">Delete</button></li>`  
})

Array.from(task_List).forEach((task_List) => {
    
})