export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';
export const MAPPING_USER = {
'username':'name',
'isAdmin':'admin'
}
  
  export function apiEncode(obj,mapping){
    for (let oldKey in mapping) {
      let newKey = mapping[oldKey];
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
    }
    return obj;
  }
  
  export function apiDecode(obj,mapping){
    for (let oldKey in mapping) {
      let newKey = mapping[oldKey];
      obj[oldKey] = obj[newKey];
      delete obj[newKey];
    }
    return obj;
  }
  
