import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Feedback extends Component {
  // ComponentDidMount() {     ????
  //    dispatch(CASE)         ????
  // }                         ????
  playAgain = () => {
    const { history } = this.props; // Logica do botão que redireciona para jogar novamente
    history.push('/');
  };

  scoorePage = () => {
    const { history } = this.props; // Logica do botão que redireciona para a página de ranking
    history.push('/ranking');
  };

  render() {
    return (
      <div>
        <header>
          <img
            src="header-profile"
            alt="header-profile"
            data-testid="header-profile-picture"
            // Falta puxar essas informações do estado global
          />
          <h1 data-testid="header-player-name">Nome</h1>
          {/* Falta puxar o nome do estado */}
          <h2 data-testid="header-score">Scoore</h2>
          {/* Falta puxar o scoore do estado */}
        </header>
        <main>
          <p data-testid="feedback-total-score">Total Score</p>
          {/* Falta lógica */}
          <p data-testid="feedback-total-question">Total Questions</p>
          {/* Falta lógica */}
          <br />
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.playAgain } // Redireciona para a página de Game
          >
            playAgain
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.scoorePage } // Redireciona para a página de Ranking
          >
            scoorePage
          </button>
        </main>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

// Falta criar o CASE no reducer e trazer o mapStateToProps

connect()(Feedback);
