import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa a página de pokemons favoritos', () => {
  test('se é exibido na tela a mensagem No favorite pokemon found,'
  + 'se a pessoa não tiver pokémons favoritos.', async () => {
    renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favoriteLink);

    const noFavoriteText = await screen.findByText(/No favorite pokemon found/i);
    expect(noFavoriteText).toBeInTheDocument();
  });
  test('se é exibido todos os cards de pokémons favoritados', async () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(moreDetails);

    const favoriteCheckbox = await screen.findByLabelText(/Pokémon favoritado\?/i);
    userEvent.click(favoriteCheckbox);

    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favoriteLink);

    const favoritePokemon = await screen.findByTestId('pokemon-name');
    expect(favoritePokemon).toHaveTextContent('Pikachu');
  });
});
