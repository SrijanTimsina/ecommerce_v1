import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Typography } from "@mui/material";
import DashboardAdList from "../../components/DashboardAdList.js";

import {
	useGetProductsQuery,
	useDeleteProductMutation,
	useCreateProductMutation,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";

const ProductListScreen = ({ id }) => {
	const { pageNumber } = useParams();

	let { data, isLoading, error, refetch } = useGetProductsQuery({
		pageNumber,
	});

	const [deleteProduct, { isLoading: loadingDelete }] =
		useDeleteProductMutation();

	const deleteHandler = async (id) => {
		if (window.confirm("Are you sure")) {
			try {
				await deleteProduct(id);
				refetch();
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	const [createProduct, { isLoading: loadingCreate }] =
		useCreateProductMutation();

	const createProductHandler = async () => {
		if (
			window.confirm("Are you sure you want to create a new product?")
		) {
			try {
				await createProduct();

				refetch();
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	return (
		<div style={{ padding: "20px 30px" }}>
			<Row className="align-items-center">
				<Col>
					<h4>Products</h4>
				</Col>
				<Col className="text-end">
					<Button className="my-3" onClick={createProductHandler}>
						<FaPlus /> Create Product
					</Button>
				</Col>
			</Row>

			{loadingCreate && <Loader />}
			{loadingDelete && <Loader />}
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error.data.message}</Message>
			) : (
				<>
					<Table
						striped
						bordered
						hover
						responsive
						className="table-sm"
					>
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>PRICE</th>
								<th>CATEGORY</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{data.map((product) => {
								return (
									<tr key={product._id}>
										<td>{product._id}</td>
										<td>{product.name}</td>
										<td>${product.price}</td>
										<td>{product.category}</td>
										<td>
											<LinkContainer
												to={`/admin/product/${product._id}/edit`}
											>
												<Button
													variant="light"
													className="btn-sm mx-2"
												>
													<FaEdit />
												</Button>
											</LinkContainer>{" "}
											<Button
												variant="danger"
												className="btn-sm"
												onClick={() => deleteHandler(product._id)}
											>
												<FaTrash style={{ color: "white" }} />
											</Button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</>
			)}
			<div>
				<Typography variant="h5" style={{ marginTop: "30px" }}>
					Auction Products
				</Typography>
				<DashboardAdList />
			</div>
		</div>
	);
};

export default ProductListScreen;
