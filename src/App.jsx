import { useEffect, useReducer } from 'react'
import Header from './components/Header.jsx'
import Main from './components/Main.jsx'
import Loader from './components/Loader.jsx'
import Error from './components/Error.jsx'
import StartScreen from './components/StartScreen.jsx'
import Quiz from './components/Quiz.jsx'
import NextButton from './components/NextButton.jsx'
import ProgressBar from './components/progressBar.jsx'
import FinishedScreen from './components/finishedScreen.jsx'
import Timer from './components/Timer.jsx'
import Footer from './components/Footer.jsx'

const SECS_PER_QUESTION = 20

const initialState = {
  questions: [],
  index: 0,
  score: 0,
  answer: null,
  status: 'loading',
  highscore: 0,
  remainingTime: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        status: 'ready',
        questions: action.payload,
      }
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      }
    case 'startQuiz':
      return {
        ...state,
        status: 'active',
        remainingTime: state.questions.length * SECS_PER_QUESTION,
      }
    case 'newAnswer':
      // eslint-disable-next-line no-case-declarations
      const question = state.questions[state.index]

      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === question.correctOption
            ? state.score + question.points
            : state.score,
      }
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      }
    case 'finishQuiz':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.score > state.highscore ? state.score : state.highscore,
      }
    case 'reset':
      return {
        ...initialState,
        status: 'ready',
        questions: state.questions,
      }
    case 'tick':
      return {
        ...state,
        remainingTime: state.remainingTime - 1,
        status: state.remainingTime === 0 ? 'finished' : state.status,
      }

    default:
      throw new Error('Unhandled action type: ' + action.type)
  }
}

function App() {
  const [
    { questions, status, index, answer, score, highscore, remainingTime },
    dispatch,
  ] = useReducer(reducer, initialState)

  const numberOfQuestions = questions.length
  const maxScore = questions.reduce((prev, cur) => prev + cur.points, 0)

  useEffect(() => {
    fetch('http://localhost:5001/api/v1/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      // eslint-disable-next-line no-unused-vars
      .catch((err) => dispatch({ type: 'dataFailed' }))
  }, [])

  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen
            numberOfQuestions={numberOfQuestions}
            dispatch={dispatch}
          />
        )}
        {status === 'active' && (
          <>
            <ProgressBar
              index={index}
              numberOfQuestions={numberOfQuestions}
              score={score}
              maxScore={maxScore}
              answer={answer}
            />
            <Quiz
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} remainingTime={remainingTime} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numberOfQuestions={numberOfQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <FinishedScreen
            score={score}
            maxScore={maxScore}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  )
}

export default App
