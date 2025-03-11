const tiemInput = document.getElementById('timeInput')
const startButton = document.getElementById('startButton')
const countdownDisplay = document.getElementById('countdownDisplay')
const pauseButton = document.getElementById('PauseButton')
const resumeButton = document.getElementById('resumeButton')

startButton.addEventListener("click", (e) => {
    let timeInSecond = Number(tiemInput.value)

    if (isNaN(timeInSecond) || timeInSecond < 0) {
        countdownDisplay.innerText = "Please enter a valid input"
    }
    let timer;
    function timerfun(){
        timer = setInterval(function(){
            timeInSecond--;
            countdownDisplay.innerHTML = `Time remaining ${timeInSecond}`
    
            if(timeInSecond <= 0){
                clearInterval(timer)
                countdownDisplay.innerText = `Time up ⏲`
            }
        }, 1000)
    }

    timerfun()

    pauseButton.addEventListener("click", (e) => {
      clearInterval(timer)
      timer = null
    })

    resumeButton.addEventListener("click", (e) => {
        timerfun()    
    })
})
