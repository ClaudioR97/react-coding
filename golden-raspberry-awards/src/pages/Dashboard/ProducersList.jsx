import { Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import CardComponent from '@/components/CardComponent/CardComponent';
import GenericTable from '@/components/GenericTable/GenericTable';
import { useFilmesApi } from '@/features/movies/hooks';

export default function ProducersList() {
  const { getWinsInterval } = useFilmesApi();
  const [maxList, setMaxList] = useState([]);
  const [minList, setMinList] = useState([]);

  const columns = [
    { key: 'producer', label: 'Producer' },
    { key: 'interval', label: 'Interval' },
    { key: 'previousWin', label: 'Previous Year' },
    { key: 'followingWin', label: 'Following Year' },
  ];

  const loadData = useCallback(async () => {
    try {
      const data = await getWinsInterval();
      setMaxList(data.max || []);
      setMinList(data.min || []);
    } catch (e) {
      console.error('Error loading producers intervals:', e);
    }
  }, [getWinsInterval]);

  useEffect(() => {
    loadData();
  }, [loadData]);
  
  return (<CardComponent title="Producers with longest and shortest intervals between wins">
    <Typography variant='h5' sx={{ marginTop: 4 }}>Maximum</Typography>
    <GenericTable columns={columns} data={maxList} />
    <Typography variant='h5' sx={{ marginTop: 4 }}>Minimum</Typography>
    <GenericTable columns={columns} data={minList} />
  </CardComponent>);
}