import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
} from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

export default function CustomPagination({
  page,
  totalPages,
  onChangePage,
}) {
  const maxButtons = 4;

  const startPage = Math.max(1, page - Math.floor(maxButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxButtons - 1);

  const handleClick = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) onChangePage(newPage);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" gap={1} sx={{ mt: 2 }}>
      <IconButton
        aria-label='First Page'
        onClick={() => handleClick(0)}
        disabled={page === 0}
      >
        <FirstPageIcon fontSize="small" />
      </IconButton>

      <IconButton
        aria-label='Previous Page'
        onClick={() => handleClick(page - 1)}
        disabled={page === 0}
      >
        <ChevronLeftIcon fontSize="small" />
      </IconButton>

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((p) => (
        <Typography
          key={p}
          onClick={() => handleClick(p - 1)}
          sx={{
            cursor: 'pointer',
            px: 1,
            fontWeight: p - 1 === page ? 700 : 400,
            color: p - 1 === page ? '#1976d2' : 'inherit',
            textDecoration: p - 1 === page ? 'underline' : 'none',
          }}
        >
          {p}
        </Typography>
      ))}

      <IconButton
        aria-label='Next Page'
        onClick={() => handleClick(page + 1)}
        disabled={page >= totalPages - 1}
      >
        <ChevronRightIcon fontSize="small" />
      </IconButton>

      <IconButton
        aria-label='Last Page'
        onClick={() => handleClick(totalPages - 1)}
        disabled={page >= totalPages - 1}
      >
        <LastPageIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
