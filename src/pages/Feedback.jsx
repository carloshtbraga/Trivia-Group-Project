import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feedback extends Component {
  // ComponentDidMount() {     ????
  //    dispatch(CASE)         ????
  // }                         ????
  playAgain = () => {
    const { history } = this.props; // Logica do botão que redireciona para jogar novamente
    history.push('/');
  };

  scorePage = () => {
    const { history } = this.props; // Logica do botão que redireciona para a página de ranking
    history.push('/ranking');
  };

  render() {
    const { gravatarEmail, name, score } = this.props;
    return (
      <div>
        <header>
          <img
            src={ gravatarEmail }
            alt="header-profile"
            data-testid="header-profile-picture"
          />
          <h1 data-testid="header-player-name">
            Nome:
            { ' ' }
            { name }
          </h1>

          <p>
            Score:
            <span data-testid="header-score">
              {score}
            </span>
          </p>

        </header>
        <main>
          <p data-testid="feedback-text" />
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
            onClick={ this.scorePage } // Redireciona para a página de Ranking
          >
            scorePage
          </button>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

// Falta criar o CASE no reducer e trazer o mapStateToProps

export default connect(mapStateToProps)(Feedback);