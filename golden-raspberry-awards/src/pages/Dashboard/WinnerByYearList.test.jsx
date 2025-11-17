import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import WinnerByYearList from './WinnerByYearList';

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

  it('loads data when searching for a year', async () => {
    mockGetWinnerByYear.mockResolvedValueOnce([
      { id: 1, year: 1981, title: 'Mommie Dearest' },
    ]);

    render(<WinnerByYearList />);

    const input = screen.getByPlaceholderText(/search by year/i);
    fireEvent.change(input, { target: { value: '1981' } });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockGetWinnerByYear).toHaveBeenCalledWith('1981');
      expect(screen.getByText('Mommie Dearest')).toBeInTheDocument();
    });
  });

  it('does not call API and clears list when year is empty', async () => {
    mockGetWinnerByYear.mockResolvedValueOnce([
      { id: 1, year: 1981, title: 'Mommie Dearest' },
    ]);

    render(<WinnerByYearList />);

    const input = screen.getByPlaceholderText(/search by year/i);
    const button = screen.getByRole('button');
    fireEvent.change(input, { target: { value: '1981' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockGetWinnerByYear).toHaveBeenCalledWith('1981');
      expect(screen.getByText('Mommie Dearest')).toBeInTheDocument();
    });

    jest.clearAllMocks();
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockGetWinnerByYear).not.toHaveBeenCalled();
      expect(screen.queryByText('Mommie Dearest')).not.toBeInTheDocument();
    });
  });
});
