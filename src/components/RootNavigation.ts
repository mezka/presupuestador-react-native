import { createRef } from 'react';

export const navigationRef = createRef();

const authorizedOnlyScreens = ['Home'];

export function navigate(name, params) {
  if (authorizedOnlyScreens.includes(name)) {
    params.token ? navigationRef.current?.navigate(name, params) : console.log('No autorizado');
  } else {
    navigationRef.current?.navigate(name, params);
  }
}