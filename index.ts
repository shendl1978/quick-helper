import { isPrimitive } from "util";

export const name='quick-helper'

export function numberToFixNumber(val:number,length:number){
    let fixNumber=``
    let valStr=String(val)
    let len =valStr.length
    if(len>=length){
        fixNumber=valStr.substring(len-length);
    }else{
        fixNumber=valStr
        for(; len < length; len = fixNumber.length) {
            fixNumber = "0" + fixNumber;            
        }
    }

    
    return fixNumber;
    
}

export function dateToIsoformat(date:Date){
    const     dateStr=`${date.getFullYear()}-${numberToFixNumber(date.getMonth()+1,2)}-${numberToFixNumber(date.getDate(),2)}`

    return dateStr
}



export function datetimeToIsoformat(date:Date){
//     YYYY-MM-DDTHH:MM:SS.ffffff，如果 microsecond 不为 0

// YYYY-MM-DDTHH:MM:SS，如果 microsecond 为 0
    let dateStr=``
    if(date.getMilliseconds()>0){
        dateStr=`${date.getFullYear()}-${numberToFixNumber(date.getMonth()+1,2)}-${numberToFixNumber(date.getDate(),2)}T${numberToFixNumber(date.getHours(),2)}:${numberToFixNumber(date.getMinutes(),2)}:${numberToFixNumber(date.getSeconds(),2)}.${numberToFixNumber(date.getMilliseconds(),6)}`

    }else{
        dateStr=`${date.getFullYear()}-${numberToFixNumber(date.getMonth()+1,2)}-${numberToFixNumber(date.getDate(),2)}T${numberToFixNumber(date.getHours(),2)}:${numberToFixNumber(date.getMinutes(),2)}:${numberToFixNumber(date.getSeconds(),2)}`

    }
    return dateStr
}

export let logThreshold='info'

function isShowLog(logLevel:string){
    let ret=false;
    if(logLevel!==undefined || logLevel!==null){
        logLevel=logLevel.toLowerCase()
    }else{
        if(logThreshold=="debug"){
            ret=true;
        }
        return ret;
    }
    
    switch(logThreshold){
        case "debug":
            ret = true
            break;
        case "info":
            if(logLevel in {"info":true,"warn":true,"error":true}){
                ret=true;
            }
            break;
        case "warn":
            if(logLevel in{"warn":true,"error":true}){
                ret=true;
            }
            break;
        case "error":
            if(logLevel =="error"){
                ret=true;
            }
            break;
        default:
            break;

    }
    return ret;

}

export let logStrs:string[]=[]

//let myLog=jsonLog({logApp:"myApp",logName:"structLog-start",logMsg:{"name":"shendl",'age':42}})
export function jsonLog({logApp,logName,logMsg,logVersion='1.0.0',logLevel='info'}:{
    logApp:string,logName:string,logMsg:any,logVersion?:string,logLevel?:string
}){ 
    logLevel=logLevel.toLowerCase()
    if(isShowLog(logLevel)==false){
        return '';
    }

    let userAgent=''
    let  browserLanguage=''
    let referrer= '' 

    if(typeof navigator !== "undefined" && navigator !== null){
          userAgent=navigator.userAgent
           browserLanguage=navigator.language
    }
    if(typeof document !== "undefined" && document !== null){
          referrer= document.referrer
 
    }
    let logObj={
        "logLevel":logLevel,

        "logTime":datetimeToIsoformat(new Date()),
        "logApp":logApp,
        "logName":logName,
        "logVersion":logVersion,
        "userAgent": userAgent,
       
       "browserLanguage": browserLanguage,
       "referrer": referrer,
        "logMsg":logMsg,
        "ip":""

    }
    const logStr=JSON.stringify(logObj)
    
    console.log(logStr)
    logStrs.push(logStr)
    return logStr;

}
export function jsonInfo({logApp,logName,logMsg,logVersion='1.0.0',logLevel='info'}:{
    logApp:string,logName:string,logMsg:any,logVersion?:string,logLevel?:string
}){
    return jsonLog({logApp,logName,logMsg,logVersion,logLevel})
}
export function jsonDebug({logApp,logName,logMsg,logVersion='1.0.0',logLevel='debug'}:{
    logApp:string,logName:string,logMsg:any,logVersion?:string,logLevel?:string
}){
    return jsonLog({logApp,logName,logMsg,logVersion,logLevel})
}
export function jsonWarn({logApp,logName,logMsg,logVersion='1.0.0',logLevel='warn'}:{
    logApp:string,logName:string,logMsg:any,logVersion?:string,logLevel?:string
}){
    return jsonLog({logApp,logName,logMsg,logVersion,logLevel})
}
export function jsonError({logApp,logName,logMsg,logVersion='1.0.0',logLevel='error'}:{
    logApp:string,logName:string,logMsg:any,logVersion?:string,logLevel?:string
}){
    return jsonLog({logApp,logName,logMsg,logVersion,logLevel})
}

//test
// logThreshold='debug'
// console.log(isShowLog('debug'))
// console.log(isShowLog('Info'))
// console.log(isShowLog('warn'))
// console.log(isShowLog('error'))
// logThreshold='info'
// console.log(isShowLog('debug'))
// console.log(isShowLog('Info'))
// console.log(isShowLog('warn'))
// console.log(isShowLog('error'))
// logThreshold='warn'
// console.log(isShowLog('debug'))
// console.log(isShowLog('info'))
// console.log(isShowLog('WARN'))
// console.log(isShowLog('ErroR'))
// logThreshold='error'
// console.log(isShowLog('debug'))
// console.log(isShowLog('info'))
// console.log(isShowLog('warn'))
// console.log(isShowLog('error'))
// logThreshold='debug'
// console.log(isShowLog('debdg'))
// console.log(isShowLog('infdo'))
// console.log(isShowLog('wardn'))
// console.log(isShowLog('errodr'))
// logThreshold='error'
// jsonLog({logApp:"myApp",logName:"structLog-start",logMsg:123})
// jsonDebug({logApp:"myApp",logName:"structLog-End",logMsg:'Hello world!'})
// jsonInfo({logApp:"myApp",logName:"structLog-End",logMsg:'Hello world!'})
// jsonWarn({logApp:"myApp",logName:"structLog-End",logMsg:'Hello world!'})
// jsonError({logApp:"myApp",logName:"structLog-End",logMsg:'Hello world!'})
// let myLog=jsonLog({logApp:"myApp",logName:"structLog-start",logMsg:{"name":"shendl",'age':42}})
// console.log(`1:${myLog}`)
// //  myLog=fixForJSONstringify(myLog)
// //  console.log(`2:${myLog}`)
//  let myObj=JSON.parse(myLog)
//  console.log(`3:${myObj}`)
//  console.log(`4:${JSON.stringify(myObj)}`)



// let myStr=numberToFixNumber(123456,6)
// console.log(myStr)
// let myDate=new Date()
// let myDateStr=dateToIsoformat(myDate)
// console.log(myDateStr)
// myDateStr=datetimeToIsoformat(myDate)
// console.log(myDateStr)




