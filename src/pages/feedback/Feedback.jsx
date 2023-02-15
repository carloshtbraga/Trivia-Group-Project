import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AiFillStar } from 'react-icons/ai';
import logoImg from '../../images/logo_trivia.png';

import './feedback.css';

class Feedback extends Component {
  componentDidMount() {
    const { gravatarEmail, name, score } = this.props;
    let ranking = JSON.parse(localStorage.getItem('ranking'));
    if (!ranking) {
      localStorage.setItem('ranking', JSON.stringify([]));
      ranking = JSON.parse(localStorage.getItem('ranking'));
    }
    const newRanking = [...ranking, { gravatarEmail, name, score }];
    localStorage.setItem('ranking', JSON.stringify(newRanking));
  }

  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  scorePage = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { gravatarEmail, name, score, assertions } = this.props;
    const THREE_ASSERTIONS = 3;
    return (
      <main className="feedback-page">
        <img className="feedback-logo-img" src={ logoImg } alt="Logo Trivia" />
        <div className="feedback-card">
          <img
            className="feedback-profile-img"
            src={ gravatarEmail }
            alt="header-profile"
            data-testid="header-profile-picture"
            style={
              { borderColor: assertions < THREE_ASSERTIONS ? '#EA5D5D' : '#2FC18C' }
            }
          />
          <div className="feedback-info-header">
            <p
              className="header-player-name"
            >
              Nome:
              <span
                className="player-name"
                data-testid="header-player-name"
              >
                { name }
              </span>
            </p>
            <p className="header-player-score">
              <AiFillStar className="star-icon" />
              Score:
              <span
                className="header-score"
                data-testid="header-score"
              >
                {score}
              </span>
            </p>
          </div>
          <h1
            className="feedback-message"
            data-testid="feedback-text"
            style={
              { color: assertions < THREE_ASSERTIONS ? '#EA5D5D' : '#2FC18C' }
            }
          >
            {
              assertions < THREE_ASSERTIONS ? 'Could be better...' : 'Well Done!'
            }
          </h1>
          <div className="feedback-info">
            <p className="feedback-assertions">
              Total de Acertos:
              <span
                className="assertions"
                data-testid="feedback-total-question"
              >
                {assertions}
              </span>
            </p>
            <p className="feedback-score">
              Pontuação Total:
              <span
                className="score"
                data-testid="feedback-total-score"
              >
                {score}
              </span>
            </p>
          </div>
        </div>
        <div className="feedback-options">
          <button
            className="btn-ranking"
            type="button"
            data-testid="btn-ranking"
            onClick={ this.scorePage } // Redireciona para a página de Ranking
          >
            Ver Ranking
          </button>
          <button
            className="btn-play-again"
            type="button"
            data-testid="btn-play-again"
            onClick={ this.playAgain } // Redireciona para a página de Game
          >
            Jogar Novamente
          </button>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
