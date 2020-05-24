import { call, put } from "redux-saga/effects";
import { getUserData } from "../actions/loginActions";

export function* setUserInfo(data) {
  console.log("data-sagas", data);
  const _userData = yield call(getUserData, data);
  yield put({ type: "USER_DATA", userInfo: _userData });
}
