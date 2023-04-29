const progressBar = document.querySelector('[data-progress-bar]');
const progressSteps = document.querySelectorAll('.progress__step');
const progressBtnNext = document.querySelector('[data-button-next]');
const progressBtnPrev = document.querySelector('[data-button-prev]');

let activeIndex = 1;

progressBtnNext.addEventListener('click', () => {
	activeIndex++;

	if (activeIndex > progressSteps.length) {
		activeIndex = progressSteps.length;
	}

	updateProgressBar();
});

progressBtnPrev.addEventListener('click', () => {
	activeIndex--;

	if (activeIndex < 1) {
		activeIndex = 1;
	}

	updateProgressBar();
});

function updateProgressBar () {
	progressSteps.forEach((step, index) => {
		if (index < activeIndex) {
			step.classList.add('active');
		} else {
			step.classList.remove('active');
		}
	});

	const activeSteps = document.querySelectorAll('.active');

	progressBar.style.width = (activeSteps.length - 1) / (progressSteps.length - 1) * 100 + '%';

	if (activeIndex === 1) {
		progressBtnPrev.disabled = true;
	} else if (activeIndex === progressSteps.length) {
		progressBtnNext.disabled = true;
	} else { 
		progressBtnPrev.disabled = false;
		progressBtnNext.disabled = false;
	}
};