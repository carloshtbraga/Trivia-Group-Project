import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { IoMdStopwatch } from 'react-icons/io';
import { Header } from '../../components';
import { logoutAction, sumScoreAction, addAssertionsAction } from '../../redux/actions';
import { getQuestion } from '../../services/api';
import logoImg from '../../images/logo_trivia.png';

import './game.css';

class Game extends Component {
  state = {
    questions: [],
    question: '',
    category: '',
    difficulty: '',
    correctAnswer: '',
    alternatives: [],
    time: 30,
    chosen: false,
    isDisabled: false,
    questionsIndex: 0,
  };

  async componentDidMount() {
    const { token } = this.props;
    const { questionsIndex } = this.state;
    const CODE = 0;
    const { results, response_code: responseCode } = await getQuestion(token);
    if (responseCode !== CODE) {
      this.handlerLogout();
      return;
    }
    const {
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer,
      question,
      category,
      difficulty,
    } = results[questionsIndex];
    const alternatives = this.shuffleArray([
      correctAnswer,
      ...incorrectAnswers,
    ]);
    this.setState({
      alternatives,
      question,
      category,
      difficulty,
      correctAnswer,
      questions: results,
    });
    this.handleTimer();
  }

  handleTimer = () => {
    clearInterval(this.interval);
    const milliseconds = 1000;
    this.interval = setInterval(() => {
      this.setState((prevState) => {
        const timer = prevState.time - 1;
        if (timer === 0) {
          clearInterval(this.interval);
          return { time: 30, isDisabled: true, chosen: true };
        }
        return { time: timer };
      });
    }, milliseconds);
  };

  btnNext = () => {
    const { history } = this.props;
    this.setState((prevState) => ({
      questionsIndex: prevState.questionsIndex + 1,
    }));
    const { questionsIndex, questions } = this.state;
    const gameIndexLength = 4;
    if (questionsIndex === gameIndexLength) {
      history.push('/feedback');
      return;
    }
    const {
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer,
      question,
      category,
      difficulty,
    } = questions[questionsIndex + 1];
    const alternatives = this.shuffleArray([
      correctAnswer,
      ...incorrectAnswers,
    ]);
    this.setState({
      alternatives,
      question,
      category,
      difficulty,
      correctAnswer,
      chosen: false,
      isDisabled: false,
      time: 30,
    });
    this.handleTimer();
  };

  handleSelectAnswer = (event) => {
    event.preventDefault();
    this.setState({ chosen: true, isDisabled: true });
    const { target: { innerHTML: selectedAnswer } } = event;
    const { correctAnswer, difficulty, time } = this.state;
    const { score, dispatch } = this.props;
    const BASE_POINTS = 10;
    const HARD_MULTIPLIER = 3;
    const MEDIUM_MULTIPLIER = 2;
    let newScore = score;
    const correctChoice = selectedAnswer === correctAnswer;
    if (correctChoice) {
      switch (difficulty) {
      case 'hard':
      {
        newScore += BASE_POINTS + (time * HARD_MULTIPLIER);
        break;
      }
      case 'medium':
      {
        newScore += BASE_POINTS + (time * MEDIUM_MULTIPLIER);
        break;
      }
      case 'easy':
      {
        newScore += BASE_POINTS + time;
        break;
      }
      default:
      {
        break;
      }
      }
      dispatch(addAssertionsAction());
    }
    dispatch(sumScoreAction(newScore));
  };

  handlerLogout = () => {
    const { dispatch, history } = this.props;
    localStorage.removeItem('token');
    dispatch(logoutAction);
    history.push('/');
  };

  shuffleArray = (array) => {
    const answers = array.map((value, index) => {
      if (index === 0) {
        return {
          answer: value,
          testid: 'correct-answer',
        };
      }
      return {
        answer: value,
        testid: `wrong-answer-${index - 1}`,
      };
    });
    for (let i = answers.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [
        answers[i],
        answers[j],
      ] = [answers[j], answers[i]];
    }
    return answers;
  };

  render() {
    const { alternatives, question, category, chosen, time, isDisabled } = this.state;

    return (
      <>
        <Header />
        <main className="game-page">
          <section className="question-box">
            <img className="question-logo-img" src={ logoImg } alt="Logo Trivia" />
            <h1 className="question-category" data-testid="question-category">
              {category}
            </h1>
            <h2 className="question-text" data-testid="question-text">
              {question}
            </h2>
            <p className="question-time">
              <IoMdStopwatch className="timer-icon" />
              <p className="time-label">Tempo:</p>
              <span className="timer">{ time }</span>
              s
            </p>
          </section>
          <section
            data-testid="answer-options"
            className="answer-section"
          >
            {alternatives.map((element, index) => (
              <button
                style={ chosen ? {
                  border: element.testid === 'correct-answer'
                    ? '3px solid rgb(6, 240, 15)' : '3px solid red',
                } : null }
                key={ index }
                className="answerBtn"
                type="button"
                onClick={ this.handleSelectAnswer }
                data-testid={ element.testid }
                disabled={ isDisabled }
              >
                { element.answer }
              </button>))}
            {
              (chosen === true)
                ? (
                  <button
                    type="button"
                    className="btn-next"
                    data-testid="btn-next"
                    onClick={ this.btnNext }
                  >
                    Proximo
                  </button>)
                : ''
            }
          </section>
        </main>
      </>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  token: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
  score: state.player.score,
});

export default connect(mapStateToProps)(Game);
