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
