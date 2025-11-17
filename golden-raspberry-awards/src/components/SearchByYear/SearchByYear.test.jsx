import { fireEvent, render, screen } from '@testing-library/react';

import SearchByYear from './SearchByYear';

describe('SearchByYear', () => {
  it('renders input and button correctly', () => {
    render(<SearchByYear onSearch={jest.fn()} />);
    expect(screen.getByPlaceholderText(/search by year/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('updates input value when typing', () => {
    render(<SearchByYear onSearch={jest.fn()} />);
    const input = screen.getByPlaceholderText(/search by year/i);
    fireEvent.change(input, { target: { value: '1990' } });
    expect(input.value).toBe('1990');
  });

  it('calls onSearch with the correct year when clicking the button', () => {
    const mockOnSearch = jest.fn();
    render(<SearchByYear onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(/search by year/i);
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: '1981' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('1981');
  });

  it('does not crash if onSearch is not provided', () => {
    render(<SearchByYear />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(true).toBe(true);
  });
});
