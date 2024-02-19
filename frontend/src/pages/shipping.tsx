import React, { useState, ChangeEvent, FormEvent } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

const Shipping = () => {
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phone: "",
  });

  function handleShippingInfo(e: ChangeEvent<HTMLInputElement>) {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Your submit logic here, like sending data to server or navigating to another page
    console.log("Form submitted with shipping info:", shippingInfo);
    setShippingInfo({
      address: "",
      city: "",
      state: "",
      pinCode: "",
      country: "",
      phone: "",
    });
  }

  return (
    <div className="shipping-info">
      <Link to="/">
        <BiArrowBack />
      </Link>
      <h1>Shipping Address</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="address"
          name="address"
          value={shippingInfo.address}
          onChange={handleShippingInfo}
        />

        <input
          type="text"
          placeholder="city"
          name="city"
          value={shippingInfo.city}
          onChange={handleShippingInfo}
        />
        <input
          type="text"
          placeholder="state"
          name="state"
          value={shippingInfo.state}
          onChange={handleShippingInfo}
        />
        <input
          type="text"
          placeholder="pinCode"
          name="pinCode"
          value={shippingInfo.pinCode}
          onChange={handleShippingInfo}
        />
        <input
          type="text"
          placeholder="country"
          name="country"
          value={shippingInfo.country}
          onChange={handleShippingInfo}
        />
        <input
          type="text"
          placeholder="phone"
          name="phone"
          value={shippingInfo.phone}
          onChange={handleShippingInfo}
        />

        <button type="submit">PayNow</button>
      </form>
    </div>
  );
};

export default Shipping;
