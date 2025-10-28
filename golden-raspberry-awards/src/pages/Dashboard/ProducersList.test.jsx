import { render, screen, waitFor, within } from '@testing-library/react';

import ProducersList from './ProducersList';

// mock do hook da API
const mockGetWinsInterval = jest.fn();

jest.mock('@/features/movies/hooks', () => ({
  useFilmesApi: () => ({
    getWinsInterval: mockGetWinsInterval,
  }),
}));

describe('ProducersList (With real GenericTable)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  // renderiza as seções e popula Maximum (max) e Minimum (min) conforme API
  it('renders sections and populates Maximum and Minimum from API', async () => {
    mockGetWinsInterval.mockResolvedValueOnce({
      min: [
        { producer: 'Joel Silver', interval: 1, previousWin: 1990, followingWin: 1991 },
      ],
      max: [
        { producer: 'Matthew Vaughn', interval: 13, previousWin: 2002, followingWin: 2015 },
      ],
    });

    render(<ProducersList />);

    // Título e subtítulos
    expect(
      screen.getByText(/Producers with longest and shortest intervals between wins/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Maximum/i)).toBeInTheDocument();
    expect(screen.getByText(/Minimum/i)).toBeInTheDocument();

    // Aguarda a API ser chamada
    await waitFor(() => expect(mockGetWinsInterval).toHaveBeenCalledTimes(1));

    // Tabelas reais (MUI usa role="table" e aria-label="generic table")
    const tables = screen.getAllByRole('table', { name: /generic table/i });

    const maximumTable = tables[0];
    const minimumTable = tables[1];

    // Maximum (max)
    expect(within(maximumTable).getByText(/Matthew Vaughn/i)).toBeInTheDocument();
    expect(within(maximumTable).getByText('13')).toBeInTheDocument();
    expect(within(maximumTable).getByText('2002')).toBeInTheDocument();
    expect(within(maximumTable).getByText('2015')).toBeInTheDocument();

    // Minimum (min)
    expect(within(minimumTable).getByText(/Joel Silver/i)).toBeInTheDocument();
    expect(within(minimumTable).getByText('1')).toBeInTheDocument();
    expect(within(minimumTable).getByText('1990')).toBeInTheDocument();
    expect(within(minimumTable).getByText('1991')).toBeInTheDocument();
  });

  // mostra "No data available" nas duas seções quando API retorna vazio
  it('shows No data available in both sections when API returns empty', async () => {
    mockGetWinsInterval.mockResolvedValueOnce({ max: [], min: [] });

    render(<ProducersList />);

    await waitFor(() => expect(mockGetWinsInterval).toHaveBeenCalledTimes(1));

    const tables = screen.getAllByRole('table', { name: /generic table/i });
    expect(within(tables[0]).getByText(/No data available/i)).toBeInTheDocument(); // Maximum
    expect(within(tables[1]).getByText(/No data available/i)).toBeInTheDocument(); // Minimum
  });

  // Verifica se mantém UI mesmo em erro de API
  it('handles API error gracefully', async () => {
    mockGetWinsInterval.mockRejectedValueOnce(new Error('API error'));

    render(<ProducersList />);

    await waitFor(() => expect(mockGetWinsInterval).toHaveBeenCalledTimes(1));

    expect(
      screen.getByText(/Producers with longest and shortest intervals between wins/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Maximum/i)).toBeInTheDocument();
    expect(screen.getByText(/Minimum/i)).toBeInTheDocument();
  });
});
