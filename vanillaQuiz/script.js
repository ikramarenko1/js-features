const data = [
	{
		id: 1,
		question: "It`s a question 1",
		answers: [
			{
				answer: "It`s a true answer",
				isCorrect: true
			},
			{
				answer: "What is it?",
				isCorrect: false
			},
			{
				answer: "Where am I?",
				isCorrect: false
			},
			{
				answer: "It`s a true answer (it`s a joke)",
				isCorrect: false
			},
		],
	},
	{
		id: 2,
		question: "It`s a question 2",
		answers: [
			{
				answer: "No-no, I'm not true",
				isCorrect: false
			},
			{
				answer: "Hello! I am a true answer",
				isCorrect: true
			},
			{
				answer: "What am I doing here?",
				isCorrect: false
			},
		],
	},
	{
		id: 3,
		question: "OMG O_o! It`s a question 3",
		answers: [
			{
				answer: "Not true",
				isCorrect: false
			},
			{
				answer: "Not true",
				isCorrect: false
			},
			{
				answer: "Please, choose me",
				isCorrect: true
			},
		],
	},
];

const quizGame = document.querySelector(".quiz__game");
const quizResult = document.querySelector(".quiz__result");
const quizQuestion = document.querySelector(".quiz__question");
const quizAnswersContainer = document.querySelector(".quiz__answers");
const quizSubmit = document.querySelector(".quiz__submit");
const quizPlayAgain = document.querySelector(".quiz__play-again");

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

quizPlayAgain.addEventListener("click", () => {
	quizGame.style.display = "block";
	quizResult.style.display = "none";

	playAgain();
});

const showResult = () => {
	quizGame.style.display = "none";
	quizResult.style.display = "block";

	total = Math.round(correctCount * 100 / data.length);

	if (total >= 50) quizResult.querySelector("h1").textContent = "Congratulations!";
	else quizResult.querySelector("h1").textContent = "Could be better!";

	quizResult.querySelector(".correct").textContent = `Correct Answers: ${correctCount}`;
	quizResult.querySelector(".wrong").textContent = `Wrong Answers: ${wrongCount}`;
	quizResult.querySelector(".score").textContent = `Score: ${total}%`;
};

const showQuestion = (questionNumber) => {
	// Запускаем функцию showResult если qIndex равен количеству всех вопросов (то есть вопрос является последним)
	if (questionIndex === data.length) return showResult();

	selectedAnswer = null; // для того, чтобы при обновлении вопроса мы не могли просто нажать кнопку "Submit" без выбранного ответа на странице
	quizQuestion.textContent = data[questionNumber].question;

	// Используем следующую конструкцию для вставки нужного количества вариантов ответа, используя map(), и заканчиваем .join из-за того, что map() нам отдает массив, и выводиться он будет вместе с знаком ",", чтобы этого избежать пишем .join("")
	quizAnswersContainer.innerHTML = data[questionNumber].answers.map((item, index) =>
		`
		<div class="quiz__answer">
			<input name="answer" type="radio" id="${index}" value="${item.isCorrect}">
			<label for="${index}">${item.answer}</label>
		</div>
		`
	).join("");

	selectAnswer();
};

const selectAnswer = () => {
	quizAnswersContainer.querySelectorAll("input").forEach(item => {
		item.addEventListener("click", (e) => {
			selectedAnswer = e.target.value; // возвращает value input`a, в нашем случае true / false
		});
	});
};

const submitAnswer = () => {
	quizSubmit.addEventListener("click", () => {
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