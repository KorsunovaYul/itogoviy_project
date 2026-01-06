// Состояние приложения
let currentTest = null
let currentQuestionIndex = 0
let userAnswers = []
let timerInterval = null
let timeRemaining = 0
let startTime = 0

// Получение элементов DOM
const homeScreen = document.getElementById("home-screen")
const testScreen = document.getElementById("test-screen")
const resultsScreen = document.getElementById("results-screen")
const testsList = document.getElementById("tests-list")

// Инициализация приложения
function init() {
  console.log("[v0] Initializing app, testsData:", window.testsData)
  renderTests()
  setupEventListeners()
}

// Отрисовка списка тестов
function renderTests() {
  console.log("[v0] Rendering tests, count:", window.testsData.length)
  testsList.innerHTML = window.testsData
    .map(
      (test) => `
        <div class="test-card" onclick="startTest(${test.id})">
            <div class="test-card-icon">${test.icon}</div>
            <h3>${test.title}</h3>
            <p>${test.description}</p>
            <div class="test-meta">
                <div class="meta-item">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    ${test.questions.length} вопросов
                </div>
                <div class="meta-item">
                    <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
                        <path d="M12 7v5l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    ${Math.floor(test.duration / 60)} минут
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

// Начало теста
function startTest(testId) {
  currentTest = window.testsData.find((t) => t.id === testId)
  if (!currentTest) return

  currentQuestionIndex = 0
  userAnswers = new Array(currentTest.questions.length).fill(null)
  timeRemaining = currentTest.duration
  startTime = Date.now()

  showScreen("test")
  renderTestHeader()
  renderQuestion()
  renderQuestionsNav()
  startTimer()
}

// Отображение экрана
function showScreen(screenName) {
  homeScreen.classList.remove("active")
  testScreen.classList.remove("active")
  resultsScreen.classList.remove("active")

  if (screenName === "home") homeScreen.classList.add("active")
  else if (screenName === "test") testScreen.classList.add("active")
  else if (screenName === "results") resultsScreen.classList.add("active")
}

// Отрисовка заголовка теста
function renderTestHeader() {
  document.getElementById("test-title").textContent = currentTest.title
}

// Отрисовка текущего вопроса
function renderQuestion() {
  const question = currentTest.questions[currentQuestionIndex]

  document.getElementById("question-text").textContent = question.question
  document.getElementById("current-question").textContent = currentQuestionIndex + 1
  document.getElementById("total-questions").textContent = currentTest.questions.length

  const progress = ((currentQuestionIndex + 1) / currentTest.questions.length) * 100
  document.getElementById("progress-fill").style.width = `${progress}%`
  document.getElementById("progress-percent").textContent = `${Math.round(progress)}%`

  // Отрисовка вариантов ответов
  const answersList = document.getElementById("answers-list")
  answersList.innerHTML = question.answers
    .map(
      (answer, index) => `
        <div class="answer-option ${userAnswers[currentQuestionIndex] === index ? "selected" : ""}" 
             onclick="selectAnswer(${index})">
            ${answer}
        </div>
    `,
    )
    .join("")

  // Обновление кнопок навигации
  updateNavigationButtons()
  updateQuestionsNav()
}

// Выбор ответа
function selectAnswer(answerIndex) {
  userAnswers[currentQuestionIndex] = answerIndex
  renderQuestion()
}

// Обновление кнопок навигации
function updateNavigationButtons() {
  const prevBtn = document.getElementById("prev-btn")
  const nextBtn = document.getElementById("next-btn")
  const finishBtn = document.getElementById("finish-btn")

  prevBtn.disabled = currentQuestionIndex === 0

  if (currentQuestionIndex === currentTest.questions.length - 1) {
    nextBtn.style.display = "none"
    finishBtn.style.display = "inline-block"
  } else {
    nextBtn.style.display = "inline-block"
    finishBtn.style.display = "none"
  }
}

// Навигация между вопросами
function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--
    renderQuestion()
  }
}

function nextQuestion() {
  if (currentQuestionIndex < currentTest.questions.length - 1) {
    currentQuestionIndex++
    renderQuestion()
  }
}

function goToQuestion(index) {
  currentQuestionIndex = index
  renderQuestion()
}

// Отрисовка навигации по вопросам
function renderQuestionsNav() {
  const questionsNav = document.getElementById("questions-nav")
  questionsNav.innerHTML = currentTest.questions
    .map(
      (_, index) => `
        <button class="question-nav-btn ${userAnswers[index] !== null ? "answered" : ""} ${index === currentQuestionIndex ? "current" : ""}"
                onclick="goToQuestion(${index})">
            ${index + 1}
        </button>
    `,
    )
    .join("")
}

function updateQuestionsNav() {
  const buttons = document.querySelectorAll(".question-nav-btn")
  buttons.forEach((btn, index) => {
    btn.className = "question-nav-btn"
    if (userAnswers[index] !== null) btn.classList.add("answered")
    if (index === currentQuestionIndex) btn.classList.add("current")
  })
}

// Таймер
function startTimer() {
  updateTimerDisplay()
  timerInterval = setInterval(() => {
    timeRemaining--
    updateTimerDisplay()

    if (timeRemaining <= 0) {
      finishTest()
    }
  }, 1000)
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  const timerText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
  document.getElementById("timer-text").textContent = timerText

  const timerElement = document.getElementById("timer")
  if (timeRemaining <= 60) {
    timerElement.classList.add("warning")
  } else {
    timerElement.classList.remove("warning")
  }
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

// Завершение теста
function finishTest() {
  stopTimer()

  const unansweredCount = userAnswers.filter((a) => a === null).length

  if (unansweredCount > 0 && timeRemaining > 0) {
    const confirmFinish = confirm(
      `У вас остались неотвеченные вопросы: ${unansweredCount}. Вы уверены, что хотите завершить тест?`,
    )
    if (!confirmFinish) {
      startTimer()
      return
    }
  }

  calculateResults()
}

// Подсчет результатов
function calculateResults() {
  let correctCount = 0
  const totalQuestions = currentTest.questions.length

  currentTest.questions.forEach((question, index) => {
    if (userAnswers[index] === question.correctAnswer) {
      correctCount++
    }
  })

  const incorrectCount = totalQuestions - userAnswers.filter((a) => a === null).length - correctCount
  const score = Math.round((correctCount / totalQuestions) * 100)
  const timeSpent = Math.floor((Date.now() - startTime) / 1000)

  displayResults(score, correctCount, incorrectCount, timeSpent)
}

// Отображение результатов
function displayResults(score, correctCount, incorrectCount, timeSpent) {
  showScreen("results")

  // Иконка результатов
  const resultsIcon = document.getElementById("results-icon")
  resultsIcon.innerHTML =
    score >= 80
      ? '<svg width="80" height="80" viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="35" stroke="currentColor" stroke-width="4"/><path d="M25 40L35 50L55 30" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      : score >= 50
        ? '<svg width="80" height="80" viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="35" stroke="currentColor" stroke-width="4"/><path d="M25 30h30M25 50h30" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>'
        : '<svg width="80" height="80" viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="35" stroke="currentColor" stroke-width="4"/><path d="M25 25L55 55M55 25L25 55" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>'

  resultsIcon.className = "results-icon " + (score >= 80 ? "excellent" : score >= 50 ? "average" : "poor")

  // Баллы
  document.getElementById("score-text").textContent = score
  document.getElementById("max-score").textContent = "100"
  document.getElementById("correct-count").textContent = correctCount
  document.getElementById("incorrect-count").textContent = incorrectCount

  // Время
  const minutes = Math.floor(timeSpent / 60)
  const seconds = timeSpent % 60
  document.getElementById("time-spent").textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`

  // Детальный разбор
  const answersReview = document.getElementById("answers-review")
  answersReview.innerHTML = currentTest.questions
    .map((question, index) => {
      const userAnswer = userAnswers[index]
      const isCorrect = userAnswer === question.correctAnswer
      const status = userAnswer === null ? "Не отвечен" : isCorrect ? "Правильно" : "Неправильно"

      return `
            <div class="review-item ${isCorrect ? "correct" : userAnswer === null ? "" : "incorrect"}">
                <div class="review-header">
                    <div class="review-status">
                        ${
                          isCorrect
                            ? '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3 3 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
                            : userAnswer === null
                              ? "<span>?</span>"
                              : '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
                        }
                    </div>
                    <div class="review-question">Вопрос ${index + 1}: ${question.question}</div>
                </div>
                <div class="review-answer">
                    ${userAnswer !== null ? `Ваш ответ: ${question.answers[userAnswer]}` : "Вопрос не был отвечен"}
                    ${
                      !isCorrect && userAnswer !== null
                        ? `<br>Правильный ответ: ${question.answers[question.correctAnswer]}`
                        : ""
                    }
                </div>
            </div>
        `
    })
    .join("")
}

// Повтор теста
function retryTest() {
  if (currentTest) {
    startTest(currentTest.id)
  }
}

// Возврат на главную
function goHome() {
  stopTimer()
  currentTest = null
  showScreen("home")
}

// Обработчики событий
function setupEventListeners() {
  document.getElementById("back-btn").addEventListener("click", () => {
    if (confirm("Вы уверены, что хотите выйти? Прогресс будет потерян.")) {
      goHome()
    }
  })

  document.getElementById("prev-btn").addEventListener("click", previousQuestion)
  document.getElementById("next-btn").addEventListener("click", nextQuestion)
  document.getElementById("finish-btn").addEventListener("click", finishTest)
  document.getElementById("retry-btn").addEventListener("click", retryTest)
  document.getElementById("home-btn").addEventListener("click", goHome)
}

// Запуск приложения
document.addEventListener("DOMContentLoaded", init)
