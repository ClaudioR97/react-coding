import { Card, Typography } from '@mui/material';

export default function CardComponent({ title, children }) {
  return (
    <Card sx={{ padding: 2, boxShadow: 3 }}>
      <Typography variant='h3'>{title}</Typography>
      {children}
    </Card>
  );
}