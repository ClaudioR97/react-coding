import { render, screen, waitFor } from '@testing-library/react';

import Top3List from './Top3List';

const mockGetTopStudios = jest.fn();

jest.mock('@/features/movies/hooks', () => ({
  useFilmesApi: () => ({
    getTopStudios: mockGetTopStudios,
  }),
}));


describe('Top3List', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {}); // silencia erros esperados
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  // Verifica se renderiza o título e a tabela vazia inicialmente
  it('renders the title and empty table initially', async () => {
    mockGetTopStudios.mockResolvedValueOnce([]);

    render(<Top3List />);

    expect(screen.getByText(/Top 3 studios with winners/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(mockGetTopStudios).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/No data available/i)).toBeInTheDocument();
    });
  });

  // Verifica se renderiza os 3 principais estúdios retornados pela API
  it('renders the top 3 studios from API', async () => {
    mockGetTopStudios.mockResolvedValueOnce([
      { name: 'Paramount Pictures', winCount: 10 },
      { name: 'Warner Bros', winCount: 8 },
      { name: 'Universal', winCount: 7 },
      { name: 'Disney', winCount: 5 }, // este deve ser ignorado (só 3 primeiros)
    ]);

    render(<Top3List />);

    await waitFor(() => {
      expect(mockGetTopStudios).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/Paramount Pictures/i)).toBeInTheDocument();
      expect(screen.getByText(/Warner Bros/i)).toBeInTheDocument();
      expect(screen.getByText(/Universal/i)).toBeInTheDocument();
      expect(screen.queryByText(/Disney/i)).not.toBeInTheDocument();
    });
  });

  // Verifica se mantém a UI mesmo em caso de erro na API
  it('handles API errors gracefully', async () => {
    mockGetTopStudios.mockRejectedValueOnce(new Error('API error'));

    render(<Top3List />);

    await waitFor(() => {
      expect(mockGetTopStudios).toHaveBeenCalledTimes(1);
    });

    // Mesmo com erro, o título e a tabela devem existir
    expect(screen.getByText(/Top 3 studios with winners/i)).toBeInTheDocument();
  });
});
