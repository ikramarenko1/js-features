const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");
const slider = document.querySelector(".slider");
const sliderImages = document.querySelectorAll(".image");
const sliderBottom = document.querySelector(".bottom");

let slideNumber = 1;

const sliderImgsLength = sliderImages.length;

for (let i = 0; i < sliderImgsLength; i++) {
	const sliderBtn = document.createElement("div");
	sliderBtn.className = "slider__button";

	sliderBottom.appendChild(sliderBtn); // Вставляем в .bottom наши кнопки, которые = количеству всех фото
}

const sliderBtns = document.querySelectorAll(".slider__button"); // Объявляем переменную после предыдущей функции, так как предыдущая функция эти кнопки создает
sliderBtns[0].style.backgroundColor = "#fff";

const resetBtnBackgroundColor = () => {
	sliderBtns.forEach(btn => {
		btn.style.backgroundColor = "transparent";
	});
};

sliderBtns.forEach((btn, index) => {
	btn.addEventListener("click", () => {
		resetBtnBackgroundColor(); // Сбрасываем цвета на всех кнопках
		slider.style.transform = `translateX(-${index * 800}px)`; // Перемещаем слайд на позицию по кнопке
		slideNumber = i + 1;
		btn.style.backgroundColor = "#fff"; // Ставим нужный цвет на кнопку
	});
});

const nextSlide = () => {
	slider.style.transform = `translateX(-${slideNumber * 800}px)`;
	slideNumber++;
}

const prevSlide = () => {
	slider.style.transform = `translateX(-${(slideNumber - 2) * 800}px)`;
	slideNumber--;
}

const getFirstSlide = () => {
	slider.style.transform = `translateX(0px)`;
	slideNumber = 1;
}

const getLastSlide = () => {
	slider.style.transform = `translateX(-${(sliderImgsLength - 1) * 800}px)`;
	slideNumber = sliderImgsLength;
}

rightArrow.addEventListener("click", () => {
	slideNumber < sliderImgsLength ? nextSlide() : getFirstSlide(); // Если slideNumber меньше чем кол-во всех фото - выполняем функцию nextSlide(), в противном случае - getFirstSlide()
	resetBtnBackgroundColor();
	sliderBtns[slideNumber - 1].style.backgroundColor = "#fff";
});

leftArrow.addEventListener("click", () => {
	slideNumber > 1 ? prevSlide() : getLastSlide(); // Если slideNumber больше 1 - выполняем функцию prevSlide(), в противном случае - getFirstSlide()
	resetBtnBackgroundColor();
	sliderBtns[slideNumber - 1].style.backgroundColor = "#fff";
});