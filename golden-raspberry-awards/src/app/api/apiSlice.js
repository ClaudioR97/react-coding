import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { setCredentials, logOut } from '../../features/user/userSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  // ====================== TODO: Implement 401 unauthorized re-authentication ======================
  // if (result?.error?.status === 401) {
  //   const refreshResult = await baseQuery('/refresh', api, extraOptions);
  //   if (refreshResult?.data) {
  //     const { user } = api.getState().auth;
  //     api.dispatch(setCredentials({ user, ...refreshResult.data }));
  //     result = await baseQuery(args, api, extraOptions);
  //   } else {
  //     api.dispatch(logOut());
  //   }
  // }
  return result;
};

const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

export { apiSlice, baseQueryWithReauth };
