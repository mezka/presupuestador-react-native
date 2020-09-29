export const ADD_ESTIMATE_REQUESTED = 'ADD_ESTIMATE_REQUESTED';
export const ADD_ESTIMATE_PENDING = 'ADD_ESTIMATE_PENDING';
export const ADD_ESTIMATE_SUCCEDED = 'ADD_ESTIMATE_SUCCEDED';
export const ADD_ESTIMATE_FAILED = 'ADD_ESTIMATE_FAILED';

export const GET_ESTIMATES_REQUESTED = 'GET_ESTIMATES_REQUESTED';
export const GET_ESTIMATES_PENDING = 'GET_ESTIMATES_PENDING';
export const GET_ESTIMATES_SUCCEDED = 'GET_ESTIMATES_SUCCEDED';
export const GET_ESTIMATES_FAILED = 'GET_ESTIMATES_FAILED';

export const addEstimate = (estimate) => {
    return {
        type: ADD_ESTIMATE_REQUESTED,
        estimate: estimate
    };
}

export const addEstimatePending = () => ({
    type: ADD_ESTIMATE_PENDING,
    pending: true
});
  
export const addEstimateSucceded = () => ({
    type: ADD_ESTIMATE_SUCCEDED,
    pending: false
});
  
export const addEstimateFailed = (error) => ({
    type: ADD_ESTIMATE_FAILED,
    error
});


export const getEstimates = () => {
    return {
        type: GET_ESTIMATES_REQUESTED,
    };
}

export const getEstimatesPending = () => ({
    type: GET_ESTIMATES_PENDING,
    pending: true
});
  
export const getEstimatesSucceded = (estimates) => ({
    type: GET_ESTIMATES_SUCCEDED,
    pending: false,
    estimates
});
  
export const getEstimatesFailed = (error) => ({
    type: GET_ESTIMATES_FAILED,
    error
});