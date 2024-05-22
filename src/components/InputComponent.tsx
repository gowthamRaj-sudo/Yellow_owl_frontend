import { TextField } from '@mui/material';
import { error } from 'console';
import React, { useState } from 'react';

interface inputProps {
  placeholder?: any;
  value?: any;
  onChange?: (event: any) => void;
  name?: string;
  required?: boolean;
  errors?: string;
  email?: any;
  number?: any;
}
const InputComponent = ({
  placeholder,
  value,
  onChange,
  name,
  required,
  errors,
  email,
  number,
}: inputProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (onChange) {
      onChange(event);
    }

    if (email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(event.target.value)) {
        setErrorText('Please provide a valid email');
      } else {
        setErrorText(null);
      }
    } else if (number) {
      const numberPattern = /^\d{0,10}$/;
      if (!numberPattern.test(newValue)) {
        setErrorText('Please enter a valid 10-digit number');
      } else {
        setErrorText(null);
      }
    }
  };
  return (
    <div>
      <TextField
        name={name}
        id='outlined-basic'
        placeholder={placeholder}
        variant='outlined'
        size='medium'
        fullWidth
        value={value}
        type={email ? 'email' : 'text'}
        helperText={errorText}
        onChange={handleChange}
        FormHelperTextProps={{
          style: {
            color: 'red',
          },
        }}
        inputProps={number ? { maxLength: 10, pattern: '\\d*' } : {}}
        sx={{
          width: '100%',
          borderRadius: '6px',
          background: '#FFFFFF',
          border: 'none',
        }}
      />
    </div>
  );
};

export default InputComponent;
