// statePersistence.ts
import { setItem, getItem } from './mmkvStorage';

export const saveState = (state: any) => {
    setItem('reduxState', state);
};

export const loadState = () => {
    return getItem('reduxState');
};
