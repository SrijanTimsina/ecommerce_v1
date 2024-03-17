const asyncHandler = require("../middlewares/asyncHandler");
const Order = require("../models/orderModel.js");
const Product = require("../models/productModel.js");

// @desc Create New Order
// @route POST /api/orders
// @access Private

const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	if (orderItems && orderItems.length !== 0) {
		orderItems.map(async (item) => {
			if (item.thrift) {
				const product = await Product.findById(item._id);
				const user = await User.findById(product.user);
				let currentOrders = [];
				if (user.thriftOrders) {
					currentOrders = user.thriftOrders;
				}
				currentOrders.push({
					name: item.name,
					qty: item.qty,
					totalPrice: item.qty * item.price,
				});
				console.log(currentOrders);
				user.thriftOrders = currentOrders;
				console.log(user);
				await user.save();
			}
		});
	}

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error("No order item");
	} else {
		const order = new Order({
			orderItems: orderItems.map((x) => ({
				...x,
				product: x._id,
				_id: undefined,
			})),
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});
		const createdOrder = await order.save();
		res.status(201).json(createdOrder);
	}
});
// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private

const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });
	res.status(200).json(orders);
});
// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private

const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		"user",
		"name email"
	);
	if (order) {
		res.status(200).json(order);
	} else {
		res.status(404);
		throw new Error("order not Found");
	}
});
// @desc update order to paid
// @route PUT /api/orders/:id/pay
// @access Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.createdAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};

		const updatedOrder = await order.save();

		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});
// @desc update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private/admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isDelivered = true;
		order.deliveredAt = Date.now();
		const updatedOrder = await order.save();
		res.status(200).json(updatedOrder);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});
// @desc get all order
// @route GET /api/orders/
// @access Private/admin

const getOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({}).populate("user", "id name");
	res.status(200).json(orders);
});

const routes = {
	addOrderItems,
	getMyOrders,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	getOrders,
};
module.exports = routes;
