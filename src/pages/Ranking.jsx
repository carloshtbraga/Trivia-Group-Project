import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const sortedRanking = ranking.sort((a, b) => b.score - a.score);
    this.setState({ ranking: sortedRanking });
  }

  goToHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
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
        <ul>
          {
            ranking.map((item, index) => (
              <li key={ index }>
                <img
                  src={ item.gravatarEmail }
                  alt="User Avatar"
                />
                <p>
                  Nome:
                  <span data-testid={ `player-name-${index}` }>
                    {item.name}
                  </span>
                </p>
                <p>
                  Pontuação:
                  <span data-testid={ `player-score-${index}` }>
                    {item.score}
                  </span>
                </p>
              </li>
            ))
          }
        </ul>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
