import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const pokemonName = 'pokemon-name';
const nextPokemon = 'next-pokemon';

describe('Teste o componente Pokedex', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);
    const heading = screen
      .getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });
  test('Teste se é exibido o próximo Pokémon da lista quando'
  + ' o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId(nextPokemon);
    expect(button).toHaveTextContent('Próximo pokémon');
    userEvent.click(button);

    const pokemon = screen.getByTestId(pokemonName);
    expect(pokemon).toHaveTextContent('Charmander');
  });
  test('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão'
  + ', se estiver no último Pokémon da lista', () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId(nextPokemon);
    const numOfClicks = 9;
    for (let index = 0; index < numOfClicks; index += 1) {
      userEvent.click(button);
    }

    const pokemon = screen.getByTestId(pokemonName);
    expect(pokemon).toHaveTextContent('Pikachu');
  });
  test('Testa se apenas um pokemon é mostrado por vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId(pokemonName);
    expect(pokemon).toHaveLength(1);
  });
});
describe('Testa se a pokedex tem os botões de filtro', () => {
  test('Deve existir um botão de filtragem para cada tipo de'
  + ' Pokemon, sem repetição', () => {
    renderWithRouter(<App />);
    const typeFilters = screen.getAllByTestId('pokemon-type-button');
    const totalTypes = 7;
    expect(typeFilters).toHaveLength(totalTypes);
  });
  test('A partir da seleção de um botão de tipo, a Pokédex'
  + ' deve circular somente pelos pokémons daquele tipo;', () => {
    renderWithRouter(<App />);
    const pokeTypes = ['Electric', 'Fire', 'Bug',
      'Poison', 'Psychic', 'Normal', 'Dragon'];
    for (let index = 0; index < pokeTypes.length; index += 1) {
      const typeElemen = screen.getByRole('button', { name: pokeTypes[index] });
      userEvent.click(typeElemen);
      const typeOfPokemon = screen.getByTestId('pokemon-type');
      expect(typeOfPokemon).toHaveTextContent(pokeTypes[index]);
    }
  });
  test('O botão All deve estar sempre visível', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByText('All');
    expect(allBtn).toBeInTheDocument();
  });
});
describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  test('se o texto do botão é All', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toHaveTextContent('All');
  });
  test('se a Pokedex mostra os Pokémons de todos os tipos'
  + ' quando o botão All for clicado;', () => {
    const pokemonTypes = pokemons.map(({ type }) => type);
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: 'All' });
    userEvent.click(allBtn);
    for (let index = 1; index < pokemonTypes.length; index += 1) {
      const nextBtn = screen.getByTestId(nextPokemon);
      userEvent.click(nextBtn);
      const pokemon = screen.getByTestId('pokemon-type');
      expect(pokemon).toHaveTextContent(pokemonTypes[index]);
    }
  });
});
