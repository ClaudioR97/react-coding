import { useCallback, useEffect, useState } from 'react';

import CardComponent from '@/components/CardComponent/CardComponent';
import GenericTable from '@/components/GenericTable/GenericTable';
import { useFilmesApi } from '@/features/movies/hooks';

export default function YearsList() {
  const columns = [
    { key: 'year', label: 'Year' },
    { key: 'winnerCount', label: 'Win Count' },
  ];
  
  const { getYearsWithMuiltiWinners } = useFilmesApi();
  const [list, setList] = useState([]);

  const loadData = useCallback(async () => {
    try {
      const data = await getYearsWithMuiltiWinners();
      setList(data || []);
    } catch (e) {
      console.error('Error loading producers intervals:', e);
    }
  }, [getYearsWithMuiltiWinners]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  
  return (
    <CardComponent title="Years with Multiple Winners">
      <GenericTable columns={columns} data={list.length ? list : []}/>
    </CardComponent>
  );
}