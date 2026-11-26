const initialItems = [
	'Сделать проектную работу',
	'Полить цветы',
	'Пройти туториал по Реакту',
	'Сделать фронт для своего проекта',
	'Прогуляться по улице в солнечный день',
	'Помыть посуду',
]

let items = initialItems

const listElement = document.querySelector('.to-do__list')
const formElement = document.querySelector('.to-do__form')
const inputElement = document.querySelector('.to-do__input')

function loadTasks() {
	const savedTasks = localStorage.getItem('tasks')
	return savedTasks ? JSON.parse(savedTasks) : initialItems
}

function createItem(item) {
	const template = document.getElementById('to-do__item-template')
	const clone = template.content.querySelector('.to-do__item').cloneNode(true)
	const textElement = clone.querySelector('.to-do__item-text')
	const deleteButton = clone.querySelector('.to-do__item-button_type_delete')
	const duplicateButton = clone.querySelector(
		'.to-do__item-button_type_duplicate',
	)
	const editButton = clone.querySelector('.to-do__item-button_type_edit')

	textElement.textContent = item

	deleteButton.addEventListener('click', () => {
		clone.remove()
		const items = getTasksFromDOM()
		saveTasks(items)
	})

	duplicateButton.addEventListener('click', () => {
		const itemName = textElement.textContent
		const newItem = createItem(itemName)
		listElement.prepend(newItem)
		const items = getTasksFromDOM()
		saveTasks(items)
	})

	editButton.addEventListener('click', () => {
		textElement.setAttribute('contenteditable', 'true')
		textElement.focus()
	})

	textElement.addEventListener('keydown', event => {
		if (event.key === 'Enter') {
			event.preventDefault()
			textElement.blur()
		}
	})

	textElement.addEventListener('blur', () => {
		textElement.removeAttribute('contenteditable')
		const items = getTasksFromDOM()
		saveTasks(items)
	})

	return clone
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll('.to-do__item-text')
	const tasks = []

	itemsNamesElements.forEach(element => {
		tasks.push(element.textContent)
	})

	return tasks
}

function saveTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

formElement.addEventListener('submit', event => {
	event.preventDefault()

	const item = inputElement.value.trim()

	if (!item) return

	const newItem = createItem(item)
	listElement.prepend(newItem)

	items = getTasksFromDOM()
	saveTasks(items)

	inputElement.value = ''
})

items = loadTasks()

items.forEach(item => {
	const newItem = createItem(item)
	listElement.append(newItem)
})
