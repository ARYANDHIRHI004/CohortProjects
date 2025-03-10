const timeElement = document.getElementById('time')
const dateElement = document.getElementById('date')

function updateClock(){
   
    const now = new Date()
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2,"0");
    const seconds = now.getSeconds().toString().padStart(2,"0");
    const ampm = now.getHours() >= 12? "PM": "AM";
    const date = now.toLocaleDateString()

    timeElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`
    dateElement.textContent = `Date: ${date}`

}
setInterval(updateClock, 1000)

updateClock()

