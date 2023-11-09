import React from "react";
import Card from "../../components/UI/Card";

/**
 * @author
 * @function PriceDetails
 **/

const PriceDetails = (props) => {
  return (
    <Card headerLeft={"Price Details"} style={{ maxWidth: "380px" }}>
      <div
        style={{
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Price ({props.totalItem} items)</div>
          <div>
            {(+props.totalPrice).toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </div>
        </div>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Discount</div>
          <div>
            {" "}
            {props.totalDiscount
              ? (+props.totalDiscount).toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })
              : "0".toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
          </div>
        </div>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div>Total Amount</div>
          <div>
            {props.totalDiscount
              ? (+props.totalPrice - props.totalDiscount).toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })
              : (+props.totalPrice).toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PriceDetails;
