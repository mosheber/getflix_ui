export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';
export const USER_LOCAL_KEY = 'getflixUser';
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

  export function checkUserLocal(props){
    let user = localStorage.getItem(USER_LOCAL_KEY);
    if(user){
      let userObj = JSON.parse(user);
      return props.setLocalUser(userObj);
    }else{
      return null;
    }
  }

  export function checkUserGeneral(){
    let user = localStorage.getItem(USER_LOCAL_KEY);
    if(user){
      return true;
    }else{
      return false;
    }
  }

export function validateObj(obj,fields){
  for(let i=0;i<fields.length;i++){
    let field = fields[i];
    if(!(field['name'] in obj)){
      return {'succeeded':false,'message':`Field ${field['name']} is missing. Please fill it.`};
    }
    if(!field['check'](obj[field['name']],obj)){
      return {'succeeded':false,'message':`Field ${field['name']} is invalid: ${field['validMessage']}`};
    }
  }
  return {'succeeded':true,'message':'success'};
}

export function validateString(key){
  return { 'name':key, 'check': (x,obj)=>x!='','validMessage':'Needs to be not empty.'};
}

export function validateInt(key){
  return { 'name':key, 'check': (x,obj)=>/^\+?(0|[1-9]\d*)$/.test(x),'validMessage':'Needs positive number.'};
}

export function validateImage(key){
  return { 'name':key, 'check': (x,obj)=>x.includes('data'),'validMessage':'Needs valid image'};
}

export function validatePassword(key){
  return { 'name':key, 'check': (x,obj)=>/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(x),
  'validMessage':'Password needs to contain at least one lowercase letter, one uppercase, and one number.'};
}
export function validatePasswordRepeat(key){
  return { 'name':key, 'check': (x,obj)=>x==obj['password'],'validMessage':'Passwords must match'};
}