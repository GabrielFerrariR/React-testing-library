import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa se página contém informações sobre a Pokedex ', () => {
  test('se página contém um heading h2 com o texto About Pokédex', async () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    userEvent.click(aboutLink);
    const pokedexHeading = await screen
      .findByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(pokedexHeading).toBeInTheDocument();
  });
  test('se a página contém dois parágrafos com texto sobre a pokedex', async () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    userEvent.click(aboutLink);
    const fstP = await screen.findByText(/This application/i);
    const sndP = await screen.findByText(/One can/i);
    expect(fstP).toBeInTheDocument();
    expect(sndP).toBeInTheDocument();
  });
  test('se a página contém a imagem de pokédex específica', async () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    userEvent.click(aboutLink);
    const image = await screen.findByAltText('Pokédex');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
