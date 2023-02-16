const data = [
	{
		id: 1,
		question: "Question 1",
		answers: [
			{ 
				answer: "Answer 1", 
				isCorrect: true 
			},
			{ 
				answer: "Answer 2", 
				isCorrect: false 
			},
			{ 
				answer: "Answer 3", 
				isCorrect: false 
			},
			{ 
				answer: "Answer 4", 
				isCorrect: false 
			},
		],
	},
	{
		id: 2,
		question: "Question 2",
		answers: [
			{ 
				answer: "2_Answer 1", 
				isCorrect: false 
			},
			{ 
				answer: "2_Answer 2", 
				isCorrect: true 
			},
			{ 
				answer: "2_Answer 3", 
				isCorrect: false 
			},
		],
	},
	{
		id: 3,
		question: "Question 3",
		answers: [
			{ 
				answer: "3_Answer 1", 
				isCorrect: false 
			},
			{ 
				answer: "3_Answer 2", 
				isCorrect: false 
			},
			{ 
				answer: "3_Answer 3", 
				isCorrect: true 
			},
		],
	},
];

const gameScreen = document.querySelector(".game");
const resultScreen = document.querySelector(".result");
const question = document.querySelector(".question");
const answersContainer = document.querySelector(".answers");
const submit = document.querySelector(".submit");
const play = document.querySelector(".play");

let questionIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let total = 0;
let selectedAnswer;

const playAgain = () => {
	// Сбрасываем все показатели
	questionIndex = 0;
	correctCount = 0;
	wrongCount = 0;
	total = 0;
	// Показываем первый вопрос
	showQuestion(questionIndex);
};

play.addEventListener("click", () => {
	gameScreen.style.display = "block";
	resultScreen.style.display = "none";

	playAgain();
});

const showResult = () => {
	gameScreen.style.display = "none";
	resultScreen.style.display = "block";

	resultScreen.querySelector(".correct").textContent = `Correct Answers: ${correctCount}`;

	resultScreen.querySelector(".wrong").textContent = `Wrong Answers: ${wrongCount}`;

	resultScreen.querySelector(".score").textContent = `Score: ${(correctCount - wrongCount) * 10}`;
};

const showQuestion = (questionNumber) => {
	// Запускаем функцию showResult если qIndex равен количеству всех вопросов (то есть вопрос является последним)
	if (questionIndex === data.length) return showResult();

	selectedAnswer = null; // Для того, чтобы при обновлении вопроса мы не могли просто нажать кнопку "Submit" без выбранного ответа на странице
	question.textContent = data[questionNumber].question;

	// Используем следующую конструкцию для вставки нужного количества вариантов ответа, используя map(), и заканчиваем .join из-за того, что map() нам отдает массив, и выводиться он будет вместе с знаком ",", чтобы этого избежать пишем .join("")
	answersContainer.innerHTML = data[questionNumber].answers.map((item, index) => 
		`
		<div class="answer">
			<input name="answer" type="radio" id="${index}" value="${item.isCorrect}">
			<label for="${index}">${item.answer}</label>
		</div>
		`
	).join("");

	selectAnswer();
};

const selectAnswer = () => {
	answersContainer.querySelectorAll("input").forEach(item => {
		item.addEventListener("click", (e) => {
			selectedAnswer = e.target.value; // возвращает value input`a, в нашем случае true / false
		});
	});
};

const submitAnswer = () => {
	submit.addEventListener("click", () => {
		if (selectedAnswer !== null) {
			selectedAnswer === "true" ? correctCount++ : wrongCount++;
			questionIndex++;
			showQuestion(questionIndex);
		} else {
			alert("Please, select an answer!");
		}
	});
};

showQuestion(questionIndex);
submitAnswer();