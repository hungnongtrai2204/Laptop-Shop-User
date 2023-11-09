import React from "react";
import { BiRupee } from "react-icons/bi";

/**
 * @author
 * @function Price
 **/

const Price = (props) => {
  const money = (+props.value).toLocaleString("vi", {
    style: "currency",
    currency: "VND",
  });
  var x = 1000;
  x = x.toLocaleString("vi", { style: "currency", currency: "VND" });
  console.log(x);
  return (
    <div
      style={{
        fontSize: props.fontSize ? props.fontSize : "14px",
        fontWeight: "bold",
        margin: "5px 0",
      }}
    >
      {/* <BiRupee /> */}
      {money}
    </div>
  );
};

export default Price;
