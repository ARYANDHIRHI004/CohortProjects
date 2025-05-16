const addTodoTaks = document.getElementById("addTodoTaks")
const popup = document.getElementsByClassName("popup")[0]
const addText = document.getElementById("addText")
const input = document.getElementById("input")
const items1 = document.getElementsByClassName("items1")[0]


addTodoTaks.addEventListener("click", (e) => {
    popup.removeAttribute("style")
})

function flyingclass(item){
  item.addEventListener("dragstart", () => {
      item.classList.add("flying")
    })
    item.addEventListener("dragend", () => {
      item.classList.remove("flying")
    })
}

addText.addEventListener("click", (e) => {
    console.log(input.value);
    if(!input.value) return
    const p = document.createElement("p")
    p.innerHTML = input.value
    p.setAttribute("class", "item")
    p.setAttribute("draggable", true)
    items1.appendChild(p)
    flyingclass(p)
    
    popup.style.display = "none"
    input.value = null
})   


const allBoards = document.querySelectorAll('.board')
const allItems = document.querySelectorAll(".item")

allItems.forEach((item)=>{
  flyingclass(item)
})

allBoards.forEach((board)=>{ 
  board.addEventListener("dragover", () => {
    const flyingElement = document.querySelector('.flying')
    board.childNodes[5].appendChild(flyingElement)     
  })
})





