import React, { Component } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './header.css';

class Header extends Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    return (
      <div className="header-component">
        <div className="profile-box">
          <AiFillStar className="star-icon" />
          <p className="label-score">Pontos:</p>
          <strong
            className="profile-score"
            data-testid="header-score"
          >
            {score}
          </strong>
        </div>
        <div className="profile-box">
          <img
            className="profile-img"
            src={ gravatarEmail }
            alt="User Avatar"
            data-testid="header-profile-picture"
          />
          <h1
            className="profile-name"
            data-testid="header-player-name"
          >
            {name}
          </h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
