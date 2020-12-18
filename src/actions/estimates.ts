export const ADD_ESTIMATE_REQUESTED = 'ADD_ESTIMATE_REQUESTED';
export const ADD_ESTIMATE_PENDING = 'ADD_ESTIMATE_PENDING';
export const ADD_ESTIMATE_SUCCEDED = 'ADD_ESTIMATE_SUCCEDED';
export const ADD_ESTIMATE_FAILED = 'ADD_ESTIMATE_FAILED';

export const GET_ESTIMATES_REQUESTED = 'GET_ESTIMATES_REQUESTED';
export const GET_ESTIMATES_PENDING = 'GET_ESTIMATES_PENDING';
export const GET_ESTIMATES_SUCCEDED = 'GET_ESTIMATES_SUCCEDED';
export const GET_ESTIMATES_FAILED = 'GET_ESTIMATES_FAILED';

export const EXPORT_ESTIMATE_REQUESTED = 'EXPORT_ESTIMATE_REQUESTED';
export const EXPORT_ESTIMATE_PENDING = 'EXPORT_ESTIMATE_PENDING';
export const EXPORT_ESTIMATE_SUCCEDED = 'EXPORT_ESTIMATE_SUCCEDED';
export const EXPORT_ESTIMATE_FAILED = 'EXPORT_ESTIMATE_FAILED';

export const UPDATE_ESTIMATE_REQUESTED = 'UPDATE_ESTIMATE_REQUESTED';
export const UPDATE_ESTIMATE_PENDING = 'UPDATE_ESTIMATE_PENDING';
export const UPDATE_ESTIMATE_SUCCEDED = 'UPDATE_ESTIMATE_SUCCEDED';
export const UPDATE_ESTIMATE_FAILED = 'UPDATE_ESTIMATE_FAILED';

export const ADD_ESTIMATE_AND_EXPORT_REQUESTED = 'ADD_ESTIMATE_AND_EXPORT_REQUESTED';

export const addEstimate = (estimate) => ({
    type: ADD_ESTIMATE_REQUESTED,
    estimate: estimate
});

export const addEstimatePending = () => ({
    type: ADD_ESTIMATE_PENDING,
    pending: true
});
  
export const addEstimateSucceded = (estimate) => ({
    type: ADD_ESTIMATE_SUCCEDED,
    pending: false,
    estimate
});
  
export const addEstimateFailed = (error) => ({
    type: ADD_ESTIMATE_FAILED,
    error
});

export const getEstimates = () => ({
    type: GET_ESTIMATES_REQUESTED,
})

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

export const exportEstimate = (estimateId, filename, mode) => ({
    type: EXPORT_ESTIMATE_REQUESTED,
    estimateId,
    filename,
    mode
});

export const exportEstimatePending = () => ({
    type: EXPORT_ESTIMATE_PENDING,
    pending: true
});
  
export const exportEstimateSucceded = (estimateId, localUri) => ({
    type: EXPORT_ESTIMATE_SUCCEDED,
    pending: false,
    estimateId,
    localUri
});
  
export const exportEstimateFailed = (error) => ({
    type: EXPORT_ESTIMATE_FAILED,
    error
});

export const updateEstimate = (estimateId, estimate) => ({
    type: UPDATE_ESTIMATE_REQUESTED,
    estimateId,
    estimate
});

export const updateEstimatePending = () => ({
    type: UPDATE_ESTIMATE_PENDING,
    pending: true
});
  
export const updateEstimateSucceded = () => ({
    type: UPDATE_ESTIMATE_SUCCEDED,
    pending: false
});
  
export const updateEstimateFailed = (error) => ({
    type: UPDATE_ESTIMATE_FAILED,
    error
});

export const addEstimateAndExport = (estimate) = (estimate) => ({
    type: ADD_ESTIMATE_AND_EXPORT_REQUESTED,
    estimate
});