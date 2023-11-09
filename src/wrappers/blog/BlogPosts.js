import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { generatePublicUrl } from "../../urlConfig";
import Chip from "@mui/material/Chip";

const BlogPosts = (props) => {
  const { user } = props;
  const getOrderStatus = (orderStatus) => {
    let type = "ordered";
    for (const status of orderStatus) {
      if (status.isCompleted) {
        type = status.type;
      }
    }
    return type;
  };
  const getColor = (typeOrder) => {
    if (typeOrder === "ordered") {
      return "primary";
    } else if (typeOrder === "packed") {
      return "secondary";
    } else if (typeOrder === "shipped") {
      return "warning";
    } else if (typeOrder === "delivered") {
      return "success";
    } else {
      return "error";
    }
  };
  return (
    <Fragment>
      {user.map((order) => {
        return order.items.map((item) => (
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="blog-wrap-2 mb-30">
              <div className="blog-img-2">
                <Link to={`/order_details/${order._id}`}>
                  <img
                    // src={process.env.PUBLIC_URL + "/assets/img/blog/blog-9.jpg"}
                    src={generatePublicUrl(
                      item.productId.productPictures[0].img
                    )}
                    alt=""
                  />
                </Link>
              </div>
              <div className="blog-content-2">
                <div className="blog-meta-2">
                  <ul>
                    <li>
                      {new Date(order.createdAt).getDate() +
                        "/" +
                        new Date(order.createdAt).getMonth() +
                        "/" +
                        new Date(order.createdAt).getFullYear()}
                    </li>
                    <li>
                      <Link to={`/order_details/${order._id}`}>
                        {order._id}
                      </Link>
                    </li>
                  </ul>
                </div>
                <h4>
                  <Link to={`/order_details/${order._id}`}>
                    {item.productId.name}
                  </Link>
                </h4>
                <p>
                  Amount:{" "}
                  {item.payablePrice.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
                <p>Quantity: {item.purchasedQty}</p>
                <div className="blog-share-comment">
                  <div className="blog-btn-2">
                    <Link to={`/order_details/${order._id}`}>read more</Link>
                  </div>
                  <div className="">
                    <Chip
                      color={getColor(getOrderStatus(order.orderStatus))}
                      label={getOrderStatus(order.orderStatus)}
                    />
                    <div className="share-social">
                      <ul>
                        <li></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ));
      })}
    </Fragment>
  );
};

export default BlogPosts;
