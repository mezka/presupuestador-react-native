import ky from 'ky';
//import Constants from 'expo-constants';
import User from '../types.ts';

//const api_url = Constants.manifest.extra.api_url;
const api_url = 'http://localhost:3030';

export const signupUser = (user: User) => {
    return ky.post(`${api_url}/users`, { json: user }).json();
};

export const loginUser = (user: User) => {
    return ky.post(`${api_url}/authentication`, { json: {...user, strategy: 'local'} }).json();
};