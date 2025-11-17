import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Topbar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#2d2d2d',
        boxShadow: 'none',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 500,
              fontSize: '1.1rem',
              color: '#fff',
            }}
          >
            Frontend React Test
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
