const numBtn = document.getElementsByClassName("btn")
const display = document.getElementById("display")
const secdisplay = document.getElementById("secdisplay")


Array.from(numBtn).forEach((numBtn) => {
  numBtn.addEventListener("click", (e) => {
    if(e.target.innerHTML != "="){ 
      if(display.value == 0){
        display.value = e.target.innerHTML
      }
      else{
        display.value += e.target.innerHTML
      }

    }

    if(e.target.innerHTML === "="){
        secdisplay.value = display.value
        display.value = eval(display.value).toFixed(3);
    }
    if(e.target.innerHTML === "AC"){
      display.value =  0
      secdisplay.value = null
    }
    if(e.target.innerHTML === "C"){
      display.value =  0
      secdisplay.value = null
    }
    
  })
})





