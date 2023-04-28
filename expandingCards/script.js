const cardPanels = document.querySelectorAll('.card__panel');

function removeCardActiveClasses () {
	cardPanels.forEach(cardPanel => {
		cardPanel.classList.remove('active');
	});
};

cardPanels.forEach(cardPanel => {
	cardPanel.addEventListener('click', () => {
		removeCardActiveClasses();

		cardPanel.classList.add('active');
	});
});

function checkFirstThreeCards () {
	for (let i = 0; i < 3; i++) {
		if (cardPanels[i].classList.contains('active')) {
			return true;
		}
	}
	return false;
};

window.addEventListener('resize', () => {
	if (window.innerWidth <= 600) {
		if (!checkFirstThreeCards()) {
			removeCardActiveClasses();
	
			cardPanels[0].classList.add('active');
		}
	}
});
