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
let mainDivOfWrongQustion = document.querySelector(".quiz-app .wront_qustion") 
let allQustionsNumber = 0
let resultOfRightQustions = 0
let numerOfWrongQustion = []
let wrongQustionChosen = []

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
        countdown(3, qustionsCount)

        bulletsCount(qustionsCount);

        qustionData(jsonData[curentQustionNum], qustionsCount);

        // submit button
        submitButton.onclick = function (){

            if(!(curentQustionNum === 9)){

                let rightAnswer = jsonData[curentQustionNum].right_answer
                // console.log(rightAnswer)

                checkAnswer(rightAnswer, curentQustionNum)

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

                    // console.log(wrongQustionChosen)
// console.log(numerOfWrongQustion)
// console.log(resultOfRightQustions)
// console.log(qustionsCount)

                    if (!(wrongQustionChosen.length === 0)){
                        
                        mainDivOfWrongQustion.style.display = "block"

        // console.log(qustionsCount - resultOfRightQustions)
        // console.log(wrongQustionChosen.length)

                        for(let i = 0; i < wrongQustionChosen.length; i++){
                            
                            let mainDiv = document.createElement("div")
                            mainDivOfWrongQustion.appendChild(mainDiv)
    
                            let QustionTitle = document.createElement("h1")
                            let QustionTitleText = document.createTextNode(`Qustion :`)
                            let QustionTitleSpan = document.createElement("span")
                            let QustionTitleTextSpan = document.createTextNode(`${jsonData[numerOfWrongQustion[i]].title}`)
                            QustionTitle.appendChild(QustionTitleText)
                            mainDiv.appendChild(QustionTitle)
                            QustionTitleSpan.appendChild(QustionTitleTextSpan)
                            mainDiv.appendChild(QustionTitleSpan)


                            let RightQustion = document.createElement("h3")
                            let RightQustionText = document.createTextNode(`Right Qustion : ${jsonData[numerOfWrongQustion[i]].right_answer}`)
                            RightQustion.className = "Right"
                            RightQustion.appendChild(RightQustionText)
                            mainDiv.appendChild(RightQustion)

                            let wrongQustion = document.createElement("h3")
                            let wrongQustionText = document.createTextNode(`Your Qustion : ${wrongQustionChosen[i]}`)
                            wrongQustion.className = "wrong"
                            wrongQustion.appendChild(wrongQustionText)
                            mainDiv.appendChild(wrongQustion)


                        }
                    }


                }
                handelBullets(curentQustionNum)

                // clear countDown duration
                clearInterval(countdownInterval)
                // stard countDown duration 
                countdown(3, qustionsCount)
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

function checkAnswer(rightAnswer, qurrentQustion){

for(let i = 0; i < 4; i++){

    if(answers[i].checked){

        chosenAnswer = answers[i].dataset.answer

        if(chosenAnswer === rightAnswer){
            resultOfRightQustions++
            }

            if(!(chosenAnswer === rightAnswer)){

                numerOfWrongQustion.push(qurrentQustion)
                
                }
                wrongQustionChosen.push(chosenAnswer)
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

