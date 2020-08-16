import React, {useEffect, useRef} from 'react';

import Translate from '../i18n/Translate';

function drawWaveShape(channel: number, ctx: CanvasRenderingContext2D, analyser: AnalyserNode | null) {
  if (analyser === null) {
    return;
  }

  const wavdata = new Uint8Array(256);

  analyser.getByteTimeDomainData(wavdata);

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 256, 256);

  ctx.fillStyle = '#FFF';

  for(let i = 0; i < 256; i += 2) {
    ctx.fillRect(i, 128, 1, 128 - wavdata[i + channel]);
  }
}

export default function WaveShapeImage(props: any) {
  const refWaveShapeImage = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!props.analyser || !refWaveShapeImage || !refWaveShapeImage.current) {
      return;
    }

    const ctx: CanvasRenderingContext2D | null = refWaveShapeImage.current.getContext('2d');

    if (!ctx) {
      return;
    }

    const intervalId = setInterval(() => {
      drawWaveShape(props.channel === 'left' ? 0 : 1, ctx, props.analyser);
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [props.channel, props.analyser]);

  return (
    <div>
      <canvas
        aria-label={props.channel === 'left' ? Translate(props.language).leftWaveShapeImage : Translate(props.language).rightWaveShapeImage}
        ref={refWaveShapeImage}
        width={256} height={256}
        style={{width: "128px", height: "128px", background: '#000'}}
      >
        {props.channel === 'left' ? Translate(props.language).leftWaveShapeImage : Translate(props.language).rightWaveShapeImage}
      </canvas>
    </div>
  );
}
