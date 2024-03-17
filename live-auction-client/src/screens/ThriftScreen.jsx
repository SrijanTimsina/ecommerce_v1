import ProductListScreen from "./admin/ProductListScreen";
import { useSelector, useDispatch } from "react-redux";
import { useGetUserDetailsQuery } from "../slices/usersApiSlice";
import { useEffect, useState } from "react";

const ThriftScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: users,
    refetch,
    isLoading,
    error,
  } = useGetUserDetailsQuery(userInfo._id);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (users) {
      setOrders(users.thriftOrders);
    }
  }, [users]);

  return (
    <>
      <div className="user-listed-products">
        <ProductListScreen thrift={true} id={userInfo?._id} />
        <h1>Your Order Details</h1>
        <div className="overallThriftContainer">
          {orders &&
            orders.length > 0 &&
            orders.map((order, id) => (
              <div className="thriftOrderContainer" key={id}>
                <div className="thriftInfo">
                  <p className="bold">Product Name :</p>
                  <p>{order.name}</p>
                </div>
                <div className="thriftInfo">
                  <p className="bold">Product Quantity :</p>
                  <p>{order.qty}</p>
                </div>
                <div className="thriftInfo">
                  <p className="bold">Amount Receiveable :</p>
                  <p>{order.totalPrice}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default ThriftScreen;
