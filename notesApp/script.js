const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const closeIcon = popupBox.querySelector("header i");
const addBtn = popupBox.querySelector("button");
const titleTag = popupBox.querySelector("input");
const descriptionTag = popupBox.querySelector("textarea");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]"); // Берем заметки с локального хранилища, если они есть, и парсим их в объект. Если заметок нет - оставляем пустой массив

addBox.addEventListener("click", () => {
	popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
	titleTag.value = "";
	descriptionTag.value = "";
	popupBox.classList.remove("show");
});

// Показывание всех заметок
function showNotes() {
	document.querySelectorAll(".note").forEach(note => note.remove()); // Этой строкой мы убираем показ дублей при добавлении новой заметки. Мы убираем все существующие заметки на странице, и показываем их обратно

	notes.forEach((note) => {
		let liTag = `<li class="note">
							<div class="details">
								<p>${note.title}</p>
								<span>${note.description}</span>
							</div>
							<div class="bottom-content">
								<span>${note.date}</span>
								<div class="settings">
									<i class="uil uil-ellipsis-h"></i>
									<ul class="menu">
										<li><i class="uil uil-pen"></i>Edit</li>
										<li><i class="uil uil-trash"></i>Delete</li>
									</ul>
								</div>
							</div>
						</li>`;
		addBox.insertAdjacentHTML("afterend", liTag);
	});
}

showNotes();

addBtn.addEventListener("click", (e) => {
	e.preventDefault();

	let noteTitle = titleTag.value;
	let noteDescription = descriptionTag.value;

	if (noteTitle || noteDescription) {
		// Вычисляем текущую дату
		let dateObj = new Date();
		let day = dateObj.getDay();
		let month = months[dateObj.getMonth()];
		let year = dateObj.getFullYear();

		let noteInfo = {
			title: noteTitle,
			description: noteDescription,
			date: `${month} ${day}, ${year}`
		}

		notes.push(noteInfo); // Пушим новую заметку в массив заметок
		localStorage.setItem("notes", JSON.stringify(notes)); // Сохраняем заметки в локальное хранилище + конвертируем в строку, для того, чтобы текст воспринимался
		closeIcon.click(); // Закрываем поп-ап после того, как добавили заметку
		
		showNotes();
	}
});