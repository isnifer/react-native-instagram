import { getTimeline } from '../api/index';
import {
    GET_TIMELINE_REQUEST,
    GET_TIMELINE_RESPONSE,
    UPDATE_TIMELINE_RESPONSE,
    GET_TOKEN
} from '../constants/index';
import token from '../constants/token';

export const getTimelineAction = ({url}) => (dispatch, getState) => {

    dispatch(getTokenAction(token));

    dispatch({
        type: GET_TIMELINE_REQUEST,
        payload: {
            timelineLoaded: false
        }
    });

    getTimeline({url, token}).then(payload => {
        dispatch({
            type: GET_TIMELINE_RESPONSE,
            payload: {
                timelineItems: payload.data,
                pagination: payload.pagination,
                timelineLoaded: true
            }
        })
    });
}

export const updateTimelineAction = ({url}) => (dispatch, getState) => {

    const { token } = getState();

    getTimeline({url, token}).then(payload => {
        dispatch({
            type: UPDATE_TIMELINE_RESPONSE,
            payload: {
                timelineItems: payload.data,
                pagination: payload.pagination
            }
        })
    });
}

export const getTokenAction = (token) => {
    return {
        type: GET_TOKEN,
        payload: {
            token
        }
    };
}
