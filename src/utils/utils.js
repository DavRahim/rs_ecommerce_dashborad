import io from "socket.io-client";
export const overRightStyle = {
  display: "flex",
  margin: "0 auto",
  height: "20px",
  justifyContent: "center",
  alignItem: "center",
};

export const socket = io("https://rs-ecommerce-server.onrender.com");
