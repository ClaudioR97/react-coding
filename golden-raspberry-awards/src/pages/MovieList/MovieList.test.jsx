import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';

import MovieList from './MovieList';

const mockGetMovies = jest.fn();

jest.mock('@/features/movies/hooks', () => ({
  useFilmesApi: () => ({
    getMovies: mockGetMovies,
  }),
}));

jest.mock('@/hooks/useDebounce', () => jest.fn((value) => value));

describe('MovieList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  // Verifica se renderiza a tabela, filtros e chama a API corretamente
  it('renders the table, filters, and calls API correctly', async () => {
    mockGetMovies.mockResolvedValueOnce({
      content: [{ id: 1, year: 2020, title: 'Test Movie', winner: true }],
      totalElements: 1,
    });

    render(<MovieList />);

    expect(screen.getByText(/List movies/i)).toBeInTheDocument();

    await waitFor(() => expect(mockGetMovies).toHaveBeenCalledTimes(1));

    // Escopo limitado à tabela para evitar conflito de textos duplicados
    const table = screen.getByRole('table');
    expect(within(table).getByText('1')).toBeInTheDocument(); // ID
    expect(within(table).getByText('2020')).toBeInTheDocument();
    expect(within(table).getByText(/Test Movie/i)).toBeInTheDocument();
    const yesTexts = screen.getAllByText(/Yes/i);
    expect(yesTexts[0]).toBeInTheDocument();
  });

  // Verifica se mostra "No data available" quando não há filmes
  it('shows No data available when there are no movies', async () => {
    mockGetMovies.mockResolvedValueOnce({
      content: [],
      totalElements: 0,
    });

    render(<MovieList />);

    await waitFor(() => expect(mockGetMovies).toHaveBeenCalledTimes(1));

    expect(screen.getByText(/No data available/i)).toBeInTheDocument();
  });

  // Verifica se filtra por ano e vencedor corretamente
  it('filters by year and winner correctly', async () => {
    mockGetMovies.mockResolvedValue({
      content: [],
      totalElements: 0,
    });

    render(<MovieList />);

    const yearInput = screen.getByPlaceholderText(/Filter by year/i);
    fireEvent.change(yearInput, { target: { value: '1995' } });

    // Localiza o select corretamente
    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);
    const yesOption = await screen.findByText('Yes');
    fireEvent.click(yesOption);

    await waitFor(() => {
      expect(mockGetMovies).toHaveBeenCalledWith(expect.stringContaining('year=1995'));
      expect(mockGetMovies).toHaveBeenCalledWith(expect.stringContaining('winner=true'));
    });
  });

  // Verifica se mantém a UI mesmo em caso de erro na API
  it('handles API error gracefully', async () => {
    mockGetMovies.mockRejectedValueOnce(new Error('API error'));

    render(<MovieList />);

    await waitFor(() => expect(mockGetMovies).toHaveBeenCalledTimes(1));

    expect(screen.getByText(/List movies/i)).toBeInTheDocument();
    expect(screen.getByText(/No data available/i)).toBeInTheDocument();
  });
});
