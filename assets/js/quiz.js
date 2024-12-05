const contentQuiz = document.querySelectorAll('.step')
const coverQuiz = document.getElementById("cover_quiz")

window.addEventListener('DOMContentLoaded', function (e) {
    this.localStorage.clear()
})


coverQuiz.addEventListener('click', function (e) {
    handleNextQuestion('cover_quiz')
})

contentQuiz.forEach((question) => {

    const contentQuestions = question.querySelector('.content_options')

    if (!contentQuestions) {
        return;
    }

    contentQuestions.addEventListener('click', function (e) {
        const contentStep = e.target.closest('.step');
        const buttonNext = contentStep.querySelector('.next_button')
        const contentButton = e.target.parentElement
        const stepTitle = contentStep.querySelector('.title')
        const idStep = contentStep.getAttribute("id")
        const valueButton = e.target.getAttribute("data-question")
        const pointsButton = e.target.getAttribute("data-points")
        const containerQuiz = contentStep.querySelector('.content')
        const targetTextContent = contentStep.querySelector('.content_text')
        const ButtonNext = contentStep.querySelector('.next_button')

        if (!e.srcElement.classList.contains('next_button')) {
            localStorage.setItem(`question_${idStep}`, pointsButton)
            localStorage.setItem(`question_${idStep}_value`, valueButton)

            contentStep.querySelectorAll('.opts').forEach((item) => {
                item.classList.remove('active')
            })
        }


        

        

        contentButton.classList.add("active")

        if (localStorage.getItem(`question_${idStep}`) && localStorage.getItem(`question_${idStep}_value`)) {
            buttonNext.addEventListener('click', function (e) {
                if (idStep === "step_one") {
                    if (valueButton === "B") {
                        targetTextContent.innerHTML = 'Você respondeu B. Exposição excessiva ao sol sem proteção, parabéns! Esta é a resposta correta.';
                    } else {
                        targetTextContent.innerHTML = 'Não foi dessa vez, que pena! A alternativa B é a correta.';
                    }
                } else if (idStep === "step_two") {
                    if (valueButton === "C") {
                        targetTextContent.innerHTML = 'Você respondeu C. Usar protetor solar diariamente, mesmo em dias nublados, parabéns! Esta é a resposta correta.'
                    } else {
                        targetTextContent.innerHTML = 'Não foi dessa vez, que pena! A alternativa C é a correta.';
                    }
                } else if (idStep === "step_thre") {
                    if (valueButton === "D") {
                        targetTextContent.innerHTML = 'Você respondeu D. Alternativas A, B e C estão corretas, parabéns! Esta é a resposta correta.';
                    } else {
                        targetTextContent.innerHTML = 'Não foi dessa vez, que pena! A alternativa D é a correta.';
                    }
                }
                stepTitle.classList.add("visible")
                ButtonNext.classList.add('active')
                containerQuiz.classList.add("active")
                handleNextQuestion(idStep)
            })
        }
    })
})

function disabledButtons(buttons) {
    buttons.forEach((button) => {
        const parentElement = button.parentElement

        parentElement.querySelector("button").classList.remove("disabled")

        if (!parentElement.classList.contains("active")) {
            parentElement.querySelector("button").classList.add("disabled")
            parentElement.querySelector("button").disabled = true;
        }
    })
}

function handleNextQuestion(idStep) {
    const step = document.getElementById(idStep).nextElementSibling

    const resultPoinst = document.getElementById('result_points')
    const questionOne = parseInt(localStorage.getItem('question_step_one'));
    const questionTwo = parseInt(localStorage.getItem('question_step_two'));
    const questionThre = parseInt(localStorage.getItem('question_step_thre'));
    const totalPoints = questionOne + questionTwo + questionThre

    const questionOneValue = localStorage.getItem('question_step_one_value')
    const questionTwoValue = localStorage.getItem('question_step_two_value')
    const questionThreValue = localStorage.getItem('question_step_thre_value')


    if (idStep === 'cover_quiz') {
        document.querySelector(`#${idStep}`).style.display = 'none'
        step.style.display = 'block'
        step.classList.add('active')
    }

    setTimeout(() => {
        document.querySelector(`#${idStep}`).style.display = 'none'
        step.style.display = 'block'
        step.classList.add('active')
        resultPoinst.innerHTML = `Sua pontuação foi: ${totalPoints}`
    }, 4000)

    if (questionOneValue !== null && questionTwoValue !== null && questionThreValue !== null) {
        send(questionOneValue, questionTwoValue, questionThreValue, totalPoints)
    }
}


function resetQuiz() {

    const elementsActive = document.querySelectorAll('.active')
    const allButtons = document.querySelectorAll('button')
    const allTitle = document.querySelectorAll('.title')

    allTitle.forEach((title) => {
        title.classList.remove('visible')
        const idStep = title.closest('.step').getAttribute("id")

        if (idStep === 'step_one') {
            document.querySelector(`#${idStep} .content_text`).innerHTML = 'Qual é o principal fator de risco para o câncer de pele?'
        } else if (idStep === 'step_two') {
            document.querySelector(`#${idStep} .content_text`).innerHTML = 'Você respondeu C.Usar protetor solar diariamente, mesmo em dias nublados, parabéns! Esta é a resposta correta.'
        } else if (idStep === 'step_thre') {
            document.querySelector(`#${idStep} .content_text`).innerHTML = 'Quais sinais podem indicar a presença de câncer de pele?'
        }
    })

    allButtons.forEach((btn) => {
        btn.classList.remove('disabled')
        btn.disabled = false
    })

    elementsActive.forEach((ele) => {
        ele.classList.remove('active')
    })
    coverQuiz.style.display = 'block'
}

function send(questionOneValue, questionTwoValue, questionThreValue, totalPoints) {
    fetch('assets/php/insert.php', {
        method: "POST",
        body: JSON.stringify({
            question_one: questionOneValue,
            question_two: questionTwoValue,
            question_thre: questionThreValue,
            points: totalPoints
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response => response.json())).then(data => {
        if (data.status === 'success') {
            localStorage.clear()
            setTimeout(() => {
                resetQuiz()
            }, 8000)

        }
    })
}
