import axios from 'axios';
import createHash from "create-hash";
import configs from './httpConfig';



const instance = axios.create({
  baseURL:"http://192.168.55.105:80/",
  // transformRequest: [function(data){
  //   //在这里根据自己的需求改变数据
  //   console.warn(data);
  //   return JSON.stringify(data);
  // }]
})

function encrypt (type, str) {
  return createHash(type).update(str).digest('hex')
}


function fixedEncodeURIComponent (str) {
  return encodeURIComponent(str).replace(/%20/gi, "+").replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16).toLocaleUpperCase();
  });
}

function traverse(obj, arr) {
  let keyArray = Object.keys(obj);
  if (!keyArray.length) return [];
  for (const k in obj) {
    let v = obj[k];
    if (Array.isArray(v)) continue;
    if (!v && v !== 0 && v !== false) continue;
    if (typeof v === "object") {
      // console.warn((v.constructor.name, v));
      if (v.__proto__._isBigNumber) {
        arr.push(`${k}=${JSON.stringify(v)}`);
        continue;
      }
      traverse(v, arr);
      continue;
    }
    arr.push(`${k}=${fixedEncodeURIComponent(v)}`)
    // arr.push(`${k}=${encodeURIComponent(v).replace(/%20/gi, "+").replace(/(!)|(')|(\()|(\))|(\*)/gi, function(item) { return "%" + item.charCodeAt(0).toString(16).toLocaleUpperCase() })}`);
  }
  return arr;
}

function httpPreHandle(conf, params){
  let { method, url, action, needToken} = configs[conf],
        header = {};

  let paramsObj = {a: action};
    // 是否有参数
    if (params) {
      paramsObj["d"] = params;
    }
    if (needToken) {
      header = {'token': params.token};
      delete params.token;
    }
    //生成基本数据
    paramsObj["ts"] = parseInt(new Date() / 1000);
    paramsObj["appId"] = 0;
    // 数字签名
    let sigArr = [],
      secretKey =
        "70f239020d3a28b8d24ba1706f2dd7c03dcaa2fa5e7a077f1f517e5f2d3a68a1";
    paramsObj && traverse(Object.assign(paramsObj, header), sigArr);
    let sigString =
      sigArr.sort((a, b) => (a > b && 1) || -1).join("&") + secretKey; //生成需要摘要的字符
    // console.warn(sigArr, sigString)
    paramsObj["sig"] = encrypt(
      "sha256",
      encrypt("md5", encrypt("md5", sigString))
    ).toLowerCase(); // 生成摘要

  return {
    method,
    url,
    data: JSON.stringify(paramsObj),
  };
}




export default function http(conf, params){
  let req = httpPreHandle(conf, params)
  return new Promise((resolve, reject)=>{
    instance(req).then(res => resolve(res.data)).catch(err=>reject(err))
  })
};