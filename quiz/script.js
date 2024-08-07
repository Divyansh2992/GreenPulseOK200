const questions = [
    { 
        question: "What is the primary goal of sustainability?", 
        options: ["Maximizing profit", "Protecting the environment for future generations", "Reducing government regulation", "Increasing production efficiency"], 
        correct: "Protecting the environment for future generations" 
    },
    { 
        question: "Which of the following is a renewable energy source?", 
        options: ["Coal", "Natural gas", "Solar power", "Nuclear power"], 
        correct: "Solar power" 
    },
    { 
        question: "What does the term 'carbon footprint' refer to?", 
        options: ["The amount of waste a person produces", "The total amount of greenhouse gases produced by human activities", "The number of trees a person plants", "The size of a person's garden"], 
        correct: "The total amount of greenhouse gases produced by human activities" 
    },
    { 
        question: "Which of the following practices helps reduce water consumption?", 
        options: ["Taking long showers", "Fixing leaks promptly", "Watering lawns every day", "Washing cars with a hose"], 
        correct: "Fixing leaks promptly" 
    },
    { 
        question: "What is the principle of the 'Three Rs' in waste management?", 
        options: ["Reuse, Reduce, Recycle", "Repair, Resell, Recycle", "Refuse, Replace, Recycle", "Reduce, Reuse, Repurpose"], 
        correct: "Reuse, Reduce, Recycle" 
    },
    { 
        question: "Which of the following is a benefit of sustainable agriculture?", 
        options: ["Increased use of chemical fertilizers", "Reduced soil erosion", "Higher water consumption", "Greater dependency on fossil fuels"], 
        correct: "Reduced soil erosion" 
    },
    { 
        question: "Which of the following is a greenhouse gas?", 
        options: ["Oxygen", "Nitrogen", "Methane", "Argon"], 
        correct: "Methane" 
    },
    { 
        question: "What is the main purpose of green building practices?", 
        options: ["To create more aesthetically pleasing buildings", "To reduce the environmental impact of construction and operation", "To increase the height of buildings", "To use more expensive materials"], 
        correct: "To reduce the environmental impact of construction and operation" 
    },
    { 
        question: "Which of the following is considered a sustainable transportation option?", 
        options: ["Driving a gasoline-powered car", "Riding a bicycle", "Taking a private jet", "Using a diesel truck"], 
        correct: "Riding a bicycle" 
    },
    { 
        question: "What is the main focus of the Paris Agreement?", 
        options: ["Reducing trade barriers between countries", "Combating climate change by limiting global warming", "Promoting tourism", "Enhancing military cooperation"], 
        correct: "Combating climate change by limiting global warming" 
    }
];
let shuffledQuestions, currentQuestionIndex, userAnswers;

document.addEventListener("DOMContentLoaded", startQuiz);

function startQuiz() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 5);
    currentQuestionIndex = 0;
    userAnswers = [];
    document.getElementById("question-container").classList.remove("hide");
    document.getElementById("result-container").classList.add("hide");
    document.querySelector("h1").classList.remove("hide");
    document.getElementById("stop-btn").classList.remove("hide");
    document.getElementById("view-result-btn").classList.remove("hide");
    document.getElementById("next-btn").classList.remove("hide");
    // Remove any existing score display
    const existingScoreDiv = document.querySelector(".score");
    if (existingScoreDiv) {
        existingScoreDiv.remove();
    }
    showQuestion();
}

function showQuestion() {
    resetState();
    const question = shuffledQuestions[currentQuestionIndex];
    document.getElementById("question").innerText = question.question;
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(option));
        document.getElementById("answers").appendChild(button);
    });
}

function resetState() {
    while (document.getElementById("answers").firstChild) {
        document.getElementById("answers").removeChild(document.getElementById("answers").firstChild);
    }
}

function selectAnswer(answer) {
    userAnswers.push({ question: shuffledQuestions[currentQuestionIndex], answer: answer });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById("question-container").classList.add("hide");
    document.getElementById("result-container").classList.remove("hide");
    document.querySelector("h1").classList.add("hide");
    document.getElementById("stop-btn").classList.add("hide");
    document.getElementById("view-result-btn").classList.add("hide");
    document.getElementById("next-btn").classList.add("hide");

    const tbody = document.getElementById("result-table").getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";

    let correctAnswers = 0;

    userAnswers.forEach(({ question, answer }) => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = question.question;
        row.insertCell(1).innerText = answer;
        row.insertCell(2).innerText = question.correct;
        const resultCell = row.insertCell(3);
        const isCorrect = answer === question.correct;
        resultCell.innerText = isCorrect ? "✔" : "✘";
        if (isCorrect) {
            correctAnswers++;
        }
    });

    // Add score summary
    const scoreDiv = document.createElement("div");
    scoreDiv.classList.add("score");
    scoreDiv.innerHTML = `<h3>Your Score: ${correctAnswers} / ${shuffledQuestions.length}</h3>`;
    document.getElementById("result-container").insertBefore(scoreDiv, document.getElementById("result-table"));
}

function nextQuestion() {
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResults();
    }
}

function restartQuiz() {
    startQuiz();
}

function stopQuiz() {
    showResults();
}
