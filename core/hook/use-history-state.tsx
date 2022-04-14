import { useState, useCallback } from "react";

const historyStorage = ((history: any) => {
  history.replaceState = (
    (replaceState: any) =>
    (state = {}, title: any, url: any) =>
      replaceState.call(history, { ...history.state, ...state }, title, url)
  )(history.replaceState);

  const get = (key: any) => history.state?.page?.[key];
  const set = (key: any, value: any, replace = false) => {
    history.replaceState({
      page: replace
        ? { [key]: value }
        : { ...history.state?.page, [key]: value },
    });
  };

  return { set, get };
})(typeof window !== "undefined" ? window.history : {});

const useHistoryState = (initialState: any, key: any) => {
  const stateValue = historyStorage.get(key);

  const [historyState, setHistoryState] = useState(
    stateValue === undefined ? initialState : stateValue,
  );

  const setState = useCallback(
    (state, replace = false) => {
      const value = state instanceof Function ? state(historyState) : state;

      setHistoryState(() => value);
      historyStorage.set(key, value, replace);
    },
    [historyState, key],
  );

  return [historyState, setState];
};

export default useHistoryState;
