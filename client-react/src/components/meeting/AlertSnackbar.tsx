import React from 'react';
import { Snackbar, Alert } from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
};

const AlertSnackbar = ({ open, onClose, message, severity }: Props) => (
  <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
    <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
);

export default AlertSnackbar;
