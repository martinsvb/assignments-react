import { GetThunkAPI, AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import {
  getHeaders,
  postHeaders,
  patchHeaders,
  delHeaders,
  checkResponse,
  getErrorValue,
  contentUrl
} from '../../../api';
import { ContentTypes, ContentData } from '../../../config';

type ContentIdentification = {
  parentId?: string;
  type: ContentTypes;
};

export const contentListGet = async (
  {type}: ContentIdentification,
  { rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const data = await checkResponse(
      await fetch(`${contentUrl}/list/${type}`, getHeaders({signal}))
    ).json();

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const contentGet = async (
  {id, type}: {id: string} & ContentIdentification,
  { rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    return await checkResponse(
      await fetch(`${contentUrl}/${id}/${type}`, getHeaders({signal}))
    ).json();
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const contentPost = async (
  {body, type, parentId, onSuccess}: {body: ContentData, onSuccess: () => void} & ContentIdentification,
  { rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const data = await checkResponse(
      await fetch(
        contentUrl, postHeaders({body: {...body, type, parentId}, signal})
      )
    ).json();

    onSuccess();

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const contentPatch = async (
  {
    body,
    type,
    id,
    parentId,
  }: {body: Partial<ContentData>, id: string, successMsg?: string} & ContentIdentification,
  { rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const data = await checkResponse(
      await fetch(`${contentUrl}/${id}/${type}`, patchHeaders({body: {...body, parentId}, signal}))
    ).json();

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}

export const contentDelete = async (
  {id, type, onSuccess}: {id: string, onSuccess: () => void} & ContentIdentification,
  { rejectWithValue, signal }: GetThunkAPI<AsyncThunkConfig>
) => {
  try {
    const data = await checkResponse(
      await fetch(`${contentUrl}/${id}/${type}`, delHeaders({signal}))
    ).json();

    onSuccess();

    return data;
  } catch (error: unknown) {
    return rejectWithValue(getErrorValue(error));
  }
}
