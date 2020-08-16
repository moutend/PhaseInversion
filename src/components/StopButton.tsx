import React from 'react';

import IconButton from '@material-ui/core/IconButton';

import StopIcon from '@material-ui/icons/Stop';

import Translate from '../i18n/Translate';

export default function StopButton(props: any) {
  return (
    <div>
      <IconButton onClick={props.onClick} aria-label={Translate(props.language).stopButton} disabled={props.disabled} color="primary">
        <StopIcon style={props.disabled ? {fontSize: 32, color: '#777'} : {fontSize: 32, color: '#000'}} />
      </IconButton>
    </div>
  );
}
