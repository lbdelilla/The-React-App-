import PropTypes from 'prop-types'
function NextButton({ dispatch, answer, numberOfQuestions, index }) {
  if (index === numberOfQuestions - 1) {
    // Si estás en la última pregunta, muestra el botón "Finish Quiz"
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'finishQuiz' })}
      >
        Finish Quiz
      </button>
    )
  } else if (answer !== null) {
    // Si no estás en la última pregunta y se ha respondido la pregunta actual, muestra el botón "Next Question"
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next Question
      </button>
    )
  } else {
    // En cualquier otro caso, no muestres ningún botón
    return null
  }
}

export default NextButton

NextButton.propTypes = {
  dispatch: PropTypes.func,
  answer: PropTypes.number,
  numberOfQuestions: PropTypes.number,
  index: PropTypes.number,
}
