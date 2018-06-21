import { combineReducers } from 'redux';
import user from './user_reducer';
import activeProject from './active_project_reducer';
import projects from './projects_reducer';
import clientsProjects from './clients_projects_reducer';
import projectCategories from './project_categories_reducer';
import clients from './clients_reducer';

export default combineReducers({
    user,
    activeProject,
    projects,
    clientsProjects,
    projectCategories,
    clients
});