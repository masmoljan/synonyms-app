import type {
  AddSynonymRequest,
  AddSynonymResponse,
  SynonymsQueryParams,
  SynonymsResponse,
} from "@/types";
import { apiSlice } from "./apiSlice";
import { SYNONYMS_SEARCH_URL, SYNONYMS_URL } from "./routes";

export const synonymsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchSynonyms: builder.query<SynonymsResponse, SynonymsQueryParams>({
      query: ({ word, skip, limit }) => ({
        url: SYNONYMS_SEARCH_URL,
        params: { word, skip, limit },
      }),
      providesTags: ["Synonyms"],
    }),
    addSynonym: builder.mutation<AddSynonymResponse, AddSynonymRequest>({
      query: (data) => ({
        url: SYNONYMS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Synonyms"],
    }),
  }),
});

export const { useSearchSynonymsQuery, useAddSynonymMutation } = synonymsSlice;
