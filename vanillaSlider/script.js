const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");
const slider = document.querySelector(".slider");

rightArrow.addEventListener("click", () => {
	slider.style.transform = `translateX(-800px)`;
});