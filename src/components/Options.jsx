import PropTypes from 'prop-types'

function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null

  return (
    <div>
      {' '}
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            hasAnswered
              ? index === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default Options

Options.propTypes = {
  question: PropTypes.shape({
    options: PropTypes.array,
    correctOption: PropTypes.number,
  }),
  answer: PropTypes.number,
  dispatch: PropTypes.func,
}
