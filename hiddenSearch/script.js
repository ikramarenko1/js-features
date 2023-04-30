const search = document.querySelector('.search');
const searchButton = document.querySelector('[data-search-button]');

searchButton.addEventListener('click', () => {
	search.classList.toggle('active');
})