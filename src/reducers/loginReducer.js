const initState = {
  signedInUser: { username: "test" },
};

const loginReducer = (state = initState, action) => {
  console.log("data-reducer", action);
  switch (action.type) {
    case "USER_DATA": {
      return { ...state, signedInUser: action.userInfo.payload };
    }
    default:
      return state;
  }
};

export default loginReducer;
