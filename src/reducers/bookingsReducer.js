const INITIALSTATE = { bookings: [] };

export function bookingsReducer(state = INITIALSTATE, action) {
  switch (action.type) {
    case "GET_BOOKINGS":
      return {
        ...state,
        bookings: action.payload,
      };

    default:
      return state;
  }
}
