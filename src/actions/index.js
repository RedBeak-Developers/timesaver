export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';
export const ADD_WEBSITE = 'ADD_WEBSITE';
export const REMOVE_WEBSITE = 'REMOVE_WEBSITE';
export const LOAD_WEBSITES = 'LOAD_WEBSITES';

export const setActiveTab = (tab) => ({
  type: SET_ACTIVE_TAB,
  payload: tab,
});

export const addWebsite = (website) => ({
  type: ADD_WEBSITE,
  payload: website,
});

export const removeWebsite = (website) => ({
  type: REMOVE_WEBSITE,
  payload: website,
});

export const loadWebsites = (websites) => ({
  type: LOAD_WEBSITES,
  payload: websites,
});