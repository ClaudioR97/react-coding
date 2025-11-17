import { renderHook } from '@testing-library/react';

import { useFilmesApi } from './hooks';

jest.mock('@/app/api/clienteApi', () => ({
  clienteApi: {
    get: jest.fn(),
  },
}));

describe('useFilmesApi', () => {
  it('fetches years with multiple winners', async () => {
    const mockData = { data: { years: [{ year: 1980, winnerCount: 2 }] } };
    const { clienteApi } = await import('@/app/api/clienteApi');
    clienteApi.get.mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useFilmesApi());
    const data = await result.current.getYearsWithMuiltiWinners();

    expect(data).toEqual([{ year: 1980, winnerCount: 2 }]);
    expect(clienteApi.get).toHaveBeenCalledWith('/movies/yearsWithMultipleWinners');
  });

  it('fetches winners by year', async () => {
    const compVal = [
      {
        'id': 11,
        'year': 1981,
        'title': 'Mommie Dearest',
        'studios': [
          'Paramount Pictures',
        ],
        'producers': [
          'Frank Yablans',
        ],
        'winner': true,
      },
    ];
    const mockData = {
      data: compVal,
    };
    const { clienteApi } = await import('@/app/api/clienteApi');
    clienteApi.get.mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useFilmesApi());
    const data = await result.current.getWinnerByYear();

    expect(data).toEqual(compVal);
    expect(clienteApi.get).toHaveBeenCalledWith('/movies/yearsWithMultipleWinners');
  });

  it('fetches top studios with win count', async () => {
    const mockData = { data: { studios: [{ name: 'Studio A', winCount: 5 }] } };
    const { clienteApi } = await import('@/app/api/clienteApi');
    clienteApi.get.mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useFilmesApi());
    const data = await result.current.getTopStudios();

    expect(data).toEqual([{ name: 'Studio A', winCount: 5 }]);
    expect(clienteApi.get).toHaveBeenCalledWith('/movies/studiosWithWinCount');
  });

  it('fetches empty producer win intervals', async () => {
    const mockData = { data: { min: [], max: [] } };
    const { clienteApi } = await import('@/app/api/clienteApi');
    clienteApi.get.mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useFilmesApi());
    const data = await result.current.getWinsInterval();

    expect(data).toEqual({ min: [], max: [] });
    expect(clienteApi.get).toHaveBeenCalledWith('/movies/maxMinWinIntervalForProducers');
  });

  it('fetches producer win intervals', async () => {
    const compVal = {
      'min': [
        {
          'producer': 'Joel Silver',
          'interval': 1,
          'previousWin': 1990,
          'followingWin': 1991,
        },
      ],
      'max': [
        {
          'producer': 'Matthew Vaughn',
          'interval': 13,
          'previousWin': 2002,
          'followingWin': 2015,
        },
      ],
    };
    const mockData = { data: compVal };
    const { clienteApi } = await import('@/app/api/clienteApi');
    clienteApi.get.mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useFilmesApi());
    const data = await result.current.getWinsInterval();

    expect(data).toEqual(compVal);
    expect(clienteApi.get).toHaveBeenCalledWith('/movies/maxMinWinIntervalForProducers');
  });

  it('fetches movies with query', async () => {
    const mockData = { data: { content: [] } };
    const { clienteApi } = await import('@/app/api/clienteApi');
    clienteApi.get.mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useFilmesApi());
    const query = '?page=1&size=10';
    const data = await result.current.getMovies(query);

    expect(data).toEqual({ content: [] });
    expect(clienteApi.get).toHaveBeenCalledWith(`/movies${query}`);
  });

  it('fetches movies with query second page', async () => {
    const compVal = {
      'content': [
        {
          'id': 11,
          'year': 1981,
          'title': 'Mommie Dearest',
          'studios': [
            'Paramount Pictures',
          ],
          'producers': [
            'Frank Yablans',
          ],
          'winner': true,
        },
        {
          'id': 12,
          'year': 1981,
          'title': 'Endless Love',
          'studios': [
            'PolyGram',
            'Universal Studios',
          ],
          'producers': [
            'Dyson Lovell',
          ],
          'winner': false,
        },
        {
          'id': 13,
          'year': 1981,
          'title': "Heaven's Gate",
          'studios': [
            'United Artists',
          ],
          'producers': [
            'Joann Carelli',
          ],
          'winner': false,
        },
        {
          'id': 14,
          'year': 1981,
          'title': 'The Legend of the Lone Ranger',
          'studios': [
            'Associated Film Distribution',
            'Universal Studios',
          ],
          'producers': [
            'Walter Coblenz',
          ],
          'winner': false,
        },
        {
          'id': 15,
          'year': 1981,
          'title': 'Tarzan, the Ape Man',
          'studios': [
            'MGM',
            'United Artists',
          ],
          'producers': [
            'John Derek',
          ],
          'winner': false,
        },
        {
          'id': 16,
          'year': 1982,
          'title': 'Inchon',
          'studios': [
            'MGM',
          ],
          'producers': [
            'Mitsuharu Ishii',
          ],
          'winner': true,
        },
        {
          'id': 17,
          'year': 1982,
          'title': 'Annie',
          'studios': [
            'Columbia Pictures',
          ],
          'producers': [
            'Ray Stark',
          ],
          'winner': false,
        },
        {
          'id': 18,
          'year': 1982,
          'title': 'Butterfly',
          'studios': [
            'Analysis Film Releasing',
          ],
          'producers': [
            'Matt Cimber',
          ],
          'winner': false,
        },
        {
          'id': 19,
          'year': 1982,
          'title': 'Megaforce',
          'studios': [
            '20th Century Fox',
          ],
          'producers': [
            'Albert S. Ruddy',
          ],
          'winner': false,
        },
        {
          'id': 20,
          'year': 1982,
          'title': 'The Pirate Movie',
          'studios': [
            '20th Century Fox',
          ],
          'producers': [
            'David Joseph',
          ],
          'winner': false,
        },
      ],
      'pageable': {
        'pageNumber': 1,
        'pageSize': 10,
        'sort': {
          'unsorted': true,
          'sorted': false,
          'empty': true,
        },
        'offset': 10,
        'unpaged': false,
        'paged': true,
      },
      'totalPages': 21,
      'totalElements': 206,
      'last': false,
      'numberOfElements': 10,
      'size': 10,
      'number': 1,
      'sort': {
        'unsorted': true,
        'sorted': false,
        'empty': true,
      },
      'first': false,
      'empty': false,
    };
    const mockData = { data: compVal };
    const { clienteApi } = await import('@/app/api/clienteApi');
    clienteApi.get.mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useFilmesApi());
    const query = '?page=2&size=10';
    const data = await result.current.getMovies(query);

    expect(data).toEqual(compVal);
    expect(clienteApi.get).toHaveBeenCalledWith(`/movies${query}`);
  });
});
