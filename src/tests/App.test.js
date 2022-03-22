import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe(`Testa se o topo da aplicação contém um conjunto fixo de links de 
navegação`, () => {
  test('se o primeiro link possui o texto home', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();
  });
  test('se o segundo link possui o texto About', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    expect(aboutLink).toBeInTheDocument();
  });
  test('se o terceiro link possui o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoriteLink).toBeInTheDocument();
  });
});
describe('Testa o redirecionamento de páginas da aplicação', () => {
  test('se ao clickar no link Home, é redirecionado para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('se ao clickar no link About, é redirecionado para a página sobre', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('se ao clickar no link Favorites Pokemons, é redirecionado para a pokemons'
  + ' página de pokemons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  test('se ao fornecer uma url inválida, o usuário é direcionado para a página'
  + ' Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/userInput');
    const notFoundHeading = screen
      .getByRole('heading', { name: /Page requested not found/i });
    expect(notFoundHeading).toBeInTheDocument();
  });
});
