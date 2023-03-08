function Question(text,cohices,answer) {
    this.text=text;
    this.cohices=cohices;
    this.answer=answer;
}

Question.prototype.checkanswer=function (answer) {
    return this.answer===answer;
}
// Quiz construsction
function Quiz(question) {
    this.question=question;
    this.score=0;
    this.questionIndex=0;
    
}

Quiz.prototype.getQuestion=function () {
    return this.question[this.questionIndex]
}

Quiz.prototype.isfinish=function () {
    return this.question.length===this.questionIndex;
}

Quiz.prototype.guess=function(answer){
    var question=this.getQuestion();
    if (question.checkanswer(answer)) {
        this.score++;
    }this.questionIndex++;
}

var q1=new Question("What is the most popular JavaScript?",['typescript','react','vue','Ember.js'],'react');
var q2=new Question("What isn't  programing language?",['c','css','c#','javascript'],'css');
var q3=new Question("What is the most popular programming language?",['javascript','java','css','c#'],'javascript');

console.log(q1.checkanswer('javascript'));


var question=[q1,q2,q3]

var quiz=new Quiz(question);


loadQuestion();

function loadQuestion() {
    if (quiz.isfinish()) {
        showscore();
    }
    else{
        var question=quiz.getQuestion();
        var cohices=question.cohices;
        document.querySelector('#question').textContent=question.text; 

        for (let i = 0; i < cohices.length; i++) {
            var element = document.querySelector('#choice'+i);
            element.innerHTML= cohices[i];

            guess('btn'+i,cohices[i]);            
        }
        showprogress();
    }
}

function guess(id,guess) {
    var btn=document.getElementById(id);
    btn.onclick=function () {
        quiz.guess(guess);
        loadQuestion();
        
    }
}
function showscore() {
    var html=`<h2>Score</h2><h4>${quiz.score}</h4>`;
    document.querySelector(`.card-body`).innerHTML=html;
}
function showprogress() {
    var totalquestion=quiz.question.length;
    var questionNumber=quiz.questionIndex+1;
    document.querySelector('#progress').innerHTML=`Question: ${totalquestion}  of: ${questionNumber}`;
}