const btns = document.getElementsByClassName("color-buttons")
const text =document.getElementById("mainHeading")

Array.from(btns).forEach((btns) => {
  btns.addEventListener("click", (e) => {

    if(e.target.innerHTML === "Reset"){
        text.removeAttribute("style")
    }
    console.log(e.target.innerHTML);
    text.style.color = e.target.innerHTML
     
  })
})