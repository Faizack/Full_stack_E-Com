import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../../types/api";
import { User } from "../../types/types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://127.0.0.1:5000/api/v1/user`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<MessageResponse, User>({
      query: (data) => ({
        url: "/new",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Accessing the login mutation
export const { useLoginMutation } = userApi;
