import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const product = ({ product }) => {
	console.log(product);
	return (
		<Card className="my-3 p-3 productCard">
			<Link to={`/product/${product._id}`}>
				<Card.Img
					src={product.image}
					variant="top"
					className="productImage"
				/>
			</Link>

			<Card.Body>
				<Link to={`/product/${product._id}`} className="productTitle">
					<Card.Title as="div" className="productTitle">
						{product.name}
					</Card.Title>
				</Link>

				<Card.Text className="productPrice">
					Rs{product.price}
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default product;
