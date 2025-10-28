import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useLocation,useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', path: '/' },
    { text: 'List', path: '/movies' },
  ];

  return (
    <List sx={{ width: '16%' }}>
      {menuItems.map((item) => (
        <ListItem key={item.path} disablePadding>
          <ListItemButton
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
