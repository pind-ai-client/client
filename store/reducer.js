const initialState = {
  isLogin: false,
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SUCCESS_HIT_API":
      return {
        ...state,
        isLoading: false
      };

    case "ERROR_HIT_API":
      return {
        ...state,
        isLoading: false
      };

    case "LOADING_HIT_API":
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
};
