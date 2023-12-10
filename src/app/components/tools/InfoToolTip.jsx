import * as React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function InfoToolTip({ text }) {
  return (
    <Tooltip title={text}>
      <IconButton>
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
}
