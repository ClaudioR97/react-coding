import { fireEvent, render, screen } from '@testing-library/react';

import SearchByYear from './SearchByYear';

describe('SearchByYear', () => {
  // Rendereiza o componente e verifica se o campo de input e o botão estão presentes
  it('renders input and button correctly', () => {
    render(<SearchByYear onSearch={jest.fn()} />);

    // Verifica o campo e o botão estão renderizados
    expect(screen.getByPlaceholderText(/search by year/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  // Verifica se o valor do input é atualizado corretamente ao digitar
  it('updates input value when typing', () => {
    render(<SearchByYear onSearch={jest.fn()} />);

    const input = screen.getByPlaceholderText(/search by year/i);

    fireEvent.change(input, { target: { value: '1990' } });
    expect(input.value).toBe('1990');
  });

  // Verifica se a função onSearch é chamada com o valor correto ao clicar no botão
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

  // Verifica se o componente não quebra caso onSearch não seja fornecido
  it('does not crash if onSearch is not provided', () => {
    render(<SearchByYear />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(true).toBe(true);
  });
});
