import { Box, Divider } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Sidebar from '@/pages/Sidebar/Sidebar';
import Topbar from '@/pages/Topbar/Topbar';

export default function MainLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Topbar />
      <Box sx={{ display: 'flex', flex: 1, mt: '64px' }}>
        <Sidebar />
        <Divider orientation="vertical" flexItem />
        <Box sx={{ flex: 1, p: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
