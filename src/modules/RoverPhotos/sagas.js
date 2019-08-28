import { takeEvery, select, put, call, fork } from 'redux-saga/effects'
import {
    changeSol,
    fetchPhotosRequest,
    fetchPhotosSuccess,
    fetchPhotosFailure
} from './actions'
import { getPhotos } from './api'
import { getApiKey} from '../Auth'

// Реализуйте саги

function* fetchPhotoWatcher() {
  yield takeEvery(fetchPhotosRequest, fetchPhotosFlow);
}

export function* fetchPhotosFlow(action) {
    const apiKey = yield select(getApiKey)
    const { name, sol } = action.payload
  try {
    const roverPhoto = yield call( name, sol, getPhotos, apiKey )
    const { photos } = roverPhoto
    yield put(fetchPhotosSuccess( {photos, name, sol }))
    yield put(changeSol(sol))
  } catch ({ error }) {
    yield put(fetchPhotosFailure(error))
  }
}

export default function*() {
  yield fork(fetchPhotoWatcher);
}
