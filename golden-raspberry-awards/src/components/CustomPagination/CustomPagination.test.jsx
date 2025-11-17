import { fireEvent,render, screen } from '@testing-library/react';

import CustomPagination from './CustomPagination';

describe('CustomPagination', () => {
  const mockOnChangePage = jest.fn();

  beforeEach(() => {
    mockOnChangePage.mockClear();
  });

  it('renders page numbers correctly', () => {
    render(<CustomPagination page={1} totalPages={5} onChangePage={mockOnChangePage} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('highlights the current page', () => {
    render(<CustomPagination page={2} totalPages={5} onChangePage={mockOnChangePage} />);

    const currentPage = screen.getByText('3');
    expect(currentPage).toHaveStyle('font-weight: 700');
    expect(currentPage).toHaveStyle('text-decoration: underline');
  });

  it('disables "first" and "previous" buttons on first page', () => {
    render(<CustomPagination page={0} totalPages={5} onChangePage={mockOnChangePage} />);

    const firstButton = screen.getByRole('button', { name: /First Page/i });
    const prevButton = screen.getByRole('button', { name: /Previous Page/i });

    expect(firstButton).toBeDisabled();
    expect(prevButton).toBeDisabled();
  });

  it('disables "last" and "next" buttons on last page', () => {
    render(<CustomPagination page={4} totalPages={5} onChangePage={mockOnChangePage} />);

    const lastButton = screen.getByRole('button', { name: /Next Page/i });
    const nextButton = screen.getByRole('button', { name: /Last Page/i });

    expect(lastButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it('calls onChangePage when clicking page number', () => {
    render(<CustomPagination page={0} totalPages={5} onChangePage={mockOnChangePage} />);

    fireEvent.click(screen.getByText('2')); // clica na página 2
    expect(mockOnChangePage).toHaveBeenCalledWith(1); // zero-based index
  });

  it('calls onChangePage when using navigation buttons', () => {
    render(<CustomPagination page={1} totalPages={5} onChangePage={mockOnChangePage} />);

    const nextButton = screen.getByRole('button', { name: /Next Page/i });
    fireEvent.click(nextButton);
    expect(mockOnChangePage).toHaveBeenCalledWith(2);

    const prevButton = screen.getByRole('button', { name: /Previous Page/i });
    fireEvent.click(prevButton);
    expect(mockOnChangePage).toHaveBeenCalledWith(0);
  });
});
