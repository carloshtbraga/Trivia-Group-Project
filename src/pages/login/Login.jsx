import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { FiMail, FiUser, FiSettings } from 'react-icons/fi';
import { getUserToken } from '../../services/api';
import { loginAction, tokenAction } from '../../redux/actions';
import logoImg from '../../images/logo_trivia.png';

import './login.css';

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
    const { dispatch } = this.props;
    const { email, name } = this.state;
    const { token } = await getUserToken();
    const mailHash = md5(email).toString();
    const gravatar = `https://www.gravatar.com/avatar/${mailHash}`;
    dispatch(tokenAction(token));
    dispatch(loginAction(gravatar, name));
    localStorage.setItem('token', token);
    this.handleClickToRedirect('/game');
  };

  handleClickToRedirect = (rote) => {
    const { history } = this.props;
    history.push(rote);
  };

  render() {
    const { email, name, isDisabled } = this.state;
    return (
      <main className="maim-login">
        <img className="logo-img" src={ logoImg } alt="Logo Trivia" />
        <div className="login-box">
          <div className="input-box">
            <FiMail className="icon" />
            <input
              type="email"
              name="email"
              className="input"
              placeholder="E-mail"
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.handleChange }
            />
          </div>
          <div className="input-box">
            <FiUser className="icon" />
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Nome"
              data-testid="input-player-name"
              value={ name }
              onChange={ this.handleChange }
            />
          </div>
          <hr className="horizontal-line" />
          <button
            type="button"
            data-testid="btn-play"
            className="play-btn button"
            onClick={ this.handleClick }
            disabled={ isDisabled }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            className="config-btn button"
            onClick={ () => this.handleClickToRedirect('/config') }
          >
            <FiSettings className="icon" />
            Configuração
          </button>
        </div>
      </main>
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
