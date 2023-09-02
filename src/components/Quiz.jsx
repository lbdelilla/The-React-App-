import PropTypes from 'prop-types'
import Options from './Options.jsx'
function Quiz({ question, dispatch, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>

      <div className="options">
        <Options question={question} dispatch={dispatch} answer={answer} />
      </div>
    </div>
  )
}

export default Quiz

Quiz.propTypes = {
  question: PropTypes.shape({
    question: PropTypes.string,
    options: PropTypes.array,
  }),
  answer: PropTypes.number,
  dispatch: PropTypes.func,
}
