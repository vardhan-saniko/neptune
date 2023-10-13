import axios from 'axios';
import { GET_NETWORK } from './types';

// GET TODOS
export const getNetwork = () => async dispatch => {
  // debugger;
  const res = await axios.get('/api/network/');
  dispatch({
    type: GET_NETWORK,
    payload: res.data
  });
};