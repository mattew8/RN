const types = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

export const actionCreators = {
  loading: () => ({ type: types.LOADING }),
  failure: () => ({ type: types.FAILURE }),
  success: (photos, page) => ({
    type: types.SUCCESS,
    payload: { photos, page },
  }),
};

export const initialState = {
  // 초기 데이터 생성
  loading: false,
  error: false,
  photos: [],
  nextPage: 1,
};

export const reducer = (state, action) => {
  // 리듀서 생성
  switch (action.type) {
    case types.LOADING:
      return { ...state, loading: true, error: false };
    case types.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        photos: [...state.photos, ...action.payload.photos],
        //  SUCCESS시, 현재 photos에 새로운 사진의 페이지를 결합
        nextPage: state.nextPage + 1,
        // 페이지 번호 + 1
      };
    case types.FAILURE:
      return { ...state, loading: false, error: true };
  }
};
