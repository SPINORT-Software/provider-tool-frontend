// action - state management
import {FETCH_ROLE_SECTION_ATTRIBUTES, FETCH_SECTION_ATTRIBUTES} from '../actionTypes';

export const initialState = {
    sections: {},
};

const sectionFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SECTION_ATTRIBUTES: {
            // eslint-disable-next-line camelcase
            const {attribute_groups, sectionUuid, attribute_set} = action.data;
            return {
                ...state,
                sections: {
                    ...state.sections,
                    [sectionUuid]: {
                        attribute_groups,
                        attribute_set
                    }
                }
            };
        }
        case FETCH_ROLE_SECTION_ATTRIBUTES: {
            // eslint-disable-next-line camelcase
            const {sections} = action.data;
            return {
                ...state,
                sections: {
                    ...state.sections,
                    ...sections
                }
            };
        }
        default: {
            return {...state};
        }
    }
};

export default sectionFormReducer;
