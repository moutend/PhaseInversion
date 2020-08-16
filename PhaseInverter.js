class PhaseInverter extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [{
      name: 'leftPhaseInverted',
      defaultValue: 0,
      minValue: 0,
      maxValue: 1,
      automationRate: "k-rate"
    }, {
      name: 'rightPhaseInverted',
      defaultValue: 0,
      minValue: 0,
      maxValue: 1,
      automationRate: "k-rate"
    }];
  }
  process(inputs, outputs, parameters) {
    const phaseValues = [
      parameters.leftPhaseInverted[0] > 0.0 ? -1.0 : 1.0,
      parameters.rightPhaseInverted[0] > 0.0 ? -1.0 : 1.0
    ];

    // According to the Web Audio API specification, because of up-mixing, we can assume that the number of both input and output channels are same.

    if (!inputs || inputs.length === 0 || !outputs || outputs.length === 0 || inputs.length !== outputs.length) {
      return true;
    }
    for (let node = 0; node < inputs.length; node++) {
      if (typeof inputs[node] === 'undefined' || inputs[node] === undefined || typeof outputs[node] === 'undefined' || outputs[node] === undefined) {
        return true;
      }
      for (let channel = 0; channel < inputs[node].length; channel++) {
        if (typeof inputs[node][channel] === 'undefined' || inputs[node][channel] === undefined || typeof outputs[node][channel] === 'undefined' || outputs[node][channel] === undefined) {
          return true;
        }
        for (let i = 0; i < outputs[node][channel].length; i++) {
          outputs[node][channel][i] = phaseValues[channel % 2] * inputs[node][channel][i];
        }
      }
    }

    return true;
  }
}

registerProcessor("PhaseInverter", PhaseInverter);
