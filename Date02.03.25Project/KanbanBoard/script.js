const addTaskBtn = document.getElementById("addTaskBtn")
const todoBoard = document.getElementById("todoBoard")
const allBoard = document.querySelectorAll(".board")
const allItems = document.querySelectorAll(".item")

function attachDragevents(target){
    target.addEventListener('dragstart', () => {
        target.classList.add('flying')
    })
    target.addEventListener('dragend', () => {
        target.classList.remove('flying')
    })
}

addTaskBtn.addEventListener('click', () => {
  const input = prompt("what is the Task")
  if(!input) return
  const taskCard = document.createElement('p')
  taskCard.setAttribute("draggable", true)
  taskCard.classList.add("item")
  taskCard.innerText = input
  todoBoard.appendChild(taskCard)
})


const flyingElement = allItems.forEach(attachDragevents)

allBoard.forEach(board =>{
    board.addEventListener('dragover', () => {
      console.log(board, "kuch to upar se gaya", flyingElement);      
    })
})






