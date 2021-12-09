import { combineReducers, createStore } from "redux";
import tasksReducer from "./tasksReducer";
import projectsReducer from "./projectsReducer";
import projectPointsReducer from "./projectPointsReducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    projects: projectsReducer,
    projectPoints: projectPointsReducer
})

const store = createStore(rootReducer);

export default store;