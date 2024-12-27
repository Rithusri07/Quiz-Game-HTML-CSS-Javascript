const questionactive = document.querySelector(".question-active");
const but = document.querySelector(".but");
const home = document.querySelector(".home");
const body = document.querySelector("body");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const button = document.querySelector(".button");
const answer = document.querySelector("#ans");
const results = document.querySelector(".result");
const res = document.querySelector(".res");
const que = document.querySelector(".question-container");
const header = document.querySelector(".head");

but.addEventListener("click", () => {
    questionactive.style.display = "block";
    but.style.display = "none";
    home.style.padding = "5px";
    body.style.padding = "40px";
    button.style.display = "block";
});

let m = "Result";
let result = 0;
let index = 0;

const questionList = [
    {
        question: "JavaScript is a ___.",
        options: ["Programming", "Scripting"],
        correct: "Scripting",
    },
    {
        question: "Is 'let' used to declare a variable?",
        options: ["True", "False"],
        correct: "True",
    },
    {
        question: "How to embed JavaScript in HTML?",
        options: [
            "Using script tag and src attribute",
            "Using link tag and href attribute",
        ],
        correct: "Using script tag and src attribute",
    },
    {
        question: "Javascript is a ___ programming language.",
        options: ["client-side", "server-side"],
        correct: "client-side",
    },
    {
        question: "What is the full form of DOM?",
        options: ["Digital Object Model", "Document Object Model"],
        correct: "Document Object Model",
    },
];

function renderQuestion(index) {
    if (index < 0 || index >= questionList.length) {
        console.error("Invalid question index:", index);
        return;
    }

    answer.style.display = "none";
    const currentQuestion = questionList[index];
    questionactive.innerHTML = `
        <h1>${currentQuestion.question}</h1>
        <div class="options">
            ${currentQuestion.options
                .map(
                    (option, i) =>
                        `<h2>
                            <input type="radio" name="q${index}" value="${option}">
                            ${option}
                        </h2>`
                )
                .join("")}
        </div>
    `;
    attachOptionListeners();
}

function attachOptionListeners() {
    const options = document.querySelectorAll(`input[name="q${index}"]`);
    options.forEach((option) => {
        option.addEventListener("click", () => {
            correctQuestion();
        });
    });
}

function showresult() {
    res.innerHTML =result;
    home.innerHTML = `<h1>${m}</h1>`;
    results.style.display = "block";
    que.style.display = "none";
}

function correctQuestion() {
    answer.style.display = "block";
    const currentQuestion = questionList[index];
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (!selected) {
        alert("Please select an option.");
        return;
    }
    if (selected.value === currentQuestion.correct) {
        answer.innerHTML = "Correct !!";
    } else {
        answer.innerHTML = "Wrong :(";
    }
}

next.addEventListener("click", () => {
    const currentQuestion = questionList[index];
    const selected = document.querySelector(`input[name="q${index}"]:checked`);

    if (!selected) {
        alert("Please select an option.");
        return;
    }
    if (selected.value === currentQuestion.correct) {
        result++;
    }

    if (index < questionList.length - 1) {
        index++;
        renderQuestion(index);
    } else if (index === questionList.length - 1) {
        showresult();
    }
});

prev.addEventListener("click", () => {
    if (index > 0) {
        index--;
        renderQuestion(index);
    } else {
        alert("This is the first question.");
    }
});
renderQuestion(index);
