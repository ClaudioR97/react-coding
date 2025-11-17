import { render, screen, waitFor } from '@testing-library/react';

import YearsList from './YearsList';

jest.mock('@/features/movies/hooks', () => ({
  useFilmesApi: () => ({
    getYearsWithMuiltiWinners: jest.fn().mockResolvedValue([
      { year: 1980, winnerCount: 3 },
    ]),
  }),
}));

test('renders years from API', async () => {
  render(<YearsList />);

  await waitFor(() => {
    expect(screen.getByText('1980')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
