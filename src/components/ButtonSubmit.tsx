import { Button, useMediaQuery } from '@mui/material';
import React from 'react';

interface buttonProps {
  background?: any;
  btnValue?: string;
  isSmalScreen?: any;
  size?: any;
  fullWidth?: any;
  onClick?: any;
  style?: any;
  type?: any;
}

const ButtonSubmit = ({
  background,
  btnValue,
  isSmalScreen,
  size,
  fullWidth,
  onClick,
  style,
  type,
}: buttonProps) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <div>
      <Button
        variant='contained'
        size={size}
        fullWidth={fullWidth}
        // type={type}
        sx={{
          padding: `${style}`,
          background: `${background}`,
          color: 'white',
          fontWeight: '800',
          '&:hover': {
            background: `${background}`,
          },
        }}
        onClick={onClick}
      >
        {isSmallScreen && isSmalScreen ? 'ADD' : btnValue}
      </Button>
    </div>
  );
};

export default ButtonSubmit;
