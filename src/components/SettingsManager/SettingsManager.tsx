import * as React from 'react';
import { updateArrayItem, mergeArraysByProp } from 'src/helpers/arrayHelper';
import { ComponentPropsListener } from 'src/Objects/ComponentPropsListener';
import { cx } from 'emotion';
import s from 'src/styles';
import { iSettingsItem } from 'src/managers/types/settings.type';
import { BlockTitle, Input } from 'src/styles/components';


interface Props {
    onUpdate: Function
    settings: iSettingsItem[]
}

interface State {
    settings: iSettingsItem[],
    opened: boolean
}

export default class SettingsManager extends React.Component<Props,State> {

    propsListener: ComponentPropsListener

    constructor(props) {
        super(props)
        this.state = {
            settings: [
                {type: 'event', value:48, eventName: 'controls.knob1'},
                {type: 'event', value:49, eventName: 'controls.knob2'},
                {type: 'event', value:50, eventName: 'controls.knob3'},
                {type: 'event', value:51, eventName: 'controls.knob4'},
                {type: 'event', value:52, eventName: 'controls.knob5'},
                {type: 'event', value:53, eventName: 'controls.knob6'},
                {type: 'event', value:54, eventName: 'controls.knob7'},
                {type: 'event', value:55, eventName: 'controls.knob8'},
                {type: 'event', value:56, eventName: 'controls.knob9'},
                {type: 'event', value:57, eventName: 'controls.knob10'},

                {type: 'event', value:58, eventName: 'soundsManager.list.up'},
                {type: 'event', value:58, eventName: 'soundsManager.list.down'},
                {type: 'event', value:60, eventName: 'soundsManager.list.addToPart'},

                {type: 'event', value:61, eventName: 'SoundPartManager.list.up'},
                {type: 'event', value:62, eventName: 'SoundPartManager.list.down'},
                {type: 'event', value:63, eventName: 'SoundPartManager.sound.pause'},
                {type: 'event', value:64, eventName: 'SoundPartManager.sound.delete'},
                {type: 'event', value:65, eventName: 'SoundPartManager.sound.play'},
            ],
            opened: false
        }

        this.propsListener = new ComponentPropsListener({
            'settings': () => {
                // let settings = this.state.settings // to reinit settings
                let settings = mergeArraysByProp('eventName', this.state.settings, this.props.settings)
                this.setState({settings: settings})
            },
        })
    }
    
    componentDidUpdate = () => { this.propsListener.listen(this.props) }

    changeItem = (e:any, item:iSettingsItem) => {
        item.value = parseInt(e.target.value)
        this.props.onUpdate(updateArrayItem('eventName')(item)(this.state.settings))
    }

    render() {
        return (
           <div>
               <BlockTitle onClick={()=>{this.setState({opened: !this.state.opened})}}>settings</BlockTitle>
               <div className={cx(s.show(this.state.opened))}>
                   {
                       this.state.settings.map((item, index) => (
                           <div key={index}>
                                <label>{item.eventName} - {item.type}</label> 
                                <Input type="number" value={item.value} onChange={e =>{this.changeItem(e, item)}} />
                           </div>
                       ))
                   }
               </div>
           </div>
        )
    }   
}
