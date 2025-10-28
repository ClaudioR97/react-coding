import { useCallback, useEffect, useState } from 'react';

import CardComponent from '@/components/CardComponent/CardComponent';
import GenericTable from '@/components/GenericTable/GenericTable';
import { useFilmesApi } from '@/features/movies/hooks';

export default function Top3List() {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'winCount', label: 'Win Count' },
  ];

  const { getTopStudios } = useFilmesApi();
  const [list, setList] = useState([]);

  const loadData = useCallback(async () => {
    try {
      const data = await getTopStudios();
      setList(data.length ? data.slice(0, 3) : []);
    } catch (e) {
      console.error('Error loading producers intervals:', e);
    }
  }, [getTopStudios]);

  useEffect(() => {
    loadData();
  }, [loadData]);


  return (<CardComponent title="Top 3 studios with winners">
    <GenericTable columns={columns} data={list} />
  </CardComponent>);
}