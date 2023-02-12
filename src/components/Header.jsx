import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    return (
      <div>
        <img
          src={ gravatarEmail }
          alt="User Avatar"
          data-testid="header-profile-picture"
        />
        <h1 data-testid="header-player-name">{name}</h1>
        <p>
          Score:
          {' '}
          <strong data-testid="header-score">
            {score}
          </strong>
        </p>
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
