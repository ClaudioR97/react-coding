import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, TextField } from '@mui/material';
import { useState } from 'react';

export default function SearchByYear({ onSearch }) {
  const [year, setYear] = useState('');

  const handleSearch = () => {
    if (onSearch) onSearch(year);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pt: 3 }}>
      <TextField
        type="number"
        placeholder="Search by year"
        variant="outlined"
        size="small"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        sx={{
          flex: 1,
          '& input': { padding: '8px' },
          minWidth: 220,
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <IconButton
        color="primary"
        onClick={handleSearch}
        sx={{
          backgroundColor: '#1976d2',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#115293',
          },
          width: 38,
          height: 38,
          borderRadius: 1,
        }}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
}
