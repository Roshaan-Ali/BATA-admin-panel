const INITIALSTATE = { payments: [] };

export function paymentsReducer(state = INITIALSTATE, action) {
  switch (action.type) {
    case "GET_PAYMENTS":
      return {
        ...state,
        payments: action.payload,
      };

    default:
      return state;
  }
}
