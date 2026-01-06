// База данных тестов по математике
const testsData = [
  {
    id: 1,
    title: "Алгебра: Основы",
    description: "Проверьте свои знания основ алгебры: уравнения, неравенства, функции",
    icon: "∑",
    duration: 900, // 15 минут в секундах
    questions: [
      {
        id: 1,
        question: "Решите уравнение: 2x + 5 = 13",
        answers: ["x = 3", "x = 4", "x = 5", "x = 6"],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: "Чему равно значение выражения: (3 + 5) × 2 - 4",
        answers: ["12", "14", "16", "10"],
        correctAnswer: 0,
      },
      {
        id: 3,
        question: "Упростите выражение: 3x + 2x - x",
        answers: ["4x", "5x", "6x", "2x"],
        correctAnswer: 0,
      },
      {
        id: 4,
        question: "Решите неравенство: 2x - 3 > 7",
        answers: ["x > 5", "x > 4", "x < 5", "x < 4"],
        correctAnswer: 0,
      },
      {
        id: 5,
        question: "Найдите корни уравнения: x² - 5x + 6 = 0",
        answers: ["x = 2, x = 3", "x = 1, x = 6", "x = -2, x = -3", "x = 0, x = 5"],
        correctAnswer: 0,
      },
      {
        id: 6,
        question: "Чему равно a², если a = -3",
        answers: ["-9", "9", "6", "-6"],
        correctAnswer: 1,
      },
      {
        id: 7,
        question: "Решите систему: x + y = 10, x - y = 2",
        answers: ["x = 6, y = 4", "x = 5, y = 5", "x = 7, y = 3", "x = 8, y = 2"],
        correctAnswer: 0,
      },
      {
        id: 8,
        question: "Найдите значение: √(64)",
        answers: ["6", "7", "8", "9"],
        correctAnswer: 2,
      },
      {
        id: 9,
        question: "Упростите: (x + 2)(x - 2)",
        answers: ["x² - 4", "x² + 4", "x² - 2", "x² + 2"],
        correctAnswer: 0,
      },
      {
        id: 10,
        question: "Чему равно 2⁴",
        answers: ["8", "12", "16", "32"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 2,
    title: "Геометрия: Планиметрия",
    description: "Тест на знание свойств плоских фигур: треугольники, четырехугольники, окружности",
    icon: "△",
    duration: 900,
    questions: [
      {
        id: 1,
        question: "Чему равна сумма углов треугольника?",
        answers: ["90°", "180°", "270°", "360°"],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: "Площадь прямоугольника со сторонами 5 см и 8 см равна:",
        answers: ["13 см²", "26 см²", "40 см²", "80 см²"],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: "Диагонали ромба взаимно перпендикулярны и:",
        answers: ["Равны", "Делят углы пополам", "Параллельны", "Не пересекаются"],
        correctAnswer: 1,
      },
      {
        id: 4,
        question: "Чему равен периметр квадрата со стороной 7 см?",
        answers: ["14 см", "21 см", "28 см", "49 см"],
        correctAnswer: 2,
      },
      {
        id: 5,
        question: "Длина окружности вычисляется по формуле:",
        answers: ["C = πr", "C = 2πr", "C = πr²", "C = 2πr²"],
        correctAnswer: 1,
      },
      {
        id: 6,
        question: "В прямоугольном треугольнике катеты равны 3 и 4. Гипотенуза равна:",
        answers: ["5", "6", "7", "12"],
        correctAnswer: 0,
      },
      {
        id: 7,
        question: "Площадь круга радиусом 3 см равна (π ≈ 3.14):",
        answers: ["9.42 см²", "18.84 см²", "28.26 см²", "37.68 см²"],
        correctAnswer: 2,
      },
      {
        id: 8,
        question: "Диагональ квадрата относится к его стороне как:",
        answers: ["1:1", "√2:1", "2:1", "√3:1"],
        correctAnswer: 1,
      },
      {
        id: 9,
        question: "Сумма углов четырехугольника равна:",
        answers: ["180°", "270°", "360°", "450°"],
        correctAnswer: 2,
      },
      {
        id: 10,
        question: "Высота равностороннего треугольника со стороной a равна:",
        answers: ["a√2/2", "a√3/2", "a/2", "a"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 3,
    title: "Тригонометрия",
    description: "Проверьте знания тригонометрических функций и формул",
    icon: "sin",
    duration: 900,
    questions: [
      {
        id: 1,
        question: "Чему равен sin(30°)?",
        answers: ["0", "0.5", "√3/2", "1"],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: "Чему равен cos(0°)?",
        answers: ["0", "0.5", "√2/2", "1"],
        correctAnswer: 3,
      },
      {
        id: 3,
        question: "Основное тригонометрическое тождество:",
        answers: ["sin²x + cos²x = 1", "sin²x - cos²x = 1", "sinx + cosx = 1", "sinx × cosx = 1"],
        correctAnswer: 0,
      },
      {
        id: 4,
        question: "Чему равен tg(45°)?",
        answers: ["0", "0.5", "1", "√3"],
        correctAnswer: 2,
      },
      {
        id: 5,
        question: "Период функции y = sin(x) равен:",
        answers: ["π", "2π", "π/2", "4π"],
        correctAnswer: 1,
      },
      {
        id: 6,
        question: "Чему равен sin(90°)?",
        answers: ["0", "0.5", "√3/2", "1"],
        correctAnswer: 3,
      },
      {
        id: 7,
        question: "Формула cos(2x) равна:",
        answers: ["cos²x - sin²x", "2cosxsinx", "cos²x + sin²x", "cosx - sinx"],
        correctAnswer: 0,
      },
      {
        id: 8,
        question: "Чему равен cos(60°)?",
        answers: ["0", "0.5", "√3/2", "1"],
        correctAnswer: 1,
      },
      {
        id: 9,
        question: "tg(x) = ?",
        answers: ["sin(x) / cos(x)", "cos(x) / sin(x)", "sin(x) × cos(x)", "1 / sin(x)"],
        correctAnswer: 0,
      },
      {
        id: 10,
        question: "Чему равно sin²(30°) + cos²(30°)?",
        answers: ["0", "0.5", "1", "2"],
        correctAnswer: 2,
      },
    ],
  },
]

window.testsData = testsData
