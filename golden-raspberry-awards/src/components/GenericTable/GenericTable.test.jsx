import { render, screen } from '@testing-library/react';

import GenericTable from './GenericTable';

describe('GenericTable', () => {
  // Rendereiza o componente e verifica se os cabeçalhos e dados são exibidos corretamente
  it('renders table headers and data correctly', () => {
    const columns = [
      { key: 'year', label: 'Year' },
      { key: 'winnerCount', label: 'Win Count' },
    ];
    const data = [{ id: 1, year: 1980, winnerCount: 2 }];

    render(<GenericTable columns={columns} data={data} />);

    // Verifica cabeçalhos
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Win Count')).toBeInTheDocument();

    // Verifica dados
    expect(screen.getByText('1980')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  // Rendereiza o componente com dados vazios e verifica se a mensagem apropriada é exibida
  it('renders "No data available" when empty', () => {
    const columns = [{ key: 'year', label: 'Year' }];
    render(<GenericTable columns={columns} data={[]} />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });
});
