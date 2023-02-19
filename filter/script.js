const data = [
	{
		id: 1,
		name: "Invicta Men's Pro Diver",
		img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
		price: 74,
		category: "Dress",
	},
	{
		id: 2,
		name: "Invicta Men's Pro Diver 2",
		img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
		price: 74,
		category: "Dress",
	},
	{
		id: 3,
		name: "Timex Men's Expedition Scout ",
		img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
		price: 40,
		category: "Sport",
	},
	{
		id: 4,
		name: "Breitling Superocean Heritage",
		img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
		price: 200,
		category: "Luxury",
	},
	{
		id: 5,
		name: "Casio Classic Resin Strap ",
		img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
		price: 16,
		category: "Sport",
	},
	{
		id: 6,
		name: "Garmin Venu Smartwatch ",
		img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
		price: 74,
		category: "Casual",
	},
];

const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector(".search");
const categoriesContainer = document.querySelector(".categories");
const priceRange = document.querySelector(".price__range");
const priceValue = document.querySelector(".price__value");

// Функция отображения предметов
const displayProducts = (filteredProducts) => {
	// Используем следующую конструкцию для вставки нужного количества товаров, используя map(), и заканчиваем .join из-за того, что map() нам отдает массив, и выводиться он будет вместе с знаком ",", чтобы этого избежать пишем .join("")
	productsContainer.innerHTML = filteredProducts.map(product =>
		`
		<div class="product">
			<img src="${product.img}" alt="">

			<span class="name">${product.name}</span>
			<span class="priceText">$${product.price}</span>
		</div>
		`
	).join("");
};

displayProducts(data);

// Реализация функции со строкой поиска
// keyup отображает значение клавиатуры всякий раз, когда вы отпускаете клавишу внутри <input> элемента
searchInput.addEventListener("keyup", (e) => {
	const value = e.target.value.toLowerCase();

	if (value) {
		/*
		/	Пример работы indexOf:
		/	const n = "ikramarenko"
		/	n.indexOf("m") - результат: 4, то есть выводит индекс элемента
		/	n.indexOf("b") - результат: -1, т.к. такого символа нет
		*/
		displayProducts(
			data.filter((item) => item.name.toLowerCase().indexOf(value) !== -1)
		);
	} else {
		displayProducts(data);
	}
});

const setCategories = () => {
	const allCategories = data.map((item) => item.category);
	const categories = [
		"All",
		// ... используется для того, чтобы к "All" присоединился массив из следующих объектов. Если не использовать ... в этом случае - будет массив состоять из двух объектов: "All" и второго массива
		...allCategories.filter((item, i) => {
			return allCategories.indexOf(item) === i;
		}),
	];

	categoriesContainer.innerHTML = categories.map(category =>
		`
		<span class="category">${category}</span>
		`
	).join("");

	categoriesContainer.addEventListener("click", (e) => {
		const selectedCategory = e.target.textContent; // вытягиваем категорию из <span class="category"></span>

		selectedCategory === "All"
			? displayProducts(data)
			: displayProducts(data.filter((item) => item.category === selectedCategory));
	});
};

const setPrices = () => {
	const priceList = data.map((item) => item.price);
	const minPrice = Math.min(...priceList); // ... для работы со значениями массива
	const maxPrice = Math.max(...priceList);

	// Устанавливаем мин и макс для ползунка с ценой
	priceRange.min = minPrice;
	priceRange.max = maxPrice; 
	priceRange.value = maxPrice;
	priceValue.textContent = "$" + maxPrice;

	priceRange.addEventListener("input", (e) => {
		priceValue.textContent = "$" + e.target.value;
		displayProducts(data.filter((item) => item.price <= e.target.value))
	})
}

setCategories();
setPrices();