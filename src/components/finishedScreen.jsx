import PropTypes from 'prop-types'
function FinishedScreen({ score, maxScore, highscore, dispatch }) {
  const percentage = (score / maxScore) * 100
  let emoji = '🤔'
  if (percentage === 100) emoji = '🤩'
  else if (percentage >= 80 && percentage < 100) emoji = '😎'
  else if (percentage >= 60 && percentage < 80) emoji = '🙂'
  else if (percentage >= 40 && percentage < 60) emoji = '😕'
  else if (percentage >= 20 && percentage < 40) emoji = '😞'
  else emoji = '😭'

  return (
    <>
      <p className="result">
        <span>{emoji}</span>You Scored <strong>{score}</strong> out of{' '}
        <strong>{maxScore}</strong> ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'reset' })}
      >
        Play Again
      </button>
    </>
  )
}

export default FinishedScreen

FinishedScreen.propTypes = {
  score: PropTypes.number,
  maxScore: PropTypes.number,
  highscore: PropTypes.number,
  dispatch: PropTypes.func,
}
