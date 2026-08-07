import baseAPI from "@/redux/api/api";

const messagesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getMyConversationLists: builder.query({
      query: ({ page, limit, search, message_status }) => ({
        url: `/chats/inboxes`,
        method: "GET",
        params: { page, limit, search, message_status },
      }),
    }),

    getMessages: builder.query({
      query: ({ conversationId, page, page_size, search }) => ({
        url: `/chats/messages/${conversationId}`,
        method: "GET",
        params: { page, page_size, search },
      }),
    }),

    createRoom: builder.mutation({
      query: ({ other_user_id }) => ({
        url: `/chat/rooms/create/`,
        method: "POST",
        body: { other_user_id },
      }),
    }),

    fileUploadWithMessage: builder.mutation({
      query: ({ conversationId, body }) => {
        return {
          url: `/chats/sent-message/${conversationId}`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetMyConversationListsQuery,
  useGetMessagesQuery,
  useCreateRoomMutation,
  useFileUploadWithMessageMutation,
} = messagesAPI;
export default messagesAPI;
