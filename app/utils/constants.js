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

export function getDateString(today){
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  return yyyy+'-'+mm+'-'+dd;
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

export function validateObj(obj,fields){
  for(let i=0;i<fields.length;i++){
    let field = fields[i];
    if(!(field['name'] in obj)){
      return {'succeeded':false,'message':`Field ${field['name']} is missing. Please fill it.`};
    }
    if(!field['check'](obj[field['name']])){
      return {'succeeded':false,'message':`Field ${field['name']} is invalid: ${field['validMessage']}`};
    }
  }
  return {'succeeded':true,'message':'success'};
}

export function validateString(key){
  return { 'name':key, 'check': x=>x!='','validMessage':'Needs to be not empty.'};
}

export function validateInt(key){
  return { 'name':key, 'check': x=>/^\+?(0|[1-9]\d*)$/.test(x),'validMessage':'Needs positive number.'};
}

export function validateImage(key){
  return { 'name':key, 'check': x=>x.includes('data'),'validMessage':'Needs valid image'};
}

export function validatePassword(key){
  return { 'name':key, 'check': x=>/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(x),'validMessage':'Needs valid image'};
}
