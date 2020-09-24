export const ADD_ESTIMATE_REQUESTED = 'ADD_ESTIMATE_REQUESTED';
export const ADD_ESTIMATE_PENDING = 'ADD_ESTIMATE_PENDING';
export const ADD_ESTIMATE_SUCCEDED = 'ADD_ESTIMATE_SUCCEDED';
export const ADD_ESTIMATE_FAILED = 'ADD_ESTIMATE_FAILED';
  
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