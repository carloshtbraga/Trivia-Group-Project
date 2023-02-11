import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { gravatar, name, score } = this.props;
    return (
      <div>
        <img
          src={ gravatar }
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
  gravatar: state.player.gravatar,
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  gravatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
