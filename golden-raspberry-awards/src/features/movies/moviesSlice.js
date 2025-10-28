import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { clienteApi } from '@/app/api/clienteApi';

export const buscarFilmes = createAsyncThunk('movies/buscarFilmes', async () => {
  const { data } = await clienteApi.get('?page=9&size=99&winner=true&year=2018');
  return data;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    lista: [],
    carregando: false,
    erro: null,
    pagina: 0,
    tamanho: 10,
    totalPaginas: 0,
    totalElementos: 0,
  },
  reducers: {
    setPagina(state, action) { state.pagina = action.payload; },
    setTamanho(state, action) { state.tamanho = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(buscarFilmes.pending, (state) => { state.carregando = true; })
      .addCase(buscarFilmes.fulfilled, (state, action) => {
        state.carregando = false;
        state.lista = action.payload.content || [];
        state.totalPaginas = action.payload.totalPages || 0;
        state.totalElementos = action.payload.totalElements || 0;
      })
      .addCase(buscarFilmes.rejected, (state, action) => {
        state.carregando = false;
        state.erro = action.error.message;
      });
  },
});

export const { setPagina, setTamanho } = moviesSlice.actions;
export default moviesSlice.reducer;
