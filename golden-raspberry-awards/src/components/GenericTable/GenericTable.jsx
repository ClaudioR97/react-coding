import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

/**
 * @param {Object[]} columns - Array de colunas [{ key: 'year', label: 'Year' }]
 * @param {Object[]} data - Lista de objetos [{ year: 1990, winnerCount: 2 }]
 * @param {string} [rowKey] - Campo único para usar como key (ex: 'id' ou 'year')
 * @param {boolean} [dense] - Reduz padding da tabela
 */
export default function GenericTable({ columns, data, rowKey = 'id', dense = false }) {
  return (
    <TableContainer component={Paper} elevation={2} sx={{ mt: 1 }}>
      <Table size={dense ? 'small' : 'medium'} aria-label="generic table">
        {/* Cabeçalho */}
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.key} sx={{ fontWeight: 600, pt: 1 }}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Corpo */}
        <TableBody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <TableRow key={row[rowKey] ?? index} hover>
                {columns.map((col) => (
                  <TableCell sx={{ pt: 1 }} key={col.key}>
                    {row[col.key] ?? '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  No data available
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
