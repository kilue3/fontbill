import { combineReducers } from 'redux';
import activitiesReducer from './activitiesReducer';

const rootReducer = combineReducers({
    activities: activitiesReducer,
    // users:userReducer,
    // cart:cartReducer 
}
);
export default rootReducer;