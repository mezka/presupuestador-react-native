import ky from '../extendedKy';
import User from '../types.ts';
import Constants from 'expo-constants';

const api_url = Constants.manifest.extra.api_url;

export const signupUser = (user: User) => {
    return ky.post(`${api_url}/users`, { json: user }).json();
};

export const loginUser = (user: User) => {
    return ky.post(`${api_url}/authentication`, { json: {...user, strategy: 'local'} }).json();
};