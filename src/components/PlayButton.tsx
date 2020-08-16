import React from 'react';

import IconButton from '@material-ui/core/IconButton';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import Translate from '../i18n/Translate';

export default function PlayButton(props: any) {
  return (
    <div>
      <IconButton autoFocus onClick={props.onClick} aria-label={Translate(props.language).playButton} disabled={props.disabled} color="primary">
        <PlayArrowIcon style={props.disabled ? {fontSize: 32, color: '#777'} : {fontSize: 32, color: '#000'}} />
      </IconButton>
    </div>
  );
}
