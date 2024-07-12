import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { is } from 'ramda';

export const apiErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const { error, payload, meta, type } = action;

    const parsedError = is(String, payload) ? JSON.parse(payload) : payload;

    console.log({ api, error, parsedError, meta, type });
  }

  return next(action);
};
