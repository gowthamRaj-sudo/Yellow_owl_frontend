import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import InputComponent from '../../components/InputComponent';
import ButtonSubmit from '../../components/ButtonSubmit';
import ModalComponent from '../../components/ModalComponent';
import { instance } from '../../instance';
import { toast } from 'react-toastify';

interface topNavBarProps {
  searchQuery?: any;
  setSearchQuery?: any;
  action?: any;
}
const TopNavBar = ({ searchQuery, setSearchQuery, action }: topNavBarProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const defaultQuery = {
    student_name: '',
    email: '',
    phone: '',
    enroll_number: '',
    date_of_admission: '',
  };
  const [query, setQuery] = useState(defaultQuery);
  // const [state, setState] = useState();
  const createNewStudent = async (data: any) => {
    try {
      const response = await instance.post(`/api/create`, {
        ...data,
      });
      if (response.status === 200) {
        // setState(response.data);
        setModalOpen(false);
        setQuery(defaultQuery);
        toast.success('created Successfully !');
        action();
      }
    } catch (error) {
      toast.error('This  Student already exist ');
      console.log('something went to wrong !', error);
    }
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item md={4} sm={5} xs={5} lg={6} xl={6}>
          <Typography style={{ fontSize: '30px', fontWeight: '800' }}>
            Students
          </Typography>
        </Grid>
        <Grid item md={6} sm={5} xs={5} lg={3} xl={4}>
          <InputComponent
            placeholder={'Search...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Grid>
        <Grid item md={2} sm={1} xs={1} lg={3} xl={2}>
          <ButtonSubmit
            btnValue='ADD NEW STUDENT'
            isSmalScreen
            background={'#22C55E'}
            onClick={() => setModalOpen(true)}
            style={'12px'}
            fullWidth
          />
        </Grid>
      </Grid>
      <ModalComponent
        defaultQuery={defaultQuery}
        query={query}
        setQuery={setQuery}
        onSubmit={createNewStudent}
        title='ADD NEW STUDENT'
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        btnValue='Submit'
        closeValue='Cancel'
      />
    </div>
  );
};

export default TopNavBar;
