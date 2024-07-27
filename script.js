const questions = [
    {
        question: "Aryan ki biwi kon ho skti hai?",
        answer: [
            { text: "mamta my panda", correct: false },
            { text: "khabisa", correct: false },
            { text: "hidimba", correct: true },
            { text: "jaipur wali", correct: false },
        ]
    },
    {
        question: "Aviral bhai kiske pati banenge?",
        answer: [
            { text: "hidimba ke", correct: false },
            { text: "Thanku ke", correct: false },
            { text: "dixit ki maal ke", correct: false },
            { text: "saktiman ke", correct: true },
        ]
    },
    {
        question: "Ayush ke bacho ki mummy kon hai?",
        answer: [
            { text: "17", correct: true },
            { text: "Thanku", correct: true },
            { text: "sheel srivastav ki putri", correct: true },
            { text: "521", correct: true },
        ]
    },
    {
        question: "Avnish Dixit ke pasandida aurat?",
        answer: [
            { text: "Avni", correct: true },
            { text: "char-char ldko ko ek sth gumane wali ldki(Avni)", correct: true },
            { text: "avni hi hai", correct: true },
            { text: "Avni ke alawa aur koi nhi ho skti", correct: true },
        ]
    },
    
    {
        question: "Devendra ki gf kon banegi?",
        answer: [
            { text: "Deepu ko to bhul hi jao", correct: true },
            { text: "Avni par chance mar skte ho hai", correct: true },
            { text: "saktiman pr chance mar skte ho", correct: true },
            { text: "Tumse kuch na ho payega", correct: true },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerbutton = document.getElementById("answer-btn");
const nextbutton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbutton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("touchstart", selectAnswer);
    });
}

function resetState(){
    nextbutton.style.display = "none";
    while(answerbutton.firstChild){
        answerbutton.removeChild(answerbutton.firstChild);
    }
}

function selectAnswer(e){
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === "true";
    if(isCorrect){
        selectedbtn.classList.add("correct");
        score++;
    }else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerbutton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbutton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You score ${score} out of ${questions.length}!`;
    nextbutton.innerHTML = "Play Again";
    nextbutton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextbutton.addEventListener("touchstart", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();