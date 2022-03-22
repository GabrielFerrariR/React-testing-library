import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound', () => {
  test('se a página contém um heading h2 com o texto'
  + 'Page requested not found 😭', () => {
    render(<NotFound />);
    const heading = screen
      .getByRole('heading', { level: 2, name: /Page requested not found Crying emoji/i });
    expect(heading).toBeInTheDocument();
  });
  test('se a página mostra uma imagem específica ', () => {
    render(<NotFound />);
    const altTxt = 'Pikachu crying because the page requested was not found';
    const image = screen.getByAltText(altTxt);
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
