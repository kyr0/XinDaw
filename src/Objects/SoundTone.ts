import { prepareCode } from "../managers/code/prepareCode";
import { evalCode } from "../managers/code/evalCode";
import config from "../config";
import Tone from 'tone'
import {each} from 'lodash'
import { iControlVar } from "../managers/types/control.type";
import { analyzeCode } from "src/managers/code/analyzeCode";

interface optionsSoundTone {
    vars: iControlVar[] 
}


/** SoundTone is an object belonging to Sound Component that contains and manages a Tone object  */
export class SoundTone {

    private code:string

    private tone:any
    private elementsToDispose:any[]
    
    public options:optionsSoundTone
    public type:string
    public error:null|string

    constructor(code:string){
        this.code = code
        this.createTone(this.code)
        this.type = this.getToneType(this.tone)

        config.debug.soundTone && console.log('[SOUNDTONE] soundTone initialized', {type:this.type, code:JSON.stringify(this.code)})
    }

    createTone(code:string):any {
        let codeReady = prepareCode(code)
        if (!codeReady) return

        let codeLiveRaw = evalCode(codeReady)
        if (codeLiveRaw.status === 'err') return this.error = codeLiveRaw.body
        else this.error = null

        this.tone = codeLiveRaw.body.c, 
        this.elementsToDispose = codeLiveRaw.body.e, 
        this.options = codeLiveRaw.body.o
    }

    //
    // LIFECYCLE FUNCTIONS
    //

    play() {
        this.type === 'loop' && Tone.Transport.scheduleOnce(t => {
            this.tone.mute = false
            this.tone.start(0)
        }, 1)
    }
    
    pause() {
        this.type === 'loop' && Tone.Transport.scheduleOnce(t => { this.tone.mute = true }, 1)
        if(this.type === 'transport-event') this.tone.mute = true
    }

    destroy() {
        this.type === 'loop' && Tone.Transport.scheduleOnce(t => { this.tone.stop().dispose() }, 1)
        this.type === 'transport-event' && Tone.Transport.clear(this.tone)
    }

    updateControls(controlVars:iControlVar[]) {
        if (!this.options || !this.options.vars) return
        each(controlVars, varControl => {
            each(this.options.vars, varTone => {
                if (varControl.id === varTone.id) {
                    // console.log(`controlvar modif sound ${varTone.name} to ${varControl.value}`)
                    varTone.target.value = varControl.value
                }
            })
        })
    }

    //
    // SUPPORT FUNCTIONS
    // 

    getToneType(tone:any) {
       return analyzeCode(this.code).toneType
    }
}