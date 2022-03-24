import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pikachuDetails = '/pokemons/25';

describe('Teste o componente PokemonDetails.js', () => {
  test('A página deve conter um texto <name> Details, onde <name> é o nome'
  + ' do Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuDetails);
    const heading = screen.getByRole('heading', { level: 2, name: /Pikachu Details/i });
    expect(heading).toBeInTheDocument();
  });

  test('Não deve existir o link de navegação para os detalhes do Pokémon'
  + ' selecionado', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuDetails);
    const link = screen.queryByRole('link', { name: /More Details/i });
    expect(link).not.toBeInTheDocument();
  });

  test('se há uma seção de detalhes contendo um h2 com o texto Summary', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuDetails);
    const summary = screen.getByRole('heading', { level: 2, name: /Summary/i });
    expect(summary).toBeInTheDocument();
  });

  test('se a seção de detalhes contém um resumo sobre o Pokemon específico', () => {
    const { summary } = pokemons[0];
    const { history } = renderWithRouter(<App />);
    history.push(pikachuDetails);
    const info = screen.getByText(summary);
    expect(info).toBeInTheDocument();
  });
});

describe('Teste se existe na página uma seção com os mapas contendo as '
+ 'localizações do pokémon', () => {
  test('Na seção de detalhes deverá existir um heading h2 com o texto '
  + 'Game Locations of <name>; onde <name> é o nome do Pokémon exibido.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuDetails);
    const locationsH2 = screen
      .getByRole('heading', { level: 2, name: /Game Locations of Pikachu/i });
    expect(locationsH2).toBeInTheDocument();
  });

  test('se todas as localizações do Pokémon estão sendo mostradas na seção'
  + ' de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuDetails);
    const locations = screen.getAllByText(/Kanto/i);
    expect(locations).toHaveLength(2);
  });

  test('Devem ser exibidos, o nome da localização e uma imagem do mapa em'
  + ' cada localização', () => {
    const { foundAt } = pokemons[0];
    const { history } = renderWithRouter(<App />);
    history.push(pikachuDetails);
    foundAt.forEach(({ location, map }, index) => {
      const pokemonLocation = screen.getByText(location);
      const locationMap = screen.getAllByAltText('Pikachu location');

      expect(pokemonLocation).toBeInTheDocument();
      expect(locationMap[index]).toHaveAttribute('src', map);
    });
  });

  test('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuDetails);
    const favoriteCheckbox = screen
      .getByRole('checkbox', { name: /Pokémon Favoritado\?/i });
    expect(favoriteCheckbox).toBeInTheDocument(0);
  });

  test('se cliques alternados no checkbox adicionam e removem respectivamente'
  + ' o pokemon da lista de favoritos', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuDetails);
    const linkToFavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });
    let favoriteCheckbox = screen
      .getByRole('checkbox', { name: /Pokémon Favoritado\?/i });
    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox).toBeChecked();

    userEvent.click(linkToFavorites);
    const pikachuName = screen.getByTestId('pokemon-name');
    expect(pikachuName).toBeInTheDocument();

    const details = screen.getByRole('link', { name: /More details/i });
    userEvent.click(details);

    favoriteCheckbox = screen
      .getByRole('checkbox', { name: /Pokémon Favoritado\?/i });
    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox).not.toBeChecked();
    userEvent.click(linkToFavorites);

    const noFavoriteFound = screen.getByText(/No favorite pokemon found/i);
    expect(noFavoriteFound).toBeInTheDocument();
  });
});
