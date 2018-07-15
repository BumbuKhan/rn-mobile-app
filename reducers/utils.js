import moment from 'moment';

export const getTimestamp = () => {
    return moment().unix();
}

export const getUniqueId = () => {
    return getTimestamp();
}