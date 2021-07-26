const startBtn = document.getElementById("startBtn");

// start button clicked and quiz window displays
const startQuiz = () => {
    // This will hide the intro page when the start button is clicked
    let introContainer = document.querySelector(".intro");
    introContainer.classList.add("hide");

    // This will remove the class "main" and add new class "view" to the questions and answers
    let quizzes = document.querySelector(".main");
    quizzes.classList.add("view");
    quizzes.classList.remove("main");


}


startBtn.addEventListener("click", startQuiz);