import {
    UPDATE_CATEGORIES,
} from './types';

export const updateCategories = (categories) => {
    return {
        type: UPDATE_CATEGORIES,
        payload: categories
    }
};
