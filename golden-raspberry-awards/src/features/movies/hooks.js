import { useMemo } from 'react';

import { clienteApi } from '@/app/api/clienteApi';

export const useFilmesApi = () => {
  const api = useMemo(() => ({
    getMovies: async (query = '') => {
      const { data } = await clienteApi.get(`/movies${query}`);
      return data;
    },
    getYearsWithMuiltiWinners: async () => {
      const { data } = await clienteApi.get('/movies/yearsWithMultipleWinners');
      return data.years;
    },
    getTopStudios: async () => {
      const { data } = await clienteApi.get('/movies/studiosWithWinCount');
      return data.studios;
    },
    getWinsInterval: async () => {
      const { data } = await clienteApi.get('/movies/maxMinWinIntervalForProducers');
      return data;
    },
    getWinnerByYear: async (year) => {
      const { data } = await clienteApi.get(`/movies/winnersByYear?year=${year}`);
      return Array.isArray(data) ? data : [data];
    },
  }), []);

  return api;
};
