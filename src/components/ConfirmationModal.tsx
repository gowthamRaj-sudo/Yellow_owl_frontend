import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import ButtonSubmit from './ButtonSubmit';
import { toast } from 'react-toastify';
import { failure, success } from '../utils/style';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '450px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  height: 'maxWidth',
  borderRadius: '6px',
};

interface confirmationModalProps {
  open?: any;
  onClose?: any;
  onSubmit?: any;
}
const ConfirmationModal = ({
  open,
  onClose,
  onSubmit,
}: confirmationModalProps) => {
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
          <Typography
            style={{ fontSize: '18px', fontWeight: '700', textAlign: 'center' }}
          >
            Are you sure to delete this student?
          </Typography>
          <Grid container spacing={2} p={2}>
            <Grid item sm={6} xs={6} md={6} lg={6} xl={6}>
              <ButtonSubmit
                btnValue='Yes'
                fullWidth
                size={'small'}
                background={success}
                onClick={onSubmit}
              />
            </Grid>
            <Grid item sm={6} xs={6} md={6} lg={6} xl={6}>
              <ButtonSubmit
                btnValue='No'
                size={'small'}
                fullWidth
                background={failure}
                onClick={onClose}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default ConfirmationModal;
