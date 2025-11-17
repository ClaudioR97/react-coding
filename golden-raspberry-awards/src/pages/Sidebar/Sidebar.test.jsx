import { fireEvent,render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Sidebar from './Sidebar';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ pathname: '/' }),
}));

describe('Sidebar', () => {
  it('renders menu items and navigates on click', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/List/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/List/i));
    expect(mockNavigate).toHaveBeenCalledWith('/movies');
  });
});
