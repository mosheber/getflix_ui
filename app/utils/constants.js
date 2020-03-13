export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';
export const MAPPING_USER = {
'username':'name',
'isAdmin':'admin'
}
export const MAPPING_MOVIE = {
'publishDate':'insertionTime',
'img':'image'
} 
export const MAPPING_COMMENT = {
  'text':'content',
  }
  
export const CATEGORY_MAPPING = {
  'Comedy':3,
  'Action':4,
  'Drama':5,
  'Thriller':6,
  'Family':7,
  'Science-Fiction':8
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
  
