import { useEffect } from 'react'
import PropTypes from 'prop-types'
function Timer({ dispatch, remainingTime }) {
  const min = Math.floor(remainingTime / 60)
  const sec = remainingTime % 60

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'tick' })
    }, 1000)
    return () => clearInterval(timer)
  }, [dispatch])

  return (
    <div className="timer">
      {min < 10 && '0'}
      {min}:{sec < 10 && '0'}
      {sec}
    </div>
  )
}

export default Timer

Timer.propTypes = {
  dispatch: PropTypes.func,
  remainingTime: PropTypes.number,
}
