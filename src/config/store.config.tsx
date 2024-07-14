import { configureStore } from '@reduxjs/toolkit';
import theme from '@/common/state/theme.state';
import abilities from '@/common/state/abilities.state';
import user from '@/common/state/user.state';

export const store = configureStore({
  reducer: {
    theme,
    abilities,
    user,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
