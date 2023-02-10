/* ==========================================
	Вариант доставания селектора через функцию
	========================================== */ 
function get(selector) {
	return document.querySelector(selector);
}

const someVariable = get('.someClass');
const someVariable2 = get('.someClass .someImg');
const someVariable3 = get('#someSubtitle');