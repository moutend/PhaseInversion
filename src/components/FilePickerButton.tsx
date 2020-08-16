import React, {useState, useEffect} from 'react';

import Button from '@material-ui/core/Button';

import Translate from '../i18n/Translate';

async function handleFileOpen(files: FileList | null, load: (a: ArrayBuffer) => Promise<void>, setFilename: (a: string) => void) {
  if (!files || files.length === 0) {
    return;
  }

  const file = files.item(0);

  if (!file) {
    return;
  }

  setFilename(file.name);

  const buffer = await file.arrayBuffer();

  load(buffer);
}

export default function FilePickerButton(props: any) {
  const [filename, setFilename] = useState('') as [string, (a: string) => void];
  const [status, setStatus] = useState('') as [string, (a: string) => void];

  useEffect(() => {
    if (props.ready) {
      setStatus(filename);
    }
  }, [props.ready, setStatus, filename]);

  useEffect(() => {
    if (!props.ready) {
      setStatus(Translate(props.language).fileChooseMessage);
    }
  }, [props.ready, props.language, setStatus]);

  return (
    <div>
      <Button
        component="label"
        style={{margin: '16pt 0 8pt', color: '#FFF', backgroundColor: '#C11'}}
      >
        {status}
        <input
          type="file"
          id="file-picker-button"
          onChange={(e) => {
            setStatus(Translate(props.language).fileLoadMessage);
            handleFileOpen(e.target.files, props.onLoad, setFilename);
          }}
          style={{display: "none"}}
        />
      </Button>
    </div>
  );
}
