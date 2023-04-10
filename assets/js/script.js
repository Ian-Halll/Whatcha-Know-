

var score = document.querySelector(".score")
var timer = document.querySelector(".timer")
var enteredinitials = document.querySelector("#initials")
var selectors = document.querySelectorAll(".selector")
var questionheader = document.querySelector(".questions")
var title = document.querySelector(".quiztitle")
var highscores = document.querySelector(".highscores")

var initialsubmit = document.querySelector("#submitbutton")
var initialsform = document.querySelector("#initialsform")
var currentscore = 0



var questions = {
 question1:
{
Q1: "Which of these is a programming language",
A:[
  {response:"Javascript", value:true,},
  {response:"HTML", value:false,},
  {response:"CSS", value:false,},
  {response:"MGSV", value:false,}
]},

 question2:
{
Q: "What type of application is Git Bash",
A:[
  {response:"Mainframe Hacker", value:false,},
  {response:"Integrated Development Environment", value:false,},
  {response:"Command Line Interface", value:true,},
  {response:"Text Editor", value:false,}

]},

question3:
{
Q: "The first number in javascript counting is _",
  A:[
    {response:"1", value:false,},
    {response:"42", value:false,},
    {response:"Javascript does not use numbers", value:false,},
    {response:"0", value:true,},
  
  ]},

  question4:
  {
Q: "You can link functions to a button using _______",
A:[
  {response:"A Flexbox", value:false,},
  {response:"An Event Listener", value:true,},
  {response:"The Power Of Friendship", value:false,},
  {response:"A CSS Stylesheet", value:false,}
  
  ]},
  
  question5:
  {
Q: "The default direction for a flexbox is ______",
A:[
  {response:"Column", value:false,},
  {response:"Grid", value:false,},
  {response:"Row", value:true,},
  {response:"One Direction", value:false,}
  
  ]},
}



var start = document.querySelector("#start-button")
start.addEventListener("click", function(){
loadstarteranswers()
starttimer()
});


 function loadstarteranswers(){
  if (localStorage.getItem("High Scores") !== null){
    loggedscores = JSON.parse(localStorage.getItem("High Scores"));
  }else{
    loggedscores = [];
  }
  highscores.style.display = "none"
  var question = questions.question1;
 for (var i = 0; i < question.A.length; i++){
var currentselector = selectors[i]
var answer = question.A[i];
currentselector.textContent = answer.response;
currentselector.dataset.value = answer.value;
currentselector.style.display = "flex";
start.style.display = "none";
questionheader.style.display = "flex";
questionheader.textContent = question.Q1 + "?";



}};

var current = 1;

function nextquestion(){
  current++;
  if (current > Object.keys(questions).length){
    stopquiz()
    return;
  }
  
  var displayed = questions['question' + current];
  for (var i = 0; i < displayed.A.length; i++){
    if (selectors[i]){
      selectors[i].textContent = displayed.A[i].response;
      selectors[i].dataset.value = displayed.A[i].value;
     
  } 
  
    questionheader.textContent = displayed.Q + "?";
  
}};

var remainingtime = 60;

function starttimer(){
  var interval = setInterval(function(){
    remainingtime--;
    timer.textContent = "Time Left:" + remainingtime;
      if (remainingtime === 0) {
        clearInterval(interval);
        stopquiz();
      }
  }, 1000);

}




function stopquiz(){
initialsform.style.display = "flex"
title.textContent = "Quiz Over";
questionheader.style.display = "none";
highscores.style.display = "flex";

for (var i = 0; i < questions.question1.A.length; i++)
if (selectors[i]){
selectors[i].style.display = "none";
timer.style.display = "none"

}};



 for (var i = 0; i < selectors.length; i++) {
  selectors[i].addEventListener("click", function(Event){
    var chosenanswer = Event.target;
    var answervalue = chosenanswer.dataset.value
    if (JSON.parse(answervalue) === true){
      
      currentscore += 5;
      
   }else{
      remainingtime -= 10;
      
    }
   
    nextquestion();
    update();
  });
}


function update() {
score.textContent = "Score: " + currentscore
timer.textContent = "Time Left: " + remainingtime;

};


var loggedscores = []

initialsubmit.addEventListener("click", function(Event){

Event.preventDefault()
  var initials = enteredinitials.value
  var score = currentscore;

  var signedscore = {initials: initials, score: score}
  
  loggedscores.push(signedscore);
  localStorage.setItem("High Scores", JSON.stringify(loggedscores))
})
