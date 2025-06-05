import { takeLatest, call, put } from 'redux-saga/effects';
import { saveStepData, setStepLastSaved } from './addProductSlice';
import {
  saveProductInfo,
  saveProductVariant,
  savePriceAndTax,
  saveWarehouseInfo,
  saveChannelListing,
  saveMedia,
  saveSEOTags,
  saveAdditionSettings
} from '@/services/client';

function* handleSaveStepData(action) {
  const { stepIndex, data } = action.payload;
  try {
    // Call different API for each step
    switch (stepIndex) {
      case 0:
        yield call(saveProductInfo, data);
        break;
      case 1:
        yield call(saveProductVariant, data);
        break;
      case 2:
        yield call(savePriceAndTax, data);
        break;
      case 3:
        yield call(saveWarehouseInfo, data);
        break;
      case 4:
        yield call(saveChannelListing, data);
        break;
      case 5:
        yield call(saveMedia, data);
        break;
      case 6:
        yield call(saveSEOTags, data);
        break;
      case 7:
        yield call(saveAdditionSettings, data);
        break;
      default:
        break;
    }
    // After successful API call, update lastSavedStepData
    yield put(setStepLastSaved({ stepIndex, data }));
  } catch (e) {
    // handle error (optional)
  }
}

export default function* addProductSaga() {
  yield takeLatest(saveStepData.type, handleSaveStepData);
}
