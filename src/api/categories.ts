import ky from '../extendedKy';
import Constants from 'expo-constants';

const api_url = Constants.manifest.extra.api_url;

export const getCategories = () => {
    return ky.get(`${api_url}/categories`).json();
};