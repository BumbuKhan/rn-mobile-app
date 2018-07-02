import { combineReducers } from 'redux';
import user from './user_reducer';
import activeProject from './active_project_reducer';
import projects from './projects_reducer';
import clientsProjects from './clients_projects_reducer';
import projectCategories from './project_categories_reducer';
import clients from './clients_reducer';
import tasks from './project_tasks';

export default combineReducers({
    user, // authenticated user data
    activeProject, // currently active project's spot
    projects, // projects that have been created by user
    clientsProjects, // projects that have been fetched from the API
    projectCategories, // ATN, BTN, STN
    clients, // fetched from the api,
    tasks, // fetched from the API (by project_id)
});