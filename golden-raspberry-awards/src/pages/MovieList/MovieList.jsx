import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import CardComponent from '@/components/CardComponent/CardComponent';
import CustomPagination from '@/components/CustomPagination/CustomPagination';
import { useFilmesApi } from '@/features/movies/hooks';
import useDebounce from '@/hooks/useDebounce';

import { StyledTableCell } from './styled';

export default function MovieList() {
  const { getMovies } = useFilmesApi();

  const [movies, setFilmes] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [total, setTotal] = useState(0);
  const [filtroAno, setFiltroAno] = useState('');
  const [filtroWinner, setFiltroWinner] = useState('');
  const filtroAnoDebounced = useDebounce(filtroAno, 600);

  const buscarFilmes = useCallback(async () => {
    let query = `?page=${pagina}&size=10`;
    if (filtroAnoDebounced) query += `&year=${filtroAnoDebounced}`;
    if (filtroWinner) query += `&winner=${filtroWinner === 'Yes'}`;

    try {
      const data = await getMovies(query);
      setFilmes(data.content || []);
      setTotal(data.totalElements || 0);
    } catch (e) {
      console.error('Erro ao buscar movies:', e);
    }
  }, [filtroAnoDebounced, filtroWinner, getMovies, pagina]);

  const handleChangePage = useCallback((novaPagina) => setPagina(novaPagina), []);

  const handleChangeYear = useCallback((e) => {
    setFiltroAno(e.target.value);
    setPagina(0);
  }, []);

  const handleChangeIsWinner = useCallback((e) => {
    setFiltroWinner(e.target.value);
    setPagina(0);
  }, []);

  useEffect(() => {
    buscarFilmes();
  }, [buscarFilmes]);

  return (
    <CardComponent title="List movies">
      <TableContainer component={Paper} sx={{mt: 1}}>
        <Table>
          <TableHead>
            <TableRow >
              <StyledTableCell sx={{ width: '10%' }}>ID</StyledTableCell>
              <StyledTableCell sx={{ width: '15%' }}>
                <Typography sx={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>Year</Typography>
                <TextField
                  placeholder="Filter by year"
                  variant="outlined"
                  size="small"
                  value={filtroAno}
                  onChange={(e) => handleChangeYear(e)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </StyledTableCell>
              <StyledTableCell sx={{ width: '30%' }}>Title</StyledTableCell>
              <StyledTableCell sx={{ width: '20%' }}>
                <Typography sx={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>Winner?</Typography>
                <Select
                  value={filtroWinner}
                  onChange={(e) => handleChangeIsWinner(e)}
                  size="small"
                  displayEmpty
                  sx={{ width: '100%' }}
                >
                  <MenuItem value="">Yes/No</MenuItem>
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.length > 0 ? (
              movies.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ pt: 1 }}>{row.id}</TableCell>
                  <TableCell sx={{ pt: 1 }}>{row.year}</TableCell>
                  <TableCell sx={{ pt: 1 }}>{row.title}</TableCell>
                  <TableCell sx={{ pt: 1 }}>
                    {row.winner ? 'Yes' : 'No'}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography align="center" sx={{ color: '#aaa', py: 2 }}>
                    No data available
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center">
        <CustomPagination
          page={pagina}
          totalPages={Math.ceil(total / 10)}
          onChangePage={handleChangePage}
        />
      </Box>
    </CardComponent>
  );
}
