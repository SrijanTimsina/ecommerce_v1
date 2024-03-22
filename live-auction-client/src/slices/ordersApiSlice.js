import { apiSlice } from "./apiSlices";
import { ORDERS_URL, PAYPAL_URL } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createOrder: builder.mutation({
			query: (order) => ({
				url: ORDERS_URL,
				method: "POST",
				body: { ...order, token: localStorage.token },
			}),
		}),
		getOrderDetails: builder.query({
			query: (id) => ({
				url: `${ORDERS_URL}/${id}`,
				body: { token: localStorage.token },
			}),
			keepUnusedDataFor: 5,
		}),
		payOrder: builder.mutation({
			query: ({ orderId, details }) => ({
				url: `${ORDERS_URL}/${orderId}/pay`,
				method: "PUT",
				body: { ...details, token: localStorage.token },
			}),
		}),
		getPaypalClientId: builder.query({
			query: () => ({
				url: PAYPAL_URL,
			}),
			keepUnusedDataFor: 5,
		}),
		getMyOrders: builder.query({
			query: () => ({
				url: `${ORDERS_URL}/mine`,
			}),
			keepUnusedDataFor: 5,
			body: { token: localStorage.token },
		}),
		getOrders: builder.query({
			query: () => ({
				url: ORDERS_URL,
			}),
			keepUnusedDataFor: 5,
			body: { token: localStorage.token },
		}),
		deliverOrder: builder.mutation({
			query: (orderId) => ({
				url: `${ORDERS_URL}/${orderId}/deliver`,
				method: "PUT",
				body: { token: localStorage.token },
			}),
		}),
	}),
});

export const {
	useCreateOrderMutation,
	useGetOrderDetailsQuery,
	usePayOrderMutation,
	useGetPaypalClientIdQuery,
	useGetMyOrdersQuery,
	useGetOrdersQuery,
	useDeliverOrderMutation,
} = orderApiSlice;
