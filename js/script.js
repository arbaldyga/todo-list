let todoInput; // input where user enter task's content
let errorInfo; // info about missing tasks or requirement to enter some text
let addBtn; // add button - adds new elements to list
let ulList; // tasks list, contains UL tags
let newTodo; // new task, new LI

let popup; // popup
let popupInfo; //warns if user is going to put empty input
let todoEdit;
let todoToEdit;
let popupInput;
let popupAddBtn;
let popupCloseBtn;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	//downloads documents
	todoInput = document.querySelector(".todo-input");
	errorInfo = document.querySelector(".error-info");
	addBtn = document.querySelector(".btn-add");
	ulList = document.querySelector(".todolist ul");
	popup = document.querySelector(".popup");
	popupInfo = document.querySelector(".popup-info");
	popupInput = document.querySelector(".popup-input");
	popupAddBtn = document.querySelector(".accept");
	popupCloseBtn = document.querySelector(".cancel");
};

const prepareDOMEvents = () => {
	addBtn.addEventListener("click", addNewTodo);
	ulList.addEventListener("click", checkClick);
	popupCloseBtn.addEventListener("click", closePopup);
	popupAddBtn.addEventListener("click", changeTodoText);
	todoInput.addEventListener("keyup", enterKeyCheck);
};

const addNewTodo = () => {
	if (todoInput.value !== "") {
		newTodo = document.createElement("li");
		newTodo.textContent = todoInput.value;
		// console.log(newTodo);
		createToolsArea();
		ulList.append(newTodo);

		todoInput.value = "";
		errorInfo.textContent = "";
	} else {
		errorInfo.textContent = "You can't add an empty task!";
	}
};
const createToolsArea = () => {
	const toolsPanel = document.createElement("div");
	toolsPanel.classList.add("tools");
	newTodo.append(toolsPanel);

	const completeBtn = document.createElement("button");
	completeBtn.classList.add("complete");
	completeBtn.innerHTML = '<i class="fas fa-check"></i>';

	const editBtn = document.createElement("button");
	editBtn.classList.add("edit");
	editBtn.textContent = "EDIT";

	const deleteBtn = document.createElement("button");
	deleteBtn.classList.add("delete");
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

	toolsPanel.append(completeBtn, editBtn, deleteBtn);
};

const checkClick = (e) => {
	// console.log(e.classList.contains("complete"));
	if (e.target.matches(".complete")) {
		// console.log("completed");
		// console.log(e.target.closest("li"));
		e.target.closest("li").classList.toggle("completed");
		e.target.classList.toggle("completed");
	} else if (e.target.matches(".edit")) {
		// console.log("edit");
		editTodo(e);
	} else if (e.target.matches(".delete")) {
		// console.log("delete");
		deleteTodo(e);
	}
};

const editTodo = (e) => {
	todoToEdit = e.target.closest("li");

	popupInput.value = todoToEdit.firstChild.textContent;
	popup.style.display = "flex";
};

const closePopup = () => {
	popup.style.display = "none";
	popupInfo.textContent = "";
};

const changeTodoText = () => {
	if (popupInput.value !== "") {
		todoToEdit.firstChild.textContent = popupInput.value;
		popup.style.display = "none";
		popupInfo.textContent = "";
	} else {
		popupInfo.textContent = "Enter some text!";
	}
};

const deleteTodo = (e) => {
	e.target.closest("li").remove();

	const allTodos = ulList.querySelectorAll("li");

	if (allTodos.length === 0) {
		errorInfo.textContent = "There are no tasks on the list";
	}
};

const enterKeyCheck = (e) => {
	if (e.key === "Enter") {
		addNewTodo();
	}
};
document.addEventListener("DOMContentLoaded", main);
