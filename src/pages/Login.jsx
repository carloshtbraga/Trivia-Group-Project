import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserToken } from '../services/api';
import { requestApi } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validation());
  };

  validation = () => {
    const { email, name } = this.state;
    const minCaracteres = 0;
    const verifyEmail = /\S+@\S+.\S+/;
    if (name.length > minCaracteres && email.match(verifyEmail)) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  handleClick = async () => {
    const { dispatch, history } = this.props;
    const { token } = await getUserToken();
    dispatch(requestApi(token));
    localStorage.setItem('token', token);
    history.push('/game');
  };

  handleClickToRedirect = () => {
    const { history } = this.props;
    history.push('/config');
  };

  render() {
    const { email, name, isDisabled } = this.state;
    return (
      <div>
        <label>
          <input
            type="email"
            name="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>

        <label>
          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.handleClick }
          disabled={ isDisabled }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleClickToRedirect }
        >
          Configuração
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
