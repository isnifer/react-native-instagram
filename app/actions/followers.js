import { getFollowers } from '../api/index';
import {
    GET_FOLLOWERS_REQUEST,
    GET_FOLLOWERS_RESPONSE,
    UPDATE_FOLLOWERS_REQUEST,
    UPDATE_FOLLOWERS_RESPONSE
} from '../constants/index';

export const getFollowersAction = ({url, userId, type}) => (dispatch, getState) => {

    const { token } = getState();

    dispatch({
        type: GET_FOLLOWERS_REQUEST,
        payload: {
            followers: [],
            followersPagination: {}
        }
    });

    getFollowers({url, userId, type, token}).then(payload => {
        dispatch({
            type: GET_FOLLOWERS_RESPONSE,
            payload
        })
    });
};

export const updateFollowersAction = ({url, userId, type}) => (dispatch, getState) => {

    const { token } = getState();

    dispatch({
        type: UPDATE_FOLLOWERS_REQUEST
    });

    getFollowers({url, userId, type, token}).then(payload => {
        dispatch({
            type: UPDATE_FOLLOWERS_RESPONSE,
            payload
        })
    });
};
