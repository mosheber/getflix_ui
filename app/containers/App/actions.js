/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}


import {apiEncode,MAPPING_USER} from 'utils/constants'

export function fetchUser(username,password){
  return (dispatch)=> {
    dispatch(getUser());

    return fetch('http://localhost:8080/Users/Login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: username,password:password})
    })
    // return new Promise((resolve,reject)=>{
    //     resolve('{"id":1,"username":"haim","password":"111","isAdmin":true}');
    // })
      .then(res => {
        // throw Error('Invalid username or password');
        return res.json()//JSON.parse(res);
      })
    .then(json=>{
      var a=3;
      return dispatch(getUserSuccess(json))
  })
    .catch(err=>dispatch(getUserError(err)))
  }
}


function getUser(){
  return {
    type:'FETCHING_USER'
  }
}


function getUserSuccess(data){
  return {
    type:'FETCHING_USER_SUCCESS',
    data
  }
}

function getUserError(data){
  return {
    type:'FETCHING_USER_ERROR',
    data
  }
}

const def_user = {
  id:1,
  username:"haim",
  password:"111",
  isAdmin:true
}


export function createUser(user){
  delete user['passwordRepeated'];

  let userReady = apiEncode(user,MAPPING_USER);
  return (dispatch)=> {
    dispatch(createUserStart());

    return fetch('http://localhost:8080/Users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userReady)
    })
      .then(res => {
        return res.json();
      })
      .then(userRes=>{
        let a=2;
        if('message' in userRes && userRes['message'].includes('User is already')){
          throw 'User is already register in Getflix, try to login';
        }
        return userRes;
      })
    .then(json=>dispatch(createUserSuccess(json)))
    .catch(err=>dispatch(createUserError(err)))
  }
}



function createUserStart(){
  return {
    type:'CREATING_USER'
  }
}


function createUserSuccess(data){
  return {
    type:'CREATING_USER_SUCCESS',
    data
  }
}

function createUserError(data){
  return {
    type:'CREATING_USER_ERROR',
    data
  }
}

export function logOutUser(){
  
  return (dispatch)=> {
    dispatch({
      type:'LOGOUT_USER',
    });

    return new Promise((resolve,reject)=>{
      resolve({logout:'logout'});
    })
  }
}


export function setLocalUser(user){
  
  return (dispatch)=> {
    dispatch({
      type:'SET_LOCAL_USER',
      user
    });

    return new Promise((resolve,reject)=>{
      resolve({user:user});
    })
  }
}