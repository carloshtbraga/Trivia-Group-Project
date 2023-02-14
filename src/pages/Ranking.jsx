import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends Component {
  goToHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.goToHome }
        >
          Voltar par Inicio
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  // assertions: PropTypes.number.isRequired,
  // score: PropTypes.number.isRequired,
  // gravatarEmail: PropTypes.string.isRequired,
  // name: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
