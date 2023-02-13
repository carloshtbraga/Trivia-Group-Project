import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { Game } from '../pages';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

afterEach(cleanup);
const questionText = 'question-text';
const questionCategory = 'question-category';
const answerOptions ='answer-options'

describe('01 Testes da página GAME', () => {
  it(
    'Testa se os componentes do Header renderizados corretamente',
    () => {
      renderWithRouterAndRedux(<Game />);
      const avatarImage = screen.getByRole('img', {
        name: /user avatar/i
      });
      const playerName = screen.getByTestId('header-player-name');
      const playerScore = screen.getByTestId('header-score');

      expect(playerName).toBeInTheDocument();
      expect(playerScore).toBeInTheDocument();
    });
  it(
    'Testa se os componentes da página Game são renderizados corretamente',
    () => {
      renderWithRouterAndRedux(<Game />);
      const questionH1 = screen.getByTestId(questionText);
      const categoryH3 = screen.getByTestId(questionCategory);
      const answerButtons = screen.getByTestId(answerOptions);

      expect(questionH1).toBeInTheDocument();
      expect(categoryH3).toBeInTheDocument();
      expect(answerButtons).toBeInTheDocument();
    });
    it(
      '',
     async () => {
        renderWithRouterAndRedux(<Game />);
        const correctquestion = await screen.findByTestId('correct-answer', { }, {timeout:4000});

        userEvent.click(correctquestion);
        await waitFor(() => {
          expect(screen.getByTestId('header-score')).not.toBe(0)
        });
        
      });


});