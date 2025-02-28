const taskInput = document.getElementById('taskInput')
const addButton = document.getElementById('addButton')
const taskList = document.getElementById('taskList')
const totalTasks = document.getElementById('totalTasks')
const completedTasks = document.getElementById('completedTasks')

let taskCount = 0
let completedCount = 0

function addTask(text) {
  const li = document.createElement('li')
  li.className = 'task-item'

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.className = 'complete-checkbox'

  const taskText = document.createElement('span')
  taskText.className = 'task-text'
  taskText.textContent = text

  const deleteButton = document.createElement('button')
  deleteButton.className = 'delete-button'
  deleteButton.textContent = 'Delete'

  li.appendChild(checkbox)
  li.appendChild(taskText)
  li.appendChild(deleteButton)

  li.style.opacity = '0'
  taskList.appendChild(li)
  requestAnimationFrame(() => {
    li.style.opacity = '1'
  })

  taskCount++
  updateCounters()

  checkbox.addEventListener('change', () => {
    li.classList.toggle('completed', checkbox.checked)
    completedCount += checkbox.checked ? 1 : -1
    updateCounters()
  })

  deleteButton.addEventListener('click', () => {
    li.style.opacity = '0'
    li.addEventListener('transitionend', () => {
      if (checkbox.checked) completedCount--
      taskCount--
      li.remove()
      updateCounters()
      checkEmptyList()
    })
  })
}

function updateCounters() {
  totalTasks.textContent = `Total tasks: ${taskCount}`
  completedTasks.textContent = `Completed: ${completedCount}`
}

function checkEmptyList() {
  const emptyMessage = taskList.querySelector('.empty-list')

  if (taskCount === 0) {
    if (!emptyMessage) {
      const message = document.createElement('li')
      message.className = 'empty-list'
      message.textContent = 'No tasks yet. Add one above!'
      taskList.appendChild(message)
    }
  } else if (emptyMessage) {
    emptyMessage.remove()
  }
}

addButton.addEventListener('click', () => {
  const text = taskInput.value.trim()
  if (text) {
    addTask(text)
    taskInput.value = ''
    taskInput.focus()

    const emptyMessage = taskList.querySelector('.empty-list')
    if (emptyMessage) {
      emptyMessage.remove()
    }
  }
})

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const text = taskInput.value.trim()
    if (text) {
      addTask(text)
      taskInput.value = ''

      const emptyMessage = taskList.querySelector('.empty-list')
      if (emptyMessage) {
        emptyMessage.remove()
      }
    }
  }
})

checkEmptyList()
