import { put, call, takeLatest } from 'redux-saga/effects';
import { FETCH_TODOS, SET_TODOS } from './actions/todoActions';

const todos = [
  { id: 1, title: 'Belajar React Native', completed: false },
  { id: 2, title: 'Belajar Redux', completed: true },
  { id: 3, title: 'Belajar Saga', completed: false }
];

function* fetchTodos() {
  try {
    yield put({ type: SET_TODOS, payload: todos });
  } catch (error) {
    console.log(error);
  }
}

function* todoSaga() {
  yield takeLatest(FETCH_TODOS, fetchTodos);
}

export default todoSaga;