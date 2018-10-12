import * as React from 'react';

interface Props {
  path?: string
  history?: any
}

let defaultDb = `{"sounds":[{"id":"501862","name":"event-1","code":"var vol = new Tone.Volume(10).toMaster();\nlet scale = [\"B3\", \"C#4\", \"D#4\", \"F#4\", \"G#4\"]\nvar synth = new Tone.FMSynth().chain(vol);\n\nvar c = new Tone.Event(function(time, note){\n  console.log(note);\n  synth.triggerAttackRelease(note, '4n', time)\n}, [\"D4\", \"E4\", \"F4\"]);\n\nvar o = {\n\tvars:[\n      ['vol', vol.volume, 22, -100, 100]\n    ]\n}","edited":true},{"id":"272575","name":"testWOptions","code":"var vol = new Tone.Volume(10).toMaster();\nlet scale = [\"B3\", \"C#4\", \"D#4\", \"F#4\", \"G#4\"]\nvar synth = new Tone.FMSynth().chain(vol);\nvar c = new Tone.Pattern(function(time, note){\n console.log(note);\n synth.triggerAttackRelease(note, '4n', time)\n}, scale, \"upDown\");\nc.interval = \"8n\";\nvar o = {\n\tvars:[\n      ['vol', vol.volume, 20, -100, 100]\n    ]\n}","edited":false},{"id":"742135","name":"pattern-1","code":"// new code here\nvar vol = new Tone.Volume(10).toMaster();\nlet scale = [\"B3\", \"C#4\", \"D#4\", \"F#4\", \"G#4\"]\nvar synth = new Tone.FMSynth().chain(vol);\nvar c = new Tone.Pattern(function(time, note){\n console.log(note);\n synth.triggerAttackRelease(note, '4n', time)\n}, scale, \"upDown\");\nc.interval = \"8n\";\nvar o = {\n\tvars:[\n      ['vol', vol.volume, 22, -100, 100]\n    ]\n}","edited":false}],"parts":[{"id":"68120","name":"22222","sounds":[],"active":false},{"id":"63894","name":"part1","sounds":["501862","272575","742135"],"active":true}],"controls":[{"id":"272575","controls":[{"id":"vol","name":"vol","value":28,"min":-100,"max":100,"step":1}]},{"id":"501862","controls":[{"id":"vol","name":"vol","value":-11,"min":-100,"max":100,"step":1}]}],"settings":[{"type":"event","value":48,"eventName":"controls.knob1"},{"type":"event","value":49,"eventName":"controls.knob2"},{"type":"event","value":50,"eventName":"controls.knob3"},{"type":"event","value":51,"eventName":"controls.knob4"},{"type":"event","value":52,"eventName":"controls.knob5"},{"type":"event","value":"86","eventName":"controls.knob6"},{"type":"event","value":54,"eventName":"controls.knob7"},{"type":"event","value":55,"eventName":"controls.knob8"},{"type":"event","value":56,"eventName":"controls.knob9"},{"type":"event","value":57,"eventName":"controls.knob10"},{"type":"event","value":58,"eventName":"soundsManager.list.up"},{"type":"event","value":59,"eventName":"soundsManager.list.down"},{"type":"event","value":60,"eventName":"soundsManager.list.addToPart"},{"type":"event","value":61,"eventName":"PartSoundsManager.list.up"},{"type":"event","value":62,"eventName":"PartSoundsManager.list.down"},{"type":"event","value":63,"eventName":"PartSoundsManager.sound.pause"},{"type":"event","value":64,"eventName":"PartSoundsManager.sound.delete"},{"type":"event","value":65,"eventName":"PartSoundsManager.sound.play"},{"type":"event","value":61,"eventName":"SoundPartManager.list.up"},{"type":"event","value":62,"eventName":"SoundPartManager.list.down"},{"type":"event","value":63,"eventName":"SoundPartManager.sound.pause"},{"type":"event","value":64,"eventName":"SoundPartManager.sound.delete"},{"type":"event","value":65,"eventName":"SoundPartManager.sound.play"}],"events":[{"id":"controls","action":"knob1","value":10},{"id":"PartSoundsManager","action":"list.down","value":2},{"id":"soundsManager","action":"list.up","value":1}],"settingsOpen":false,"midiDebugOpen":true}`

class DbInitPage extends React.Component<Props, {}> {
  
  constructor(props) {
    super(props)
    window.localStorage.setItem('DawPage', defaultDb)
    window.localStorage.setItem('e', defaultDb)
    setTimeout(() => {
      this.props.history.push('/daw')
    }, 2000)
  }

  public render() {
    return (
        <div>
            <h3>Init Default DB page</h3>
            <p> inject some default sounds to get started with...</p>
        </div>
    );
  } 
}

  
  
export default DbInitPage;
  