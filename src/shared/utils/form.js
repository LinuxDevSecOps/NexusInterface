import store from 'store';
import { openErrorDialog } from 'actions/overlays';

export function resolveValue(input) {
  if (input && input.target) {
    const el = input.target;
    if (el.type === 'checkbox') {
      return el.checked;
    } else if (el.type === 'number') {
      return parseInt(el.value);
    } else {
      return el.value;
    }
  }
  return input;
}

export function rpcErrorHandler(message) {
  return (errors, dispatch, submitError, ...more) => {
    // If errors object has some values it means the form validation failed
    // In that case, no need to open an error dialog
    if (!errors || !Object.keys(errors).length) {
      store.dispatch(
        openErrorDialog({
          message,
          note:
            (submitError && submitError.message) || 'An unknown error occurred',
        })
      );
    }
  };
}

export const trimText = text => text && text.trim();

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
