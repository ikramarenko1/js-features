const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const popupTitle = popupBox.querySelector("header p");
const closeIcon = popupBox.querySelector("header i");
const addBtn = popupBox.querySelector("button");
const titleTag = popupBox.querySelector("input");
const descriptionTag = popupBox.querySelector("textarea");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]"); // Берем заметки с локального хранилища, если они есть, и парсим их в объект. Если заметок нет - оставляем пустой массив

let isUpdate = false;
let updateId;

addBox.addEventListener("click", () => {
	popupBox.classList.add("show");
	titleTag.focus();
});

closeIcon.addEventListener("click", () => {
	isUpdate = false;

	titleTag.value = "";
	descriptionTag.value = "";
	popupBox.classList.remove("show");
	addBtn.innerHTML = "Add a new note";
	popupTitle.innerHTML = "Add Note";
});

// Показывание всех заметок
function showNotes() {
	document.querySelectorAll(".note").forEach(note => note.remove()); // Этой строкой мы убираем показ дублей при добавлении новой заметки. Мы убираем все существующие заметки на странице, и показываем их обратно

	notes.forEach((note, index) => {
		let liTag = `<li class="note">
							<div class="details">
								<p>${note.title}</p>
								<span>${note.description}</span>
							</div>
							<div class="bottom-content">
								<span>${note.date}</span>
								<div class="settings">
									<i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
									<ul class="menu">
										<li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
										<li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
									</ul>
								</div>
							</div>
						</li>`;
		addBox.insertAdjacentHTML("afterend", liTag);
	});
}

showNotes();

// Показывание меню с edit / delete
function showMenu(elem) {
	elem.parentElement.classList.add("show"); // Достаем div.settings, который является родителем значка "три точки", по которому мы тыкаем

	document.addEventListener("click", e => {
		// Убираем класс show с div.settings, если мы кликаем по документу
		if (e.target.tagName != "I" || e.target != elem) {
			elem.parentElement.classList.remove("show");
		}
	})
}


// Удаление заметки
function deleteNote(noteId) {
	let confirmDel = confirm("Are you sure you want to delete this note?");
	if (!confirmDel) return;

	notes.splice(noteId, 1); // Удаляем выбранную заметку с массива

	// Обновляем локальное хранилище без удаленной заметки
	localStorage.setItem("notes", JSON.stringify(notes)); // Сохраняем заметки в локальное хранилище + конвертируем в строку, для того, чтобы текст воспринимался

	showNotes();
}


// Изменение заметки
function updateNote(noteId, title, description) {
	isUpdate = true;
	updateId = noteId;

	addBox.click(); // Открываем поп-ап
	addBtn.innerHTML = "Update Note";
	popupTitle.innerHTML = "Update a note";

	titleTag.value = title;
	descriptionTag.value = description;
}


// Функция на кнопку Add new note
addBtn.addEventListener("click", (e) => {
	e.preventDefault();

	let noteTitle = titleTag.value;
	let noteDescription = descriptionTag.value;

	if (noteTitle || noteDescription) {
		// Вычисляем текущую дату
		let dateObj = new Date();
		let day = dateObj.getDate();
		let month = months[dateObj.getMonth()];
		let year = dateObj.getFullYear();

		let noteInfo = {
			title: noteTitle,
			description: noteDescription,
			date: `${month} ${day}, ${year}`
		}

		if (!isUpdate) {
			notes.push(noteInfo); // Пушим новую заметку в массив заметок
		} else {
			isUpdate = false;
			notes[updateId] = noteInfo; // Обновляем существующую заметку
		}

		localStorage.setItem("notes", JSON.stringify(notes)); // Сохраняем заметки в локальное хранилище + конвертируем в строку, для того, чтобы текст воспринимался
		closeIcon.click(); // Закрываем поп-ап после того, как добавили заметку

		showNotes();
	}
});