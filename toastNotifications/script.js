// Показать оповещение по клику на кнопку
const notifications = document.querySelector(".notifications");
const buttons = document.querySelectorAll(".buttons .btn");

const toastDetails = {
	timer: 5000,
	success: {
		icon: "fa-circle-check",
		text: "Success: This is a success toast.",
	},
	error: {
		icon: "fa-circle-xmark",
		text: "Error: This is an error toast.",
	},
	warning: {
		icon: "fa-triangle-exclamation",
		text: "Warning: This is a warning toast.",
	},
	info: {
		icon: "fa-circle-info",
		text: "Info: This is an information toast.",
	}
}

const removeToast = (toast) => {
	toast.classList.add("hide");

	if (toast.timeoutId) // Убираем оставшееся время с 5 секунд, если пользователь нажал на крестик
		clearTimeout(toast.timeoutId);

	setTimeout(() => toast.remove(), 500); // Удаляем toast из кода через 5 мс
}

const createToast = (id) => {
	const { icon, text } = toastDetails[id]; // Вытягиваем icon и text с toastDetails с нужным нам id 
	const toast = document.createElement("li"); // Создаем новый li элемент

	toast.className = `toast ${id}`; // Добавляем классы к оповещению. Первый, который стоит у всех, и второй, который = id кнопки
	// Добавляем html код
	toast.innerHTML = `<div class="column">
								<i class="fa-solid ${icon}"></i>
								<span>${text}</span>
							</div>
							<i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;

	notifications.appendChild(toast); // Вставялем li в notifications ul

	toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer); // Таймаут для удаления оповещения после определенного времени
}

buttons.forEach((item) => {
	item.addEventListener("click", () => createToast(item.id));
})