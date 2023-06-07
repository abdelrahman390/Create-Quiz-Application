let qustionsNumber = document.querySelector(".count span");
let spansnum = document.querySelector(".quiz-app .bullets .spans")
let submitButton = document.querySelector(".submit-button")
let answersArea = document.querySelector(".answers-area");
let qustionTitle = document.querySelector(".quiz-app .quiz-area h2")
let answers = document.getElementsByName("question")
let finalResult = document.querySelector(".results h3");
let finalResultSpans = document.querySelector(".results span");
let spanSelectAll = document.querySelectorAll(".quiz-app .bullets .spans span");
let repeatExamButton = document.querySelector(".quiz-app .results button ")
let allQustionsNumber = 0
let resultOfRightQustions = 0
let chosenAnswer = []


let curentQustionNum = 0;

function getQuestions() {
    let myRequest = new XMLHttpRequest();
  
    myRequest.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        let jsonData = JSON.parse(this.responseText)
        let qustionsCount = jsonData.length
        allQustionsNumber = qustionsCount
        // stard countDown duration 
        countdown(15, qustionsCount)

        bulletsCount(qustionsCount);

        qustionData(jsonData[curentQustionNum], qustionsCount);

        // submit button
        submitButton.onclick = function (){

            if(!(curentQustionNum === 9)){

                let rightAnswer = jsonData[curentQustionNum].right_answer
                // console.log(rightAnswer)

                checkAnswer(rightAnswer)

                curentQustionNum++

                answersArea.innerHTML = ""
                qustionTitle.innerHTML = ""
    
                qustionData(jsonData[curentQustionNum])
    
                if (curentQustionNum === 9){

                    let End =  document.createElement("span")
                    let EndText = document.createTextNode("End")
                    End.appendChild(EndText)
                    answersArea.appendChild(End)

                    if(resultOfRightQustions < 4){
                        finalResultSpans.innerHTML = 'Bad'
                        finalResultSpans.className = "bad"
                        finalResult.innerHTML = ` result is ${resultOfRightQustions} from ${qustionsCount}`
                    }  
                    if (resultOfRightQustions >= 4 && resultOfRightQustions <= 6) {
                        finalResultSpans.innerHTML = 'Good'
                        finalResultSpans.className = "good"
                        finalResult.innerHTML = ` result is ${resultOfRightQustions} from ${qustionsCount}`
                    }  
                    if (resultOfRightQustions > 6 ) {
                        finalResultSpans.innerHTML = 'perfect'
                        finalResultSpans.className = "perfect"
                        finalResult.innerHTML = ` result is ${resultOfRightQustions} from ${qustionsCount}`
                    }

                    repeatExamButton.style.display = "inline-block"
                    repeatExamButton.onclick = () =>{
                        location.reload()
                    }
                }
                handelBullets(curentQustionNum)

                // clear countDown duration
                clearInterval(countdownInterval)
                // stard countDown duration 
                countdown(15, qustionsCount)
            }
        }
      }
    };
  
    myRequest.open("GET", "qustion.json", true);
    myRequest.send();
}
getQuestions();

function bulletsCount(num){
    qustionsNumber.innerHTML = num;
    for(let i = 0; i < num; i ++){
        let spans = document.createElement("span")
        spansnum.appendChild(spans)
        if (i === 0 ){
            spans.className = "on"
        }
    }
}

function handelBullets(num){
    let bulletsSpans = document.querySelectorAll(".bullets .spans span");
    let arrayOfSpans = Array.from(bulletsSpans);
    arrayOfSpans.forEach((span, index) => {
      if (num === index) {
        span.className = "on";
      }
    });

}

spanSelectAll.className = "on"

function qustionData(obj) {

    if(curentQustionNum < allQustionsNumber){

        let qustionTitleText = document.createTextNode(obj.title)
    
        qustionTitle.appendChild(qustionTitleText)
    
                // Create The Answers
                for (let i = 1; i <= 4; i++) {
                    // Create Main Answer Div
                    let mainDiv = document.createElement("div");
              
                    // Add Class To Main Div
                    mainDiv.className = "answer";
              
                    // Create Radio Input
                    let radioInput = document.createElement("input");
              
                    // Add Type + Name + Id + Data-Attribute
                    radioInput.name = "question";
                    radioInput.type = "radio";
                    radioInput.id = `answer_${i}`;
                    radioInput.dataset.answer = obj[`answer_${i}`];
              
                    // Create Label
                    let theLabel = document.createElement("label");
              
                    // Add For Attribute
                    theLabel.htmlFor = `answer_${i}`;
              
                    // Create Label Text
                    let theLabelText = document.createTextNode(obj[`answer_${i}`]);
              
                    // Add The Text To Label
                    theLabel.appendChild(theLabelText);
              
                    // Add Input + Label To Main Div
                    mainDiv.appendChild(radioInput);
                    mainDiv.appendChild(theLabel);
              
                    // Append All Divs To Answers Area
                    answersArea.appendChild(mainDiv);
    
                  }
    }
}

function checkAnswer(rightAnswer){

for(let i = 0; i < 4; i++){

    if(answers[i].checked){

        chosenAnswer = answers[i].dataset.answer

        if(chosenAnswer === rightAnswer){
            resultOfRightQustions++
            console.log("yes")
            }
        }
    }
}

function countdown(duration, count){
    if(curentQustionNum < count){
        let countdownHtml = document.querySelector(".countdown")
        let minutes, seconds;
        countdownInterval = setInterval(function (){

            minutes = parseInt(duration / 60)
            seconds = parseInt(duration % 60)

            minutes = minutes < 10 ? `0${minutes}`: minutes
            seconds = seconds < 10 ? `0${seconds}`: seconds

            countdownHtml.innerHTML = `${minutes}:${seconds}`

            if(--duration < 0){
                clearInterval(countdownInterval)
                submitButton.onclick()
            }
        }, 1000)
    }
}

