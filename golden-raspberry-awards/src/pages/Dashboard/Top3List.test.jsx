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
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it('renders the title and empty table initially', async () => {
    mockGetTopStudios.mockResolvedValueOnce([]);

    render(<Top3List />);

    expect(screen.getByText(/Top 3 studios with winners/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(mockGetTopStudios).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/No data available/i)).toBeInTheDocument();
    });
  });

  it('renders the top 3 studios from API', async () => {
    mockGetTopStudios.mockResolvedValueOnce([
      { name: 'Paramount Pictures', winCount: 10 },
      { name: 'Warner Bros', winCount: 8 },
      { name: 'Universal', winCount: 7 },
      { name: 'Disney', winCount: 5 }, 
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

  it('handles API errors gracefully', async () => {
    mockGetTopStudios.mockRejectedValueOnce(new Error('API error'));

    render(<Top3List />);

    await waitFor(() => {
      expect(mockGetTopStudios).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText(/Top 3 studios with winners/i)).toBeInTheDocument();
  });
});
