import PropTypes from 'prop-types'

function StartScreen({ numberOfQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numberOfQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'startQuiz' })}
      >
        Start Quiz
      </button>
    </div>
  )
}

export default StartScreen

StartScreen.propTypes = {
  numberOfQuestions: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
}
