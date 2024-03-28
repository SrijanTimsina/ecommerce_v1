import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import openSocket from "socket.io-client";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetProductsQuery } from "../slices/productsApiSlice";

// MUI
import { Button, Box, ButtonGroup } from "@mui/material";
// Styling
import "./css/board.css";
import {
	adAreaStyle,
	boardCardStyle,
	boardStyle,
} from "./css/boardStyle";
// Actions
import {
	loadAds,
	adPostedByOther,
	updateAdInList,
} from "../actions/ad";
import { setAlert, clearAlerts } from "../actions/alert";
// Components
import Spinner from "./Spinner";
import AuctionItem from "./AuctionItem";

const Board = (props) => {
	const [allProducts, setAllProducts] = useState([]);
	const {
		data: products,
		isLoading,
		refetch,
		error,
	} = useGetProductsQuery();
	let productsArr = [];
	const categoryObj = {};
	useEffect(() => {
		if (props.passedUser) {
			props.loadAds(props.passedUser);
		} else {
			props.loadAds();
			const socket = openSocket(process.env.REACT_APP_API_BASE_URL);
			// when new ad is added
			socket.on("addAd", (data) => {
				console.log(data);
				if (
					props.user &&
					data.ad.owner &&
					data.ad.owner.toString() !== props.user._id.toString()
				) {
					props.clearAlerts();
					props.setAlert("New ads available", "info", 60000);
				}
			});
			// when auction starts/ends
			socket.on("auctionStarted", (res) => {
				props.updateAdInList(res.data);
			});
			socket.on("auctionEnded", (res) => {
				props.updateAdInList(res.data);
			});

			// disconnect socket when page left
			return () => {
				socket.emit("leaveHome");
				socket.off();
				props.clearAlerts();
			};
		}
	}, []);

	useEffect(() => {
		refetch();
		if (products && props.ads) {
			const joinedArr = props.ads.concat(products);
			// console.log(joinedArr);
			joinedArr.forEach((el) => {
				const category = el.category;
				if (categoryObj[category]) {
					categoryObj[category] = [...categoryObj[category], el];
				} else {
					categoryObj[category] = [el];
				}
			});
			for (const category in categoryObj) {
				productsArr.push({
					category: category,
					products: categoryObj[category],
				});
			}

			setAllProducts(productsArr);
		}
	}, [products, props.ads]);

	// Check if user is logged
	if (!props.isAuth) {
		return <Navigate to="/login" />;
	}

	return props.loading ? (
		<Spinner />
	) : (
		<Box sx={boardStyle}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					width: "100%",
				}}
			>
				<h4 style={{ color: "black" }}>Auction Products</h4>
				<button className="viewAllBtn">VIEW ALL</button>
			</div>
			<Box sx={adAreaStyle}>
				{props.ads.map((ad, index) => {
					if (index > 4) return null;
					return ad.auctionEnded ? null : (
						<AuctionItem ad={ad} key={ad._id} />
					);
				})}
			</Box>
			<div>
				{allProducts.map((categories, idx) => {
					console.log(categories);
					return (
						<div key={idx}>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									width: "100%",
								}}
							>
								<h4 style={{ color: "black" }}>
									{categories.category}
								</h4>
								<button className="viewAllBtn">VIEW ALL</button>
							</div>
							<Box sx={adAreaStyle}>
								{categories.products.map((product, index) => {
									if (product.room) {
										return <AuctionItem ad={product} key={index} />;
									} else {
										return (
											<Col
												key={product._id}
												sm={12}
												md={6}
												lg={4}
												xl={3}
											>
												<Product product={product} />
											</Col>
										);
									}
								})}
							</Box>
							{/* <Box sx={adAreaStyle}>
								{props.ads.map((ad, index) => {
									if (index > 4) return null;
									return ad.auctionEnded ? null : (
										<AuctionItem ad={ad} key={ad._id} />
									);
								})}
							</Box> */}
						</div>
					);
				})}
			</div>
		</Box>
	);
};

const mapStateToProps = (state) => ({
	ads: state.ad.ads,
	loading: state.auth.loading,
	isAuth: state.auth.isAuthenticated,
	user: state.auth.user,
});

export default connect(mapStateToProps, {
	loadAds,
	adPostedByOther,
	setAlert,
	updateAdInList,
	clearAlerts,
})(Board);
