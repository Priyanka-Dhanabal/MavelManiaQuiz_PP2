const questions = [
    {
       question: "Who is known as the 'God of Thunder' in the Marvel Universe?",
       answers:[
           {text: "Iron Man", correct:false},
           {text: "Captain America", correct:false},
           {text: "Thor", correct:true},
           {text: "Hulk", correct:false},
       ]
   },{
       question: "What is the name of Tony Stark's AI in the Iron Man suit?",
       answers:[
           {text: "F.R.I.D.A.Y.", correct:false},
           {text: "J.A.R.V.I.S.", correct:true},
           {text: "H.E.R.B.I.E.", correct:false},
           {text: "S.H.I.E.L.D.", correct:false},
       ]
   },{
       question: "Which of these characters is not a member of the Avengers?",
       answers:[
           {text: "Wolverine", correct:true},
           {text: "Black Panther", correct:false},
           {text: "Scarlet Witch", correct:false},
           {text: "Hawkeye", correct:false},
       ]
   },{
       question: "Which Infinity Stone was embedded in Vision's forehead?",
       answers:[
           {text: "Power Stone", correct:false},
           {text: "Time Stone", correct:false},
           {text: "Reality Stone", correct:false},
           {text: "Mind Stone", correct:true},
       ]
   },{
       question: "What is the name of the fictional metal that Captain America's shield is made of?",
       answers:[
           {text: "Adamantium", correct:false},
           {text: "Vibranium", correct:true},
           {text: "Titanium", correct:false},
           {text: "Plasteel", correct:false},
       ]
   },{
       question: "What is the name of the dimension where Doctor Strange draws his mystical powers from?",
       answers:[
           {text: "Dark Dimension", correct:true},
           {text: "Astral Plane", correct:false},
           {text: "Quantum Realm", correct:false},
           {text: "Mirror Dimension", correct:false},
       ]
   },{
       question: "What is the real name of the superhero Black Widow?",
       answers:[
           {text: "Carol Danvers", correct:false},
           {text: "Wanda Maximoff", correct:false},
           {text: "Jessica Jones", correct:false},
           {text: "Natasha Romanoff", correct:true},
       ]
   },{
       question: "What is the name of the fictional planet that Thor comes from?",
       answers:[
           {text: "Titan", correct:false},
           {text: "Xandar", correct:false},
           {text: "Sakaar", correct:false},
           {text: "Asgard", correct:true},
       ]
   },{
       question: "What is the name of the powerful artifact sought after by Thanos in the Marvel Cinematic Universe?",
       answers:[
           {text: "Infinity Gauntlet", correct:true},
           {text: "Aether", correct:false},
           {text: "Orb", correct:false},
           {text: "Tesseract", correct:false},
       ]
   },{
       question: "What is the name of Scott Lang's daughter?",
       answers:[
           {text: "Hope", correct:false},
           {text: "Janet", correct:false},
           {text: "Cassie", correct:true},
           {text: "Peggy", correct:false},
       ]
   }
]

const questionElement = document.getElementById("questions");
const answerBtn = document.getElementById("answer-btns");
const nextbtn = document.getElementById("next-btn");
const welcomePageDiv = document.getElementById("welcome-page");
const quizDiv = document.getElementById("container");
let questionTracking = document.getElementById("question-tracking");
let startBtn = document.getElementById("start-btn");
let reviewDiv = document.getElementById("review");
const stars = document.querySelectorAll(".stars i");
const homeBtn = document.getElementById("home-btn");


let currentQuestionIndex = 0;
let score = 0;

// Event Listener for the Start Button in Welcome Page

startBtn.addEventListener('click', function(){
    welcomePageDiv.classList.add("hide");
    quizDiv.classList.remove("hide");
    startQuiz();
})

// function to start the quiz

function startQuiz(){
    let currentQuestionIndex = 0;
    let score = 0;
    nextbtn.innerHTML = "Next";
    showQuestion(); // function to display questions from the questions array
}

/**
 * questions pulled from the array and getting updated.
 */
function showQuestion(){
    resetPrevious()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = currentQuestion.question;
    questionTracking.innerHTML = `${questionNumber} of ${questions.length} questions`;

    for(answer of currentQuestion.answers){
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.append(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        
        button.addEventListener('click',selectAnswer)
        
    }

}

/**
 * event listener added for next button so that next set of questions are shown.
 */

/*nextbtn.addEventListener('click', function(){
    if(currentQuestionIndex === questions.length){
        console.log("hereNow");
        welcomePageDiv.classList.remove("hide");
        quizDiv.classList.add("hide");

    }else{
        console.log("here");
        handleNextBtn();
    }
}); 

function handleNextBtn(){
    currentQuestionIndex ++;
    
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
        
    }
}*/

nextbtn.addEventListener('click', handleNextBtn);
function handleNextBtn(){
    currentQuestionIndex ++;
    
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
        
    }
}


function showScore(){
    resetPrevious();
    questionTracking.style.display = "none";
    reviewDiv.classList.remove("hide");

    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
    questionElement.style.textAlign = "center";
    
    /*let result = document.createElement("h3");
    if(score >= 7){
       
        result.innerText = "YOU ARE A HULK";
    } else if(score >= 4 ){
        result.innerText = "YOU DID GOOOOOOD !";

    }else{
        console.log(result);
        result.innerText = "AHMMMMMMMMM, OKayyyyyyyy !!!"
    }

    answerBtn.append(result);
    answerBtn.style.textAlign = "center"; */

    homeBtn.style.display = "block";
    homeBtn.addEventListener('click',goHome);

    function goHome(){
        resetPrevious();
        welcomePageDiv.classList.remove("hide");
        quizDiv.classList.add("hide");
        questionTracking.remove("hide");
        reviewDiv.classList.add("hide");
        homeBtn.style.display = "none";
    }
    
}




/**EveryTime a new question is appended previous set of buttons 
 * will be removed. 
 */
function resetPrevious(){
    nextbtn.style.display = "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }

}

function selectAnswer(event){
   let selectedBtn = event.target;
   const isCorrect = selectedBtn.dataset.correct === "true";
   if(isCorrect){
    selectedBtn.classList.add("correct");
    score ++;

   }else{
    selectedBtn.classList.add("incorrect");
   }
   
   let childrenFromAnswerBtn = Array.from(answerBtn.children);
   for(childBtn of childrenFromAnswerBtn){
    if(childBtn.dataset.correct === "true"){
        childBtn.classList.add("correct");
    }
    childBtn.disabled = true;

   }
   nextbtn.style.display = "block";

}


// Rating

console.log(stars);

stars.forEach((star, index1) => {
    star.addEventListener('click', function(){
        stars.forEach((star, index2) => {
            index1 >= index2 ? star.classList.add("colored") : star.classList.remove("colored")
        })
    })
})
