import { Box, styled } from '@mui/material';

export const DashboardContainer = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', // ✅ evita colunas largas demais
  gap: '20px',
  width: '100%', // ✅ ocupa toda a área restante
  padding: '20px',
  boxSizing: 'border-box',
}));