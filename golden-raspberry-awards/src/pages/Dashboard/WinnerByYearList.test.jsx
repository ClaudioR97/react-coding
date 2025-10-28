import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import WinnerByYearList from './WinnerByYearList';

// Mock do hook da API
const mockGetWinnerByYear = jest.fn();

jest.mock('@/features/movies/hooks', () => ({
  useFilmesApi: () => ({
    getWinnerByYear: mockGetWinnerByYear,
  }),
}));

describe('WinnerByYearList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Verifica se o título e a tabela vazia são renderizados inicialmente
  it('loads data when searching for a year', async () => {
    mockGetWinnerByYear.mockResolvedValueOnce([
      { id: 1, year: 1981, title: 'Mommie Dearest' },
    ]);

    render(<WinnerByYearList />);

    // Encontra o input pelo placeholder
    const input = screen.getByPlaceholderText(/search by year/i);
    // Simula digitação do ano
    fireEvent.change(input, { target: { value: '1981' } });

    // Simula clique no botão do mock SearchByYear
    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockGetWinnerByYear).toHaveBeenCalledWith('1981');
      expect(screen.getByText('Mommie Dearest')).toBeInTheDocument();
    });
  });

  // Verifica se mantém a UI mesmo em caso de erro na API
  it('handles API error gracefully', async () => {
    mockGetWinnerByYear.mockRejectedValueOnce(new Error('API error'));

    render(<WinnerByYearList />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockGetWinnerByYear).toHaveBeenCalled();
      // Mesmo com erro, o componente deve continuar renderizado
      expect(screen.getByText(/List movie winners by year/i)).toBeInTheDocument();
    });
  });
});
