const Name = document.getElementById('nameInput')
const job = document.getElementById('jobInput')
const age = document.getElementById('ageInput')
const bioInput = document.getElementById('bioInput')
const nameDisplay = document.getElementById('nameDisplay')
const jobDisplay = document.getElementById('jobDisplay')
const ageDisplay = document.getElementById('ageDisplay')
const bioDisplay = document.getElementById('bioDisplay')

Name.addEventListener("input", (e) => {
 nameDisplay.innerHTML = e.target.value
})

job.addEventListener("input", (e) => {
 jobDisplay.innerHTML = e.target.value
})

age.addEventListener("input", (e) => {
 ageDisplay.innerHTML = e.target.value
})

bioInput.addEventListener("input", (e) => {
 bioDisplay.innerHTML = e.target.value
})

