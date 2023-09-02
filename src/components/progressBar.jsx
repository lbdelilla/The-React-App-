import PropTypes from 'prop-types'
function ProgressBar({ index, numberOfQuestions, score, maxScore, answer }) {
  return (
    <header className="progress">
      <progress
        value={index + Number(answer !== null)}
        max={numberOfQuestions}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numberOfQuestions}
      </p>
      <p>
        <strong>{score}</strong> / {maxScore}
      </p>
    </header>
  )
}

export default ProgressBar

ProgressBar.propTypes = {
  index: PropTypes.number,
  numberOfQuestions: PropTypes.number,
  score: PropTypes.number,
  maxScore: PropTypes.number,
  answer: PropTypes.number,
}
