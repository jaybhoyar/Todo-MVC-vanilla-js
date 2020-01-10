// JS
const input = document.querySelector("input[type=text]");
const ul = document.querySelector("ul");
const footerList = document.querySelector(".footer");
let counter = document.querySelector(".counter");
let state = JSON.parse(localStorage.getItem("todoArr")) || [];
let id = Date.now();
const para = document.querySelector(".para");
let toggleAll = document.querySelector(".toggle_all");
let allButton = document.querySelector("#all_button");
let activeButton = document.querySelector("#active_button");
let completedButton = document.querySelector("#completed_button");
let clearCompleted = document.querySelector(".item_completed");

function AddState(event) {
	if (event.keyCode === 13 && event.target.value.trim() != "") {
		const todo = {
			name: event.target.value,
			isDone: false,
			id: ++id
		};
		state.push(todo);

		localStorage.setItem("todoArr", JSON.stringify(state));
		event.target.value = "";
		todoArray = JSON.parse(localStorage.getItem("todoArr"));
		viewTodo(todoArray);
	}
}

function viewTodo(todoArray) {
	ul.innerHTML = "";

	todoArray.forEach((todo, index) => {
		let li = document.createElement("li");
		let p = document.createElement("p");
		li.setAttribute("data-id", todo.id);
		p.classList.add("para");
		let spanX = document.createElement("span");
		let checkInput = document.createElement("input");
		checkInput.type = "checkbox";
		checkInput.setAttribute("data-id", todoArray.indexOf(todo));
		checkInput.id = "tick-" + index;
		// creating label
		const label = document.createElement("label");
		label.setAttribute("for", "tick-" + index);
		tickImgBox = document.createElement("div");
		tickImgBox.className = "tick_img_box";
		img = document.createElement("img");
		img.className = "tick";
		img.src = "tick.png";
		// Apppending the label and input to li
		tickImgBox.appendChild(img);
		label.appendChild(tickImgBox);
		li.appendChild(label);
		checkInput.checked = todo.isDone;
		li.classList.add("li_styles");
		li.setAttribute("data-index", todo.id);
		spanX.className = "remove_items";
		spanX.setAttribute("data-key", todo.id);
		p.innerHTML = todo.name;
		spanX.innerHTML = "×";
		li.append(checkInput, p, spanX);
		ul.append(li);
		let checkId = checkInput.parentElement.dataset.id;
		checkInput.addEventListener("click", () => handleCheck(checkId));
		p.addEventListener("dblclick", EditTodo);
		activeButton.addEventListener("click", activeStatus);
		if (todo.isDone == true) {
			img.src = "tick.png";
			clearCompleted.classList.remove("item_completed");
			clearCompleted.classList.add("item_completed_1");
		} else {
			img.src = "";
		}
	});

	if (todoArray.length > 0) {
		footerList.style.display = "block";
	} else {
		footerList.style.display = "none";
	}
	counter.textContent = itemCount();
}
function EditTodo(event) {
	// console.log(e.target);
	if (event.target.tagName === "P") {
		let currentP = event.target;
		let editInput = document.createElement("input");
		editInput.classList.add("edit_input");
		editInput.value = currentP.textContent;
		currentP.parentElement.replaceChild(editInput, currentP);
		editInput.parentElement.classList.remove("li_styles");
		editInput.parentElement.classList.add("li_styles_input");
		editInput.addEventListener("keydown", event1 => {
			if (event1.keyCode === 13 && event1.target.value != "") {
				editInput.parentElement.classList.add("li_styles");
				editInput.parentElement.classList.remove("li_styles_input");
				currentP.textContent = editInput.value;
				editInput.parentElement.replaceChild(currentP, editInput);
				let arr = state;
				arr.map(todo => {
					if (todo.id == currentP.parentElement.dataset.index) {
						todo.name = currentP.textContent;
					}
				});
				localStorage.setItem("todoArr", JSON.stringify(arr));
				console.log(arr);
				viewTodo(arr);
			}
		});
	}
}
function deleteTodo(event) {
	if (event.target.tagName == "SPAN") {
		let target = event.target;
		state = state.filter(todo => !(target.dataset.key == todo.id));

		state.forEach(i => {
			if (i.isDone == true) {
				clearCompleted.classList.remove("item_completed");
				clearCompleted.classList.add("item_completed_1");
			} else {
				clearCompleted.classList.remove("item_completed_1");
				clearCompleted.classList.add("item_completed");
			}
		});

		localStorage.setItem("todoArr", JSON.stringify(state));

		viewTodo(state);
	}
}

function handleCheck(id) {
	let len = 0;
	let checked = state.map(item => {
		if (item.id == id) {
			len++;
			item.isDone = !item.isDone;

			if (item.isDone == true) {
				clearCompleted.classList.remove("item_completed");
				clearCompleted.classList.add("item_completed_1");
			} else {
				clearCompleted.classList.remove("item_completed_1");
				clearCompleted.classList.add("item_completed");
			}
			return item;
		} else return item;
	});
	localStorage.setItem("todoArr", JSON.stringify(checked));
	viewTodo(checked);
	itemCount(len);
}
function itemCount() {
	let arr = state.filter(todo => todo.isDone == false);
	return arr.length;
}
function toggleAllInput() {
	let arr = state;
	let flag;
	arr.filter(todo => {
		if (todo.isDone == false) {
			todo.isDone = true;
			flag = 1;
		}
	});
	localStorage.setItem("todoArr", JSON.stringify(arr));
	viewTodo(arr);
	if (flag != 1) {
		arr.filter(todo => {
			if (todo.isDone == true) {
				todo.isDone = false;
				flag = 0;
			}
		});
	}
	localStorage.setItem("todoArr", JSON.stringify(arr));
	viewTodo(arr);
}
function allStatus() {
	allButton.classList.add("button_border");
	completedButton.classList.remove("button_border");
	activeButton.classList.remove("button_border");
	viewTodo(state);
}
function activeStatus() {
	allButton.classList.remove("button_border");
	completedButton.classList.remove("button_border");
	activeButton.classList.add("button_border");
	let arr = state.filter(i => i.isDone == false);
	viewTodo(arr);
	footerList.style.display = "block";
}
function completedStatus() {
	allButton.classList.remove("button_border");
	activeButton.classList.remove("button_border");
	completedButton.classList.add("button_border");
	let arr = state.filter(todo => todo.isDone == true);
	viewTodo(arr);
	footerList.style.display = "block";
}
function clearStatus() {
	let arr = state.filter(todo => todo.isDone == false);
	arr.forEach(todo => {
		if (todo.isDone == true) {
			clearCompleted.classList.remove("item_completed");
			clearCompleted.classList.add("item_completed_1");
		} else {
			clearCompleted.classList.remove("item_completed_1");
			clearCompleted.classList.add("item_completed");
		}
	});
	localStorage.setItem("todoArr", JSON.stringify(arr));
	state = arr;
	viewTodo(state);
}

viewTodo(state);

input.addEventListener("keydown", AddState);
ul.addEventListener("click", deleteTodo);
activeButton.addEventListener("click", activeStatus);
allButton.addEventListener("click", allStatus);
allButton.classList.add("button_border");
completedButton.addEventListener("click", completedStatus);
clearCompleted.addEventListener("click", clearStatus);
toggleAll.addEventListener("click", toggleAllInput);
