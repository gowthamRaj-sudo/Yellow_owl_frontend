import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

function GradientCircularProgress() {
  return (
    <>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id='my_gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='#e01cd5' />
            <stop offset='100%' stopColor='#1CB5E0' />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
      />
    </>
  );
}

export default function Loading() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(90, 90, 90, 0.08)',
        zIndex: 9999,
      }}
    >
      {' '}
      <Stack spacing={2}>
        <GradientCircularProgress />
      </Stack>
    </div>
  );
}
