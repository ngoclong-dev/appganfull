import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
    },
    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    logOut: (state, action) => {
      state.user = null;
    },
  },
});

const chatListSlice = createSlice({
  name: "chatList",
  initialState: [],
  reducers: {
    setChatList: (state, action) => {
      const list = action.payload;
      if (list === null) return null;
      return list;
    }
  },
});

const messagesSlice = createSlice({
  name: "messages",
  initialState: {},
  reducers: {
    setMessages: (state, action) => {
      const messages = action?.payload?.messages;
      const id = action?.payload?.id;
      if (id === null) return state;
      
      return {...state, [id]: messages };
    },
  },
 
});

const contactListSlice = createSlice({
  name: "contactList",
  initialState: [],
  reducers: {
    setContactList: (state, action) => {
      const list = action.payload;
      if (list === null) return null;
      return list;
    },
  },
});

const storyListSlice = createSlice({
  name: "storyList",
  initialState: [],
  reducers: {
    setStoryList: (state, action) => {
      const list = action.payload;
      if (list === null) return null;
      return list;
    },
  },
});

export const { signIn, updateUser, logOut } = authSlice.actions;
export const { setChatList } = chatListSlice.actions;
export const { setMessages } = messagesSlice.actions;
export const { setContactList } = contactListSlice.actions;
export const { setStoryList } = storyListSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    chatList: chatListSlice.reducer,
    messages: messagesSlice.reducer,
    contactList: contactListSlice.reducer,
    storyList: storyListSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),// this is solution for serializable error of timestamp
});
