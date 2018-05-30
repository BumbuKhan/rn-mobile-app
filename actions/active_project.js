import {
    TOGGLE_ACTIVE_PROJECT_TYPE,
    CREATE_ACTIVE_PROJECT,
    REMOVE_ACTIVE_PROJECT,
    ACTIVE_PROJECT_TOGGLE_TIMER,
    ACTIVE_PROJECT_UPDATE_TIMER,
    ACTIVE_PROJECT_ADD_PHOTOS,
    ACTIVE_PROJECT_REMOVE_PHOTO
} from './types';

export const toggleType = (type) => {
    return {
        type: TOGGLE_ACTIVE_PROJECT_TYPE,
        payload: type
    }
};

export const createProject = () => {
    return {
        type: CREATE_ACTIVE_PROJECT
    }
};

export const removeProject = () => {
    return {
        type: REMOVE_ACTIVE_PROJECT
    }
};

// is called (manually) when user starts/stops timer
export const toggleTimer = (state) => {
    return {
        type: ACTIVE_PROJECT_TOGGLE_TIMER,
        payload: state
    }
};

// is called (automatically) by setInterval()
export const updateTimer = (state) => {
    return {
        type: ACTIVE_PROJECT_UPDATE_TIMER
    }
};

// will add taken photos to active project
/*
'photos' is an array with such structure:
    [
        {
            "base64": "qwew876q6e7q87e6q...qweqweqwe"
            "height": 200,
            "width": 200,                                            
            "uri": "file:///Users/macbook/Library/Developer/Co...38218BE21AC.jpg"
        },
        ...
    ]
*/
export const addPhotos = (photos) => {
    return {
        type: ACTIVE_PROJECT_ADD_PHOTOS,
        payload: photos
    }
}

export const removePhoto = (index) => {
    return {
        type: ACTIVE_PROJECT_REMOVE_PHOTO,
        payload: index
    }
}