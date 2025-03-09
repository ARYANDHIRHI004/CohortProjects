const addBoard = document.getElementById('addBoxBtn')
const pop = document.getElementById('pop')
const cross1 = document.getElementById('cross1')
const task = document.getElementById('task')
const desc = document.getElementById('desc')
const disccontdesc = document.getElementById('disccont')
const favcolor = document.getElementById('favcolor')
const addBoxBtn2 = document.getElementById('addBoxBtn2')
const boxContainer =  document.getElementsByClassName('container')[0]
const btns = document.querySelectorAll('.btns')

addBoard.addEventListener("click", (e) => {
  addBoxBtn2.innerText = "Create Box"
  pop.removeAttribute("style")
  disccontdesc.style.display = "none"  
})

function createBox(input){
  const box = document.createElement('div')
  box.classList.add("board")
  box.setAttribute("id",String(input).trim())
  const heading = document.createElement("h1")
  heading.innerText = input
  box.appendChild(heading)
  const innerBtn = document.createElement("button")
  innerBtn.classList.add("btns")
  innerBtn.innerText = `+ Add Task`
  innerBtn.setAttribute("id", `${String(input)}Task`)
  getBtns(innerBtn)
  box.appendChild(innerBtn)
  boxContainer.appendChild(box)
} 

addBoxBtn2.addEventListener("click", (e) => {
  const input = task.value
  if(!input) return
  if(addBoxBtn2.innerText === "Create Box"){
    createBox(input)
  }
  task.value = null 
  pop.style.display = "none"
  disccontdesc.removeAttribute("style") 
})

function createTaskCard(parentID){
  const taskCard = document.createElement("p");
  taskCard.classList.add('item')

  const parent = document.getElementById(`${parentID}`)
  const taskValue = task.value
  if(!taskValue) return
  addBoxBtn2.addEventListener('click', (e) => {
    console.log(taskValue);
    taskCard.innerText = taskValue;
    parent.appendChild(taskCard)
    pop.style.display = "none"
  })
    

}

function getBtns(btns){
    pop.removeAttribute("style")    
    // addBoxBtn2.innerText = "Create Task"
    const parentID = btns.parentElement.getAttribute('id')
    createTaskCard(parentID)  
}

btns.forEach((btns) => {
  btns.addEventListener("click", (e) => {
  getBtns(btns)
  })
  
})

cross1.addEventListener("click", (e) => {
    pop.style.display = "none"
    task.value = null
    disccontdesc.removeAttribute("style") 
})