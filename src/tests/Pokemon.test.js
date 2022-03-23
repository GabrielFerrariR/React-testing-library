import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';

describe('Teste o componente Pokemon.js', () => {
  renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
  test('O tipo correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');
  });
  test('O peso médio do pokémon deve ser exibido com um texto no formato'
  + ' Average weight: <value> <measurementUnit>', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
  });
  test('A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com'
  + ' a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> '
  + 'é o nome do pokémon;', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    const pokemonImg = screen.getByAltText(/Pikachu sprite/i);
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
  });
  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação'
  + ' para exibir detalhes deste Pokémon.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    const linkToPokemon = screen.getByRole('link', { name: /More details/i });
    expect(linkToPokemon).toHaveAttribute('href', '/pokemons/25');
  });
  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento'
  + ' da aplicação para a página de detalhes de Pokémon.', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);
    const linkToPokemon = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkToPokemon);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const favIcon = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(favIcon).toBeInTheDocument();
    expect(favIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
