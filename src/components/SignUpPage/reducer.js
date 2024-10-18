const signUpFormReducer = (state, action) => {
  switch (action.type) {
    case "username_edited": {
      return {
        ...state,
        username: action.text,
      };
    }
    case "password_edited": {
      return {
        ...state,
        password: action.text,
      };
    }
    case "confirm_password_edited": {
      return {
        ...state,
        confirmPassword: action.text,
      };
    }
    case "sending": {
      return {
        ...state,
        isSending: true,
      };
    }
    case "sent": {
      return {
        ...state,
        isSending: false,
      };
    }
    case "errored": {
      return {
        ...state,
        error: action.text,
      };
    }
    case "error_cleared": {
      return {
        ...state,
        error: null,
      };
    }
    case "submit": {
      return {
        ...state,
        error: null,
      };
    }
    default: {
      throw new Error("Unknown action: " + action.type);
    }
  }
};

export default signUpFormReducer;
