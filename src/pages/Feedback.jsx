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
    const { gravatarEmail, name, score, assertions } = this.props;
    const THREE_ASSERTIONS = 3;
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
          <p data-testid="feedback-text">
            {
              assertions < THREE_ASSERTIONS ? 'Could be better...' : 'Well Done!'
            }
          </p>
          <p data-testid="feedback-total-score">Total Score</p>
          <p data-testid="feedback-total-question">Total Questions</p>
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
  }),
}.isRequired;

export default connect(mapStateToProps)(Feedback);
