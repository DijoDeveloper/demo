/**
 * To handle the doctor selection reducer
 * @Author: Dinesh S
 * @Date: 2020-09-08
 */

/**
 * import all files and screens
 */

import initialState from '../initialState';

/**
 * request form reducer action execute based on types
 * @param {initialState it cannot be change} state
 * @param {default actions} action
 */
export default function userActions(
  state = initialState.userActions,
  action: any,
) {
  return {
    ...state,
    [action.index]: action.data,
  };
}
