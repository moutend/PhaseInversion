import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Translate from '../i18n/Translate';

export default function InvertCheckbox(props: any) {
  return (
    <div>
      <FormControlLabel
        label={
          props.channel === 'left'
          ? Translate(props.language).leftPhaseInvertedCheckbox
          : Translate(props.language).rightPhaseInvertedCheckbox
        }
        control={
          <Checkbox checked={props.checked} onChange={() => props.onChange()} />
        }
      />
    </div>
  );
}
