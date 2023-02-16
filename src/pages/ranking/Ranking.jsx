import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AiFillStar } from 'react-icons/ai';
import logoImg from '../../images/logo_trivia.png';

import './ranking.css';

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
      <main className="ranking-page">
        <div className="ranking-box">
          <img className="ranking-logo-img" src={ logoImg } alt="Logo Trivia" />
          <h1 className="ranking-title" data-testid="ranking-title">Ranking</h1>
          <ul className="ranking-list">
            {
              ranking.map((item, index) => (
                <li className="ranking-item" key={ index }>
                  <div className="block-identify">
                    <img
                      className="profile-ranking-img"
                      src={ item.gravatarEmail }
                      alt="User Avatar"
                    />
                    <span data-testid={ `player-name-${index}` }>
                      {item.name}
                    </span>
                  </div>
                  <div className="block-score">
                    <AiFillStar className="ranking-star-icon" />
                    <span
                      className="ranking-score"
                      data-testid={ `player-score-${index}` }
                    >
                      {item.score}
                    </span>
                    <p className="score-label">
                      pontos
                    </p>
                  </div>
                </li>
              ))
            }
          </ul>
          <button
            className="btn-go-home"
            type="button"
            data-testid="btn-go-home"
            onClick={ this.goToHome }
          >
            Jogar Novamente
          </button>
        </div>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
