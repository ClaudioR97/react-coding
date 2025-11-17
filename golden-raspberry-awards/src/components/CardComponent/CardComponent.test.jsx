import { Typography } from '@mui/material';
import { render, screen } from '@testing-library/react';

import CardComponent from './CardComponent';

describe('CardComponent', () => {
  it('renders the title correctly', () => {
    render(<CardComponent title="Test Title" />);
    
    const titleElement = screen.getByText('Test Title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName.toLowerCase()).toBe('h3');
  });
  
  it('renders children correctly', () => {
    render(
      <CardComponent title="Parent Card">
        <Typography>Child content</Typography>
      </CardComponent>,
    );

    expect(screen.getByText('Parent Card')).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });
});
