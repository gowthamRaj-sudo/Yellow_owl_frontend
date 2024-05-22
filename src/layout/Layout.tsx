import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TopNavBar from './TopNavBar/TopNavBar';
import TableComponent from '../components/TableComponent';

import { headerBackground, sideBarBackground } from '../utils/style';
import { instance } from '../instance';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

const drawerWidth = 320;

const Layout = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState();
  const getStudents = async () => {
    setLoading(true);
    try {
      const response = await instance.get(`/api/view`);

      if (response.status === 200) {
        setTimeout(() => {
          setLoading(false);
          setState(response.data);
        }, 1000);
      }
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    getStudents();
  }, []);
  interface selecteddataProps {
    action: boolean;
    date_of_admission: string;
    email: string;
    enroll_number: string;
    id: number;
    phone: string;
    student_name: string;
  }
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedStudent, setSelectedStudent] =
    React.useState<selecteddataProps>();
  const [confirmationModalOpen, setConfirmationModalOpen] =
    React.useState(false);

  const updateStudent = async (data: any) => {
    try {
      const response = await instance.put(`/api/update/${data?.id}`, {
        ...data,
      });
      if (response.status === 200) {
        toast.success('Updated Successfully !');
        setModalOpen(false);
        getStudents();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (data: any) => {
    try {
      const response = await instance.delete(`/api/delete/${data}`);
      if (response.status === 200) {
        toast.success('Deleted Successfully !');
        getStudents();
        setConfirmationModalOpen(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundImage: headerBackground,
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Students
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              background: sideBarBackground,
            },
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              //   textAlign: 'center',
              paddingTop: '15px',
            }}
          >
            <div>
              <img
                src='https://cdn.iconscout.com/icon/free/png-512/free-avatar-370-456322.png?f=webp&w=256'
                style={{ width: '78px', height: '78px', borderRadius: '100%' }}
              />
            </div>
            <div>
              <h3 style={{ color: 'white', fontWeight: '600' }}>Yellow Owl</h3>
              <p style={{ color: '#BFDBFE', fontWeight: '400' }}>Admin</p>
            </div>
          </div>
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              background: 'linear-gradient(to right, #1E40AF , #9333EA )',
            },
          }}
          open
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              //   textAlign: 'center',
              paddingTop: '15px',
            }}
          >
            <div>
              <img
                src='https://cdn.iconscout.com/icon/free/png-512/free-avatar-370-456322.png?f=webp&w=256'
                style={{ width: '78px', height: '78px', borderRadius: '100%' }}
              />
            </div>
            <div>
              <h3 style={{ color: 'white', fontWeight: '600' }}>Yellow Owl</h3>
              <p style={{ color: '#BFDBFE', fontWeight: '400' }}>Admin</p>
            </div>
          </div>
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          background: '#E5E7EB',
          height: '100vh',
        }}
      >
        <Toolbar />

        <TopNavBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          action={getStudents}
        />
        <br />
        <TableComponent
          searchQuery={searchQuery}
          rows={state}
          query={selectedStudent}
          setQuery={setSelectedStudent}
          onSubmit={updateStudent}
          open={modalOpen}
          onClose={setModalOpen}
          handleAction={handleDelete}
          confirmationModel={confirmationModalOpen}
          setConfirmationModalOpen={setConfirmationModalOpen}
        />
      </Box>
      {loading && <Loading />}
    </Box>
  );
};

export default Layout;
