import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { logoutAction } from '../redux/actions';
import { getQuestion } from '../services/api';

class Game extends Component {
  state = {
    // results: [],
    question: '',
    category: '',
    alternatives: [],
    time: 30,
    chosen: false,
    isDisabled: false,
    // questionsIndex: 0,
  };

  async componentDidMount() {
    const { token } = this.props;
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
    } = results[0];
    const alternatives = this.shuffleArray([correctAnswer, ...incorrectAnswers]);
    this.setState({
      alternatives,
      question,
      category,
    });
    this.handleTimer();
  }

  handleTimer = () => {
    const miliseconds = 1000;
    this.interval = setInterval(() => {
      this.setState((prevState) => {
        const timer = prevState.time - 1;
        if (timer === 0) {
          clearInterval(this.interval);
          return { time: timer, isDisabled: true };
        }
        return { time: timer };
      });
    }, miliseconds);
  };

  handleSelectAnswer = (event) => {
    event.preventDefault();
    this.setState({ chosen: true });
  };

  handlerLogout = () => {
    const { dispatch, history } = this.props;
    localStorage.clear();
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
    for (let i = answers.length - 1; i > 0; i -= i) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = answers[i];
      answers[i] = answers[j];
      answers[j] = temp;
    }
    return answers;
  };

  render() {
    const { alternatives, question, category, chosen, time, isDisabled } = this.state;

    return (
      <div>
        <Header />
        <h1 data-testid="question-text">
          {question}
        </h1>
        <h3 data-testid="question-category">
          {category}
        </h3>
        <label htmlFor="answers" data-testid="answer-options">
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
        </label>
        <p>
          {' '}
          { time }
          {' '}
        </p>
      </div>
    );
  }
  // comentario
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps)(Game);
