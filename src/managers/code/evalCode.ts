import { filter, each } from 'lodash'
import config from 'src/config';
import { stringToId } from 'src/helpers/stringHelper';
import { iControlVar } from 'src/managers/types/control.type';

export let evalCode = (code) => {
    try {
        config.debug.codeEval && console.log('[CODEEVAL] eval => start :', {code:code})
        let result =  eval(`(function self(){${code}}())`);
        let error = `EDITOR RESULT ERROR => the code should contain one c(code) var`
        
        if(!result || typeof result !== 'object') return {status: 'err', body: error}
        if(!result.c) return {status: 'err', body: error}
        if(!result.e) return {status: 'err', body: error}
        if(result.o && result.o.vars) {
            let error = {status: 'err', body: 'EDITOR RESULT ERROR => each result.o.vars structure should be [NAMEVAR, VAR, MINVAL, MAXVAL]'}
            if (filter(result.o.vars, v => v instanceof Array).length !== result.o.vars.length) return error
            let newVars:iControlVar[] = []
            each(result.o.vars, variable => {
                let newVar:iControlVar = {
                    id: stringToId(variable[0]), 
                    name: variable[0], 
                    target: variable[1], 
                    value: variable[2] || 0, 
                    min: variable[3], 
                    max: variable[4],
                    step: variable[5] || 1,
                }
                newVars.push(newVar)
            })
            result.o.vars = newVars
        }
        config.debug.codeEval && console.log('[CODEEVAL] eval => success :', {result:result})
        return {status: 'ok', body: result}
        
    } catch (e) {
        let error = `EDITOR SYNTAX ERROR => ${e.message}`
        console.warn('[CODEEVAL] eval => fail :', {result:e})
        return {status: 'err', body: error}
    }
}
