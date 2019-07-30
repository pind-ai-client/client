const initialState = {
  isLogin: false,
  isLoading: false,
  user: {},
  answer: {},
  answers: [],
  createdAnswer: {},
  setSoal: {},
  setSoals: [],
  error: undefined
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
        error: action.error,
        isLoading: false
      };

    case "LOADING_HIT_API":
      return {
        ...state,
        error: undefined,
        isLoading: true
      };

    case "LOADING_DONE": 
      return {
        ...state,
        isLoading: false
      }

    case "SUCCESS_LOGIN":
      // console.log(action.data, 'from reducer')
      return {
        ...state,
        user: action.data,
        isLoading: false
      }
    
    case "SUCCESS_FETCH_SOALS":
      return {
        ...state,
        setSoals: action.data,
        isLoading: false
      }

    case "SUCCESS_FETCH_SOAL":
      return {
        ...state,
        setSoal: action.data,
        isLoading: false
      }

    case "SUCCESS_FETCH_ANSWERS":
      return {
        ...state,
        answers: action.data,
        isLoading: false
      }

    case "SUCCESS_FETCH_ANSWER":
      return {
        ...state,
        answer: action.data,
        isLoading: false
      }

    case "SUCCESS_CREATE_ANSWER":
      return {
        ...state,
        createdAnswer: action.data
      }

    default:
      return state;
  }
};
