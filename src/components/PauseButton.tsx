import React from 'react';

import IconButton from '@material-ui/core/IconButton';

import PauseIcon from '@material-ui/icons/Pause';

import Translate from '../i18n/Translate';

export default function PauseButton(props: any) {
  return (
    <div>
      <IconButton autoFocus onClick={props.onClick} aria-label={Translate(props.language).pauseButton} disabled={props.disabled} color="primary">
        <PauseIcon style={props.disabled ? {fontSize: 32, color: '#777'} : {fontSize: 32, color: '#000'}} />
      </IconButton>
    </div>
  );
}
