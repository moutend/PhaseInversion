import React from 'react';

import Translate from '../i18n/Translate';

export default function Banner(props: any) {
  return (
    <div>
      <h1 style={{fontSize: "16pt", margin: "16pt 0 8pt"}}>
        {Translate(props.language).appName}
      </h1>
    </div>
  );
}
