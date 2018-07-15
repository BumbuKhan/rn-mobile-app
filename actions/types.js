export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_FAIL = 'login_fail';
export const LOG_OUT = 'log_out';
export const TOGGLE_CUR_LANG = 'toggle_cur_lang';

export const TOGGLE_ACTIVE_PROJECT_TYPE = 'toggle_active_project_type';
export const CREATE_ACTIVE_PROJECT = 'create_active_project';
export const REMOVE_ACTIVE_PROJECT = 'remove_active_project';
export const ACTIVE_PROJECT_TOGGLE_TIMER = 'active_project_toggle_timer';
export const ACTIVE_PROJECT_UPDATE_TIMER = 'active_project_UPDATE_timer';
export const ACTIVE_PROJECT_ADD_PHOTOS = 'active_project_add_photos';
export const ACTIVE_PROJECT_REMOVE_PHOTO = 'active_project_remove_photos';
export const ACTIVE_PROJECT_CLEAN = 'active_project_clean';

// adding project to 'projects' array in the redux store 
export const ADD_PROJECT = 'add_project';
export const REMOVE_PROJECT = 'remove_project';
export const REHYDRATE_PROJECT = 'rehydrate_project';

export const UPDATE_CATEGORIES = 'update_categories';

// clients screen
export const FETCH_CLIENTS_PENDING = 'fetch_client_pending';
export const FETCH_CLIENTS_RESOLVED = 'fetch_client_resolved';
export const FETCH_CLIENTS_REJECTED = 'fetch_client_rejected';
export const SELECT_CLIENT = 'select_client';

// clients project
export const FETCH_CLIENT_PROJECTS_PENDING = 'fetch_client_projects_pending';
export const FETCH_CLIENT_PROJECTS_RESOLVED = 'fetch_client_projects_resolved';
export const FETCH_CLIENT_PROJECTS_REJECTED = 'fetch_client_projects_rejected';
export const SELECT_CLIENT_PROJECT = 'select_client_project';

// tasks
export const FETCH_PROJECT_TASKS_PENDING = 'fetch_project_tasks_pending';
export const FETCH_PROJECT_TASKS_RESOLVED = 'fetch_project_tasks_resolved';
export const FETCH_PROJECT_TASKS_REJECTED = 'fetch_project_tasks_rejected';