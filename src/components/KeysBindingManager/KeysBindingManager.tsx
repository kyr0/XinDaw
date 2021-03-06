import * as React from 'react';
import { updateArrayItem, mergeArraysByProp } from 'src/helpers/arrayHelper';
import { ComponentPropsListener } from 'src/Objects/ComponentPropsListener';
import { iSettingsItem } from 'src/managers/types/settings.type';
import { Input } from 'src/styles/components';
import styled from 'react-emotion';
import { consts } from 'src/constants';


interface Props {
    onUpdate: Function
    settings: iSettingsItem[]
}

interface State {
    settings: iSettingsItem[],
}

export default class KeysBindingManager extends React.Component<Props,State> {

    propsListener: ComponentPropsListener

    constructor(props) {
        super(props)
        
        this.state = {
            settings: [
                {type: 'event', value:-1, key: 'controls.knob1'},
                {type: 'event', value:-1, key: 'controls.knob2'},
                {type: 'event', value:-1, key: 'controls.knob3'},
                {type: 'event', value:-1, key: 'controls.knob4'},
                {type: 'event', value:-1, key: 'controls.knob5'},
                {type: 'event', value:-1, key: 'controls.knob6'},
                {type: 'event', value:-1, key: 'controls.knob7'},
                {type: 'event', value:-1, key: 'controls.knob8'},
                {type: 'event', value:-1, key: 'controls.knob9'},
                {type: 'event', value:-1, key: 'controls.knob10'},

                {type: 'event', value:-1, key: `${consts.comps.soundsLibrary}.list.up`},
                {type: 'event', value:-1, key: `${consts.comps.soundsLibrary}.list.down`},
                {type: 'event', value:-1, key: `${consts.comps.soundsLibrary}.list.addToPart`},

                {type: 'event', value:-1, key: `${consts.comps.partSoundsManager}.list.up`},
                {type: 'event', value:-1, key: `${consts.comps.partSoundsManager}.list.down`},
                {type: 'event', value:-1, key: `${consts.comps.partSoundsManager}.sound.pause`},
                {type: 'event', value:-1, key: `${consts.comps.partSoundsManager}.sound.delete`},
                {type: 'event', value:-1, key: `${consts.comps.partSoundsManager}.sound.play`},
                {type: 'event', value:-1, key: `${consts.comps.partSoundsManager}.sound.toggle`},
                
                {type: 'event', value:-1, key: `${consts.comps.partSoundsManager}.play.sound1`},
                {type: 'event', value:-1, key: `${consts.comps.partSoundsManager}.play.sound2`},
                {type: 'event', value:-1, key: `${consts.comps.partSoundsManager}.play.sound3`},
                {type: 'event', value:-1, key: `${consts.comps.partSoundsManager}.play.sound4`},
                {type: 'event', value:-1, key: `${consts.comps.partSoundsManager}.play.sound5`},
                {type: 'event', value:-1, key: `${consts.comps.partSoundsManager}.play.sound6`},
                {type: 'event', value:-1, key: `${consts.comps.partSoundsManager}.play.sound7`},
                {type: 'event', value:-1, key: `${consts.comps.partSoundsManager}.play.sound8`},
                {type: 'event', value:-1, key: `${consts.comps.partSoundsManager}.play.sound9`},
                {type: 'event', value:-1, key: `${consts.comps.partSoundsManager}.play.sound10`},
                
                {type: 'settings', value:-1, key: `${consts.settings['keyboard.stateCode.pushDown']}`},
                {type: 'settings', value:-1, key: `${consts.settings['keyboard.stateCode.pushUp']}`},
                {type: 'settings', value:-1, key: `${consts.settings['button.stateCode.pushDown']}`},
                {type: 'settings', value:-1, key: `${consts.settings['button.stateCode.pushUp']}`},
                {type: 'settings', value:-1, key: `${consts.settings['knob.stateCode.change']}`},

                {type: 'settings', value:-1, key: `${consts.settings['knob.config.minValue']}`},
                {type: 'settings', value:-1, key: `${consts.settings['knob.config.maxValue']}`},
            ],
        }

        this.propsListener = new ComponentPropsListener({
            'settings': () => {
                
                // let settings = this.state.settings // to reinit settings
                // let settings = mergeArraysByProp('eventName', this.state.settings, this.props.settings)
                // this.setState({settings: settings})
                // this.setState({settings: this.props.settings})
            },
        })
    }

    initializeAppsSettings = () => {

        // console.log('initializeAppsSettings', this.props.settings);
        
        // if no settings, init with the default ones
        if (typeof this.props.settings === 'undefined' || this.props.settings.length === 0) {
            console.log('[SETTING] no settings found, init with the default ones', this.state.settings);
            this.props.onUpdate(this.state.settings)
        } 
        
        // else if (this.props.settings.length !== this.state.settings.length) {
        //     // otherwise, merge existing settings with default ones to be sure to have everything
        //     let settings = mergeArraysByProp('eventName', this.props.settings, this.state.settings)
        //     console.log('[SETTING] seems some settings are missing, adding the ones missing by default values', this.props.settings, this.state.settings, settings.length);
        //     this.props.onUpdate(settings)
        //     this.setState({settings: settings})
        // }
        // else {
        //     // update the state with the props (which are from LStorage)
        //     this.setState({settings: this.props.settings})
        // }
        // console.log(this.props.settings.length, this.state.settings.length);
    }
    
    componentDidUpdate = () => { 
        this.propsListener.listen(this.props) 
    }

    changeItem = (e:any, item:iSettingsItem) => {
        item.value = parseInt(e.target.value)
        this.props.onUpdate(updateArrayItem('key')(item)(this.props.settings))
    }

    render() {
        this.initializeAppsSettings()  

        return (
           <Styled>
               {
                    this.props.settings.map((item, index) => (
                        <div className="config-option" key={index}>
                            <label>{item.key} - {item.type}</label> 
                            <Input type="number" value={item.value} onChange={e =>{this.changeItem(e, item)}} />
                        </div>
                    ))
                }
           </Styled>
        )
    }   
}

const Styled = styled('div')`
`