import { Typography } from '@mui/material';
import { render, screen } from '@testing-library/react';

import CardComponent from './CardComponent';

describe('CardComponent', () => {
  // Rendereiza o componente com um título e verifica se o título é exibido corretamente
  it('renders the title correctly', () => {
    render(<CardComponent title="Test Title" />);
    
    // Verifica se o título é renderizado
    const titleElement = screen.getByText('Test Title');
    expect(titleElement).toBeInTheDocument();

    // Verifica se o título é um Typography variant h3
    expect(titleElement.tagName.toLowerCase()).toBe('h3');
  });
  
  // Rendereiza o componente com filhos e verifica se os filhos são exibidos corretamente
  it('renders children correctly', () => {
    render(
      <CardComponent title="Parent Card">
        <Typography>Child content</Typography>
      </CardComponent>,
    );

    // O título deve aparecer
    expect(screen.getByText('Parent Card')).toBeInTheDocument();

    // O conteúdo filho deve aparecer dentro do card
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });
});
