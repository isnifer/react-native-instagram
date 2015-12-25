import { searchByUser } from '../api/index';
import {
    SEARCH_BY_USER_REQUEST,
    SEARCH_BY_USER_RESPONSE
} from '../constants/index';

export const searchByUserAction = (username) => (dispatch, getState) => {

    const { token } = getState();

    username = username.replace(/\s/, '');

    dispatch({
        type: SEARCH_BY_USER_REQUEST
    });

    searchByUser({username, token}).then(payload => {
        dispatch({
            type: SEARCH_BY_USER_RESPONSE,
            payload
        })
    });
};
