// action - state management
import {FETCH_SECTION_ATTRIBUTES} from '../actionTypes';

export const initialState = {
    sections: {},
};


const sectionFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SECTION_ATTRIBUTES: {
            return {
                ...state
            };
        }
        default: {
            return {...state};
        }
    }
};

export default sectionFormReducer;
