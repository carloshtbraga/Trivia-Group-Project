import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { Login } from '../pages';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

afterEach(cleanup);
const email = 'input-gravatar-email';
const name = 'input-player-name';

describe('01 Testes da página Login', () => {
  it(
    'Testa se o input `email`, `name`, e o button `play`são renderizados na página',
    () => {
      renderWithRouterAndRedux(<Login />);
      const inputEmail = screen.getByTestId(email);
      const inputName = screen.getByTestId(name);
      const button = screen.getByRole('button', {
        name: /configuração/i,
      });

      expect(inputEmail).toBeInTheDocument();
      expect(inputName).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    },
  );

  it(
    `Testa se ao preencher os campos com informações validasse clicar no
    botão play ele redireciona.`,
    () => {
      renderWithRouterAndRedux(<Login />);
      userEvent.type(screen.getByTestId(email), 'test@test.test');
      userEvent.type(screen.getByTestId(name), 'JustHarry');
      userEvent.click(screen.getByRole('button', { name: /play/i }));
      expect(screen.getByText(/play/i)).toBeInTheDocument();
    },
  );
  
  it('Testando se a rota está certa', () => {
    const initialEntries = ['/'];
    const { history } = renderWithRouterAndRedux(<Login />, { initialEntries });

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica se há um botão de configurações e direciona à página correta', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const settingsBtn = screen.getByTestId('btn-settings');
    expect(settingsBtn).toBeInTheDocument();
    userEvent.click(settingsBtn);

    const configH1 = screen.getByRole('heading', {
      name: /config/i,
    });
    expect(configH1).toBeInTheDocument();
  });

  it('Verifica se há um botão play que direciona à página correta', async () => {
    const responseToken = {
      response_code: 0,
      response_message: 'Token Generated Successfully!',
      token: '9b60dbfbd4c9b6b00523a0b680d044983eed1ca3a0e3f1dcf35218f8721db978' };
    renderWithRouterAndRedux(<App />);
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseToken),
    });

    const inputEmail = screen.getByTestId(email);
    const inputName = screen.getByTestId(name);
    const playBtn = screen.getByTestId('btn-play');

    userEvent.type(inputEmail, 'meu@email.com');
    expect(playBtn).toBeDisabled();
    userEvent.type(inputName, 'Meu nome');
    expect(playBtn).toBeEnabled();
    userEvent.click(playBtn);
  });
});
