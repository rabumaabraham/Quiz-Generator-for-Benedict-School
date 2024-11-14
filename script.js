// Variables to store questions, question count, and current question index
const questions = [];
let currentQuestionIndex = 0;
let questionCount = 0; // New counter for the total questions
let score = 0; // Variable to track the score

// Selecting DOM elements
const questionForm = document.getElementById('question-form');
const startQuizButton = document.getElementById('start-quiz');
const teacherSection = document.getElementById('teacher-section');
const quizSection = document.getElementById('quiz-section');
const questionDisplay = document.getElementById('question-display');
const optionsDisplay = document.getElementById('options-display');
const feedback = document.getElementById('feedback');
const nextQuestionButton = document.getElementById('next-question');
const questionCountDisplay = document.getElementById('question-count'); // New element for question count
const duplicateWarning = document.getElementById('duplicate-warning'); // New element for duplicate warning

// Adding a question
questionForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Get question data
  const questionText = document.getElementById('question').value;
  const options = Array.from(document.querySelectorAll('.option')).map(option => option.value);
  const correctAnswer = parseInt(document.getElementById('correct-answer').value);

  // Check for duplicate answers
  const hasDuplicates = options.some((option, index) => options.indexOf(option) !== index);
  if (hasDuplicates) {
    duplicateWarning.style.display = "block"; // Show duplicate warning
    feedback.textContent = ""; // Clear other feedback
    return; // Exit the function if there are duplicates
  } else {
    duplicateWarning.style.display = "none"; // Hide warning if no duplicates
  }

  // Add question to questions array
  questions.push({
    question: questionText,
    options: options,
    correctAnswer: correctAnswer
  });

  // Clear form inputs
  questionForm.reset();
  
  // Increment and update question count
  questionCount++;
  questionCountDisplay.textContent = `Total Questions: ${questionCount}`;

  // Show "Start Quiz" button if questions are added
  if (questions.length > 0) {
    startQuizButton.style.display = "block";
  }

  // Clear feedback message
  feedback.textContent = "Question added successfully!";
  feedback.style.color = "green";
});

// Start the quiz when "Start Quiz" button is clicked
startQuizButton.addEventListener('click', function () {
  teacherSection.style.display = 'none';
  quizSection.style.display = 'block';

  // Hide the "Quiz Generator" title and show "Quiz Time!" title
  document.querySelector('h1').style.display = 'none'; // Hide "Quiz Generator"
  document.getElementById('quiz-title').style.display = 'block'; // Show "Quiz Time!"

  displayQuestion();
});

// Function to display the current question
function displayQuestion() {
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Display the question number along with the question text
    questionDisplay.textContent = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
    optionsDisplay.innerHTML = '';

    // Display options as buttons with letters
    const optionLetters = ['A', 'B', 'C', 'D']; // Uppercase letters for options
    currentQuestion.options.forEach((option, index) => {
      const optionButton = document.createElement('button');
      optionButton.classList.add('option-btn');
  
      // Creating a span for the letter and setting its class for styling
      const letterSpan = document.createElement('span');
      letterSpan.classList.add('letter');
      letterSpan.textContent = `${optionLetters[index]}.`;
  
      // Adding the letter and the option text to the button
      optionButton.appendChild(letterSpan);
      optionButton.appendChild(document.createTextNode(` ${option}`)); // Space before option text
  
      optionButton.onclick = () => checkAnswer(index);
      optionsDisplay.appendChild(optionButton);
    });
  } else {
    // Once the quiz is completed, hide "Quiz Time!" title and show the result
    document.getElementById('quiz-title').style.display = 'none'; // Hide "Quiz Time!"
    questionDisplay.textContent = "Quiz Completed!";
    optionsDisplay.innerHTML = '';
    feedback.textContent = `Quiz completed! Your score is: ${score}/${questionCount}`;
    nextQuestionButton.style.display = 'none';
  }
}

// Function to check the answer and give feedback
function checkAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  
  // Disable all option buttons after answering
  const optionButtons = document.querySelectorAll('.option-btn');
  optionButtons.forEach(button => button.disabled = true);

  if (selectedIndex === currentQuestion.correctAnswer) {
    score++; // Increment score for correct answer
    feedback.textContent = "Correct!";
    feedback.style.color = "green";
    optionButtons[selectedIndex].style.backgroundColor = "green"; // Highlight correct answer
  } else {
    feedback.textContent = "Wrong! The correct answer was: " + currentQuestion.options[currentQuestion.correctAnswer];
    feedback.style.color = "red";
    optionButtons[selectedIndex].style.backgroundColor = "red"; // Highlight wrong answer
    optionButtons[currentQuestion.correctAnswer].style.backgroundColor = "green"; // Highlight correct answer
  }

  // Allow moving to the next question immediately
  nextQuestionButton.style.display = 'block'; // Show the next question button
}

// Event listener for the next question button
nextQuestionButton.addEventListener('click', function () {
  currentQuestionIndex++;
  feedback.textContent = ''; // Clear feedback
  nextQuestionButton.style.display = 'none'; // Hide next button until the next question is displayed
  displayQuestion();
});


  