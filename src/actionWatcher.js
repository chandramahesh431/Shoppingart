import { takeLatest } from "redux-saga/effects";
import { setUserInfo } from "./sagas/loginSagas";

export default function* actionWatcher() {
  yield takeLatest("USER_INFO", setUserInfo);
}
