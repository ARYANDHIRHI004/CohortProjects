/**
 * Write your challenge solution here
 */
const bulb = document.getElementById("bulb")
const toggleButton = document.getElementById("toggleButton")
const Status = document.getElementById("status")
const Body = document.getElementById("body")

toggleButton.addEventListener("click", (params) => {
    if (Status.innerHTML === "Status: Off") {
        bulb.className = 'bulb'
        Body.className = 'dark-mode'
        Status.innerHTML = "Status: On"
        
    }
    else{
        bulb.className = 'bulb off'
        Body.removeAttribute("class")
        Status.innerHTML = "Status: Off"

    }
  
}
)
