import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import InputComponent from './InputComponent';
import ButtonSubmit from './ButtonSubmit';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  height: 'maxWidth',
  borderRadius: '6px',
};

interface modalProps {
  title?: string;
  open?: any;
  onClose?: () => void;
  btnValue?: string;
  closeValue?: string;
  query?: any;
  setQuery?: any;
  onSubmit?: any;
  defaultQuery?: any;
}
const ModalComponent = ({
  open,
  title,
  onClose,
  btnValue,
  closeValue,
  query,
  setQuery,
  onSubmit,
}: modalProps) => {
  const handleChange = (event: any) => {
    setQuery({ ...query, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={onClose}
        aria-labelledby='keep-mounted-modal-title'
        aria-describedby='keep-mounted-modal-description'
      >
        <Box sx={style}>
          <Grid container spacing={2} p={2}>
            <Grid item lg={12} sm={12} xs={12} md={12}>
              <Typography style={{ fontSize: '20px', fontWeight: '800' }}>
                {title}
              </Typography>
            </Grid>
            <Grid item lg={12} sm={12} xs={12} md={12}>
              <InputComponent
                placeholder={'Name'}
                name='student_name'
                value={query?.student_name}
                onChange={handleChange}
                errors='Name'
              />
            </Grid>
            <Grid item lg={12} sm={12} xs={12} md={12}>
              <InputComponent
                email
                placeholder={'Email'}
                name='email'
                value={query?.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item lg={12} sm={12} xs={12} md={12}>
              <InputComponent
                number
                placeholder={'phone'}
                name='phone'
                value={query?.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item lg={12} sm={12} xs={12} md={12}>
              <InputComponent
                placeholder={'Enroll Number'}
                name='enroll_number'
                value={query?.enroll_number}
                onChange={handleChange}
              />
            </Grid>
            <Grid item lg={12} sm={12} xs={12} md={12}>
              <InputComponent
                placeholder={'Date of Admission'}
                name='date_of_admission'
                value={query?.date_of_admission}
                onChange={handleChange}
              />
            </Grid>
            <Grid item lg={12} sm={12} xs={12} md={12}>
              <div style={{ padding: '15px' }}>
                <ButtonSubmit
                  btnValue={btnValue}
                  background='#22C55E'
                  fullWidth
                  style={'12px'}
                  onClick={() => onSubmit(query)}
                />
                &nbsp;
                <ButtonSubmit
                  btnValue={closeValue}
                  background='#C55D22'
                  fullWidth
                  onClick={onClose}
                  style={'12px'}
                />
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalComponent;
