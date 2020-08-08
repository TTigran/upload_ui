import * as types from './types';
import axios from 'axios';

const origin = "http://localhost:4000";

export const fetchProfileRequest = () => {
  return {type: types.FETCH_PROFILE_REQUEST, fetching: true};
}

export const fetchProfileAction = profile => {
  return {type: types.FETCH_PROFILE_COMPLETE, profile, fetching: false};
}

export const fetchProfile = (data) => dispatch => {
  dispatch(fetchProfileRequest());
  return axios.post(origin+`/upload`,data,{
    headers: {'Content-Type': 'application/json',}
  }).then(res => {
    dispatch(fetchProfileAction(res.data));
    console.log(res.data,"Names In redux")
    return res.data;
  });
}

