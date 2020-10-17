// list of all questions, choices, and answers
const questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title: "Arrays in JavaScript can be used to store ____.",
      choices: [
        "numbers and strings",
        "other arrays",
        "booleans",
        "all of the above"
      ],
      answer: "all of the above"
    },
    {
      title:
        "String values must be enclosed within ____ when being assigned to variables.",
      choices: ["commas", "curly brackets", "quotes", "parentheses"],
      answer: "quotes"
    },
    {
      title:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
      answer: "console.log"
    }
  ]; 
  
  // variables to keep track of quiz state
  var currentQuestionIndex = 0;
  var totalQuestion = questions.length;
  var time = totalQuestion * 15;
  var timerId;
  var returnFeedback = "";
  var dataUser = [];
  
  // variables to reference to DOM elements
  var questionsEl = document.getElementById("questions");
  var timerEl     = document.getElementById("time");
  var choicesEl   = document.getElementById("choices");
  var submitBtn   = document.getElementById("submit");
  var startBtn    = document.getElementById("start");
  var initialsEl  = document.getElementById("initials");
  var feedbackEl  = document.getElementById("feedback");
  var endScreenEl = document.getElementById("end-screen");
  var hideStartScreen = document.getElementById("start-screen");
  var finalScoreEl    = document.getElementById("final-score");
  var questionTitleEL = document.getElementById("question-title");
  // Highscores
  var highscoresEL  = document.getElementById("highscores");
  var clearEl       = document.getElementById("clear");
  var arrayScore    = [];
  var optionList    = ""; 
  
  //Start the QUIZ
  function startQuiz() {
    // hide start screen
    hideStartScreen.style.display  = "none";
  
    // un-hide questions section
    questionsEl.style.display = "block";
  
    // start timer
   timerId = setInterval(function() {
      time--;
  
      // show starting time
      timerEl.textContent = time;
  
      if(time === 0) {
        clearInterval(timerId);
        quizEnd();
      }
    }, 1000);
  
    getQuestion();
  }
  
  //Get Question and Option answer
  function getQuestion() {
    // get current question object from array
    var currentQuestion = questions[currentQuestionIndex].title;
  
    // update title with current question 
    questionTitleEL.textContent = currentQuestion;
  
    // clear out any old question choices
    choicesEl.innerHTML = "";
    
    // clear out any old feedback
    feedbackEl.textContent = "";
    feedbackEl.style.display = "none";
  
    // create choice list
    var listEl = document.createElement("ol");
    choicesEl.appendChild(listEl); 
  
    // loop over choices
    for(var i = 0; i < questions[currentQuestionIndex]["choices"].length; i++)
    {
      // create new button for each choice
      var optionList = document.createElement("button");
      
      optionList.id =  questions[currentQuestionIndex]["choices"][i];
      optionList.innerHTML = "<li>" + questions[currentQuestionIndex]["choices"][i] + "</li>";
  
      // attach click event listener to each choice
      optionList.addEventListener("click", questionClick)
  
      // display on the page
      listEl.appendChild(optionList); 
    }
  
  }
  // Check answer question
  function questionClick() {
  
    //event.preventDefault();
    var currentId = event.target.parentElement.id;
  
    //check if user guessed wrong
    if(currentId != questions[currentQuestionIndex].answer){
      // penalize time
      clockTick()
      
      //  "wrong"
      returnFeedback = "Wrong!"
    }
    else{
      //  "right" 
      returnFeedback = "Correct!"
    }
  
    // flash right/wrong feedback 
    feedbackEl.textContent = returnFeedback;
    feedbackEl.style.display = "block";
  
     //After half a second jump to the next question
    setTimeout(function(){ 
      // move to next question
      currentQuestionIndex++
  
      // check if we've run out of questions
      (currentQuestionIndex >= totalQuestion)? endQuiz() : getQuestion();
  
    }, 500);
     
  }
  
  
  // End the quiz
  var endQuiz = () => {
  // Stop timer
  clearInterval(timerId);
  
  // show end screen
  endScreenEl.style.display = "block";
  
  // show final score
  finalScoreEl.textContent = time;
  
  // hide questions section
  questionsEl.style.display = "none";
  feedbackEl.style.display = "none";
  };
  
  function clockTick() {
  
    // check if user ran out of time
    if(time <= 0) {
      clearInterval(timerId);
      quizEnd();
    }
  
    // update time
    time = time - 10;
  }
  
  function saveHighscore() {
  // get value of input box
  var initials = document.getElementById("initials").value.trim();
  
  //Check if data is persisted in localStorge then load in the array
  var str = localStorage.getItem('scoreUser')
  if (str) {
    dataUser = JSON.parse(str);
  }
  
  // make sure value wasn't empty
  if(initials.length >= 2)
  {
    
    // format new score object for current user
    var scoreUser = {
      'nameUser': initials,
      'scoreUser': time
      }
  
    // get saved scores from localstorage, or if not any, set to empty array
    dataUser.push(scoreUser);
  
    // save to localstorage
    localStorage.setItem("scoreUser", JSON.stringify(dataUser))
    
    // redirect to next page
    window.location.href = "highscores.html";
  }
  else
  {
    alert("Please, enter your initials with minimum 2 characters.");
  }
  }
  
  // check if the user hit "enter"
  function checkForEnter(event) {
  
  // check if event key is enter
  if (event.keyCode == 13)
     saveHighscore();
  }
  
  function printHighscores() {
    // either get scores from localstorage or set to empty array
    var arrayLocalStorage = localStorage.getItem("scoreUser");
  
    if (arrayLocalStorage) {
      arrayScore = JSON.parse(arrayLocalStorage);
    }
   
    // (optional) sort highscores by score property in descending order
    arrayScore.sort(function (x, y) {
      return  y.scoreUser - x.scoreUser;
    });
  
    // for each score
    for(var i = 0; i < arrayScore.length; i++)
    {
      // create li tag for each high score
      optionList = document.createElement("li");
    
      optionList.innerHTML = arrayScore[i].nameUser + " - " + arrayScore[i].scoreUser;
  
      // display on page
      highscoresEL.append(optionList) 
    }
  }
  
  function clearHighscores() {
    // (and reload)
    localStorage.clear();
    highscoresEL.innerHTML = "";
    location.reload();
  
  }
  
  // user clicks button to submit initials
  submitBtn.onclick = saveHighscore;
  
  // user clicks button to start quiz
  startBtn.onclick = startQuiz;
  
  initialsEl.onkeyup = checkForEnter;
  
  