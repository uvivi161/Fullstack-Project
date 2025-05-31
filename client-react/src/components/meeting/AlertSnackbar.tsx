// import React from 'react';
// import { Snackbar, Alert, AlertColor } from '@mui/material';
// import '../../theme.css';

// interface AlertSnackbarProps {
//   open: boolean;
//   onClose: () => void;
//   message: string;
//   severity: AlertColor;
// }

// const AlertSnackbar: React.FC<AlertSnackbarProps> = ({ open, onClose, message, severity }) => {
//   return (
//     <Snackbar
//       open={open}
//       autoHideDuration={6000}
//       onClose={onClose}
//       anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//     >
//       <Alert 
//         onClose={onClose} 
//         severity={severity} 
//         variant="filled"
//         sx={{ 
//           borderRadius: 'var(--devnote-radius-md)',
//           fontWeight: 500,
//           boxShadow: 'var(--devnote-shadow-lg)'
//         }}
//       >
//         {message}
//       </Alert>
//     </Snackbar>
//   );
// };

// export default AlertSnackbar;