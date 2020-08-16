import React, {useState, useMemo} from 'react';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';

import AudioRenderer from '../logic/AudioRenderer';

import Banner from '../components/Banner';
import FilePickerButton from '../components/FilePickerButton';
import InvertCheckbox from '../components/InvertCheckbox';
import PauseButton from '../components/PauseButton';
import PlayButton from '../components/PlayButton';
import StopButton from '../components/StopButton';
import WaveShapeImage from '../components/WaveShapeImage';

export default function PhaseInverter(props: any) {
  const [isReadyToPlay, setIsReadyToPlay] = useState(false) as [boolean, (a: boolean) => void];
  const [isPlaying, setIsPlaying] = useState(false) as [boolean, (a: boolean) => void];
  const [isLeftPhaseInverted, setIsLeftPhaseInverted] = useState(false) as [boolean, (a: boolean) => void];
  const [isRightPhaseInverted, setIsRightPhaseInverted] = useState(false) as [boolean, (a: boolean) => void];
  const [analyser, setAnalyser] = useState(null) as [AnalyserNode | null, (a: AnalyserNode | null) => void];

  const audioRenderer = useMemo((): AudioRenderer => {
    return new AudioRenderer({
      setIsReadyToPlay,
      setIsPlaying,
      setIsLeftPhaseInverted,
      setIsRightPhaseInverted,
      setAnalyser
    }) as AudioRenderer;
  }, [setIsReadyToPlay, setIsPlaying, setIsLeftPhaseInverted, setIsRightPhaseInverted, setAnalyser]) as AudioRenderer;

  return (
    <div>
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column">
          <Box display="flex" justifyContent="center">
            <Banner language={props.language} />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box display="flex" justifyContent="center">
            <WaveShapeImage channel="left" analyser={analyser} language={props.language} />
            <WaveShapeImage channel="right" analyser={analyser} language={props.language} />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box display="flex" justifyContent="center">
            {
              isPlaying
              ? <PauseButton onClick={() => audioRenderer.pause()} disabled={!isReadyToPlay} language={props.language}/>
              : <PlayButton onClick={() => audioRenderer.play()} disabled={!isReadyToPlay} language={props.language} />
            }
            <StopButton onClick={() => audioRenderer.stop()} disabled={!isReadyToPlay} language={props.language} />
          </Box>
        </Box>
        <Divider />
        <Box display="flex" flexDirection="column">
          <Box display="flex" justifyContent="center">
            <InvertCheckbox channel="left" checked={isLeftPhaseInverted} onChange={() => audioRenderer.invertLeftPhase()} language={props.language}/>
            <InvertCheckbox channel="right" checked={isRightPhaseInverted} onChange={() => audioRenderer.invertRightPhase()} language={props.language}/>
          </Box>
        </Box>
        <Divider />
        <Box display="flex" flexDirection="column">
          <Box display="flex" justifyContent="center">
            <FilePickerButton ready={isReadyToPlay} onLoad={audioRenderer.load.bind(audioRenderer)} language={props.language} />
          </Box>
        </Box>
      </Container>
    </div>
  );
}
