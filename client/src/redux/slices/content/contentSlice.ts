import { ContentData, ContentTypes, ApiOperations, ContentState } from '../../../config';
import {
  contentDelete,
  contentListGet,
  contentPatch,
  contentPost
} from "./contentApi";
import { createSlice } from "../createSlice";

interface ContentListData {
  data: ContentData[];
  loaded: boolean;
}

const initContentListData = {
  data: [],
  loaded: false
}

export interface ContentSliceState {
  contentList: {
    [ContentTypes.Article]: ContentListData;
    [ContentTypes.Task]: ContentListData;
    [ContentTypes.New]: ContentListData;
  };
  error: {
    [ContentTypes.Article]: {[key: string]: unknown | null};
    [ContentTypes.Task]: {[key: string]: unknown | null};
    [ContentTypes.New]: {[key: string]: unknown | null};
  };
  loading: {
    [ContentTypes.Article]: {[key: string]: boolean};
    [ContentTypes.Task]: {[key: string]: boolean};
    [ContentTypes.New]: {[key: string]: boolean};
  };
}

export const initialContentState: ContentSliceState = {
  contentList: {
    [ContentTypes.Article]: initContentListData,
    [ContentTypes.Task]: initContentListData,
    [ContentTypes.New]: initContentListData,
  },
  error: {
    [ContentTypes.Article]: {},
    [ContentTypes.Task]: {},
    [ContentTypes.New]: {},
  },
  loading: {
    [ContentTypes.Article]: {},
    [ContentTypes.Task]: {},
    [ContentTypes.New]: {},
  }
};

const contentSlice = createSlice({
  name: 'content',
  initialState: initialContentState,
  reducers: (create) => ({
    resetContent: create.reducer(() => initialContentState),
    apiGetContentList: create.asyncThunk(
      contentListGet,
      {
        pending: (state, { meta: { arg: { type } } }) => {
          state.loading[type][ApiOperations.getList] = true;
        },
        rejected: (state, { error, payload, meta: { arg: { type } } }) => {
          state.error[type][ApiOperations.getList] = payload ?? error;
        },
        fulfilled: (state, { payload, meta: { arg: { type } } }) => {
          state.contentList[type].data = payload;
          state.contentList[type].loaded = true;
        },
        settled: (state, { meta: { arg: { type } } }) => {
          state.loading[type][ApiOperations.getList] = false;
        },
      },
    ),
    apiPostContent: create.asyncThunk(
      contentPost,
      {
        pending: (state, { meta: { arg: { type } } }) => {
          state.loading[type][ApiOperations.create] = true;
        },
        rejected: (state, { error, payload, meta: { arg: { type } } }) => {
          state.error[type][ApiOperations.create] = payload ?? error;
        },
        fulfilled: (state, { payload, meta: { arg: { type } } }) => {
          if (payload) {
            state.contentList[type].data.push(payload);
          }
        },
        settled: (state, { meta: { arg: { type } } }) => {
          state.loading[type][ApiOperations.create] = false;
        },
      },
    ),
    apiPatchContent: create.asyncThunk(
      contentPatch,
      {
        pending: (state, { meta: { arg: { type } } }) => {
          state.loading[type][ApiOperations.edit] = true;
        },
        rejected: (state, { error, payload, meta: { arg: { type } } }) => {
          state.error[type][ApiOperations.edit] = payload ?? error;
        },
        fulfilled: (state, { payload, meta: { arg: { type } } }) => {
          const index = state.contentList[type].data.findIndex(({id}) => id === payload.id);
          if (index > -1) {
            state.contentList[type].data[index] = payload;
          }
        },
        settled: (state, { meta: { arg: { type } } }) => {
          state.loading[type][ApiOperations.edit] = false;
        },
      },
    ),
    apiDeleteContent: create.asyncThunk(
      contentDelete,
      {
        pending: (state, { meta: { arg: { type } } }) => {
          state.loading[type][ApiOperations.deleteItem] = true;
        },
        rejected: (state, { error, payload, meta: { arg: { type } } }) => {
          state.error[type][ApiOperations.deleteItem] = payload ?? error;
        },
        fulfilled: (state, { payload, meta: { arg: { type } } }) => {
          if (payload.id && state.contentList[type].data.length) {
            state.contentList[type].data = state.contentList[type].data.filter(({id}) => id !== payload.id);
          }
        },
        settled: (state, { meta: { arg: { type } } }) => {
          state.loading[type][ApiOperations.deleteItem] = false;
        },
      },
    ),
  }),
  selectors: {
    selectContentList: (state, type: ContentTypes) => {
      return {
        data: state.contentList[type].data,
        loaded: state.contentList[type].loaded,
        isLoading: !!state.loading[type][ApiOperations.getList]
      }
    },
    selectTasksCount: (state) => {
      const { data } = state.contentList[ContentTypes.Task];
      if (!data.length) {
        return {
          inProgress: 0,
          done: 0
        }
      }
      return {
        inProgress: data.filter((todo) => todo.state !== ContentState.Done).length,
        done: data.filter((todo) => todo.state === ContentState.Done).length
      }
    },
    selectIsContentsLoading: (state, type: ContentTypes, operation: ApiOperations) => {
      return !!state.loading[type][operation];
    },
  },
});

export default contentSlice.reducer;

export const {
  apiGetContentList,
  apiPostContent,
  apiPatchContent,
  apiDeleteContent,
  resetContent
} = contentSlice.actions;

export const {
  selectContentList,
  selectIsContentsLoading,
  selectTasksCount
} = contentSlice.selectors;
