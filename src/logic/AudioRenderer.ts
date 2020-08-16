interface OnAudioProcessParam {
  bufferSize: number;
  phaseValues: number[];
}

function onAudioProcess(this: OnAudioProcessParam, event: AudioProcessingEvent): any {
  // According to the Web Audio API specification, because of up-mixing, we can assume that the number of both input and output channels are same.
  const numberOfChannels: number = event.inputBuffer.numberOfChannels;

  const is : Float32Array[] = [];
  const os : Float32Array[] = [];

  for (let channel: number = 0; channel < numberOfChannels; channel++) {
    is[channel] = event.inputBuffer.getChannelData(channel);
    os[channel] = event.outputBuffer.getChannelData(channel);
  }
  for (let i: number = 0; i < this.bufferSize; i++) {
    for (let channel: number = 0; channel < numberOfChannels; channel++) {
      os[channel][i] = this.phaseValues[channel % 2] * is[channel][i];
    }
  }
}

interface AudioRendererOption {
  setIsReadyToPlay: (a: boolean) => void;
  setIsPlaying: (a: boolean) => void;
  setIsLeftPhaseInverted: (a: boolean) => void;
  setIsRightPhaseInverted: (a: boolean) => void;
  setAnalyser: (a: AnalyserNode | null) => void;
}

export default class AudioRenderer {
  ac: AudioContext | null;
  buffer: AudioBuffer | null;
  source: AudioBufferSourceNode | null;
  processor: AudioWorkletNode | ScriptProcessorNode | null;
  analyser: AnalyserNode | null;

  isReadyToPlay: boolean;
  isPlaying: boolean;
  phaseValues: number[];
  playbackDuration: number;
  totalPlaybackDuration: number;

  setIsReadyToPlay: (a: boolean) => void;
  setIsPlaying: (a: boolean) => void;
  setIsLeftPhaseInverted: (a: boolean) => void;
  setIsRightPhaseInverted: (a: boolean) => void;
  setAnalyser: (a: AnalyserNode | null) => void;

  constructor(opt: AudioRendererOption) {
    this.ac = null;
    this.buffer = null;
    this.source = null;
    this.processor = null;
    this.analyser = null;

    this.isReadyToPlay = false;
    this.isPlaying = false;
    this.phaseValues = [1.0, 1.0];
    this.playbackDuration = 0;
    this.totalPlaybackDuration= 0;

    this.setIsReadyToPlay = opt.setIsReadyToPlay;
    this.setIsPlaying = opt.setIsPlaying;
    this.setIsLeftPhaseInverted= opt.setIsLeftPhaseInverted;
    this.setIsRightPhaseInverted= opt.setIsRightPhaseInverted;
    this.setAnalyser = opt.setAnalyser;
  }
  async load(data: ArrayBuffer) {
    if (this.isPlaying) {
      this.stop();
    }

    this.ac = null;
    this.buffer = null;

    this.setIsReadyToPlay(this.isReadyToPlay = false);
    this.setAnalyser(null);

    try {
      const SupportedAudioContext: any = window.AudioContext || (window as any).webkitAudioContext;

      // Use the custom constructor because 'webkit' prefix is required on the Safari.
      this.ac = new SupportedAudioContext() as AudioContext;

      this.ac.decodeAudioData(data, (buffer: AudioBuffer) => {
        this.buffer = buffer;
        this.setIsReadyToPlay(this.isReadyToPlay = true);
      });
    } catch (e) {
      throw (e);
    }
  }
  async prepare() {
    if (!this.ac || !this.buffer) {
      return;
    }
    if (this.ac.audioWorklet) {
      await this.ac.audioWorklet.addModule("PhaseInverter.js");

      this.processor = new AudioWorkletNode(this.ac,"PhaseInverter");
    } else {
      this.processor = this.ac.createScriptProcessor(4096);

      this.processor.onaudioprocess = onAudioProcess.bind({bufferSize: this.processor.bufferSize, phaseValues: this.phaseValues});
    }

    this.source = this.ac.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.onended = () => {
      if (!this.isPlaying) {
        return;
      }

      this.stop();
    };

    this.analyser = this.ac.createAnalyser();

    this.source.connect(this.processor);
    this.processor.connect(this.analyser);
    this.analyser.connect(this.ac.destination);

    this.setAnalyser(this.analyser);
  }
  async play() {
    await this.prepare();

    if (!this.ac || !this.source) {
      return;
    }

    this.source.start(0, this.totalPlaybackDuration);

    this.playbackDuration = this.ac.currentTime;

    this.setIsPlaying(this.isPlaying = true);
  }
  pause() {
    if (!this.ac) {
      return;
    }

    this.playbackDuration = this.ac.currentTime - this.playbackDuration;
    this.totalPlaybackDuration += this.playbackDuration;
    this.setIsPlaying(this.isPlaying = false);

    if (!this.source) {
      return;
    }

    this.source.stop();
  }
  stop() {
    this.playbackDuration = 0;
    this.totalPlaybackDuration = 0;
    this.setIsPlaying(this.isPlaying = false);

    if (!this.source) {
      return;
    }

    this.source.stop();
  }
  invertLeftPhase() {
    this.phaseValues[0] = this.phaseValues[0] === 1.0 ? -1.0 : 1.0;
    this.setIsLeftPhaseInverted(this.phaseValues[0] === -1.0);

    if (!this.processor || this.processor instanceof ScriptProcessorNode) {
      return;
    }

    const left: AudioParam | undefined = this.processor.parameters.get("leftPhaseInverted");

    if (!left) {
      return;
    }

    left.value = this.phaseValues[0];
  }
  invertRightPhase() {
    this.phaseValues[1] = this.phaseValues[1] === 1.0 ? -1.0 : 1.0;
    this.setIsRightPhaseInverted(this.phaseValues[1] === -1.0);

    if (!this.processor || this.processor instanceof ScriptProcessorNode) {
      return;
    }

    const right: AudioParam | undefined = this.processor.parameters.get("rightPhaseInverted");

    if (!right) {
      return;
    }

    right.value = this.phaseValues[1];
  }
}
