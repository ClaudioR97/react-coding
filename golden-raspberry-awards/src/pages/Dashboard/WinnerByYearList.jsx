import { useCallback, useState } from 'react';

import CardComponent from '@/components/CardComponent/CardComponent';
import GenericTable from '@/components/GenericTable/GenericTable';
import SearchByYear from '@/components/SearchByYear/SearchByYear';
import { useFilmesApi } from '@/features/movies/hooks';

export default function WinnerByYearList() {
  const columns = [
    { key: 'id', label: 'Id' },
    { key: 'year', label: 'Year' },
    { key: 'title', label: 'Title' },
  ];

  const [list, setList] = useState([]);
  const { getWinnerByYear } = useFilmesApi();

  const handleSearch = useCallback(async (year) => {
    try {
      if (year) {
        const data = await getWinnerByYear(year);
        setList(data || []);
      } else {
        setList([]);
      }
    } catch (e) {
      console.error('Error fetching winners by year:', e);
    }
  }, [getWinnerByYear]);

  return (<CardComponent title="List movie winners by year">
    <SearchByYear onSearch={handleSearch} />

    <GenericTable columns={columns} data={list} />
  </CardComponent>);
}