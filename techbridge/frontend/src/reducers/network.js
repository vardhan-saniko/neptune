
import _ from 'lodash';
import { GET_NETWORK } from '../actions/types';

export default (state = {}, action) => {
  // debugger;
  console.log(`state:::: ${state}`);
  console.log(`action:::: ${action}`);
  switch (action.type) {
    case GET_NETWORK:
      return {
        ...state,
        ..._.mapKeys(action.payload, 'id')
      };
    default:
      return state;
  }
};