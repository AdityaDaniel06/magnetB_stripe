/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { addItems, getCart } from "../../slice/cartSlice";
import { useState } from "react";

function ProductItem({ data }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const cart = useSelector(getCart);

  const { price, rating, thumbnail, title, description, id } = data;

  function handleAddToCart() {
    console.log(cart);

    const newItem = {
      id,
      title,
      price,
      rating,
      thumbnail,
      quantity: 1,
    };
    const exists = cart.some((item) => item.id === id);
    if (exists) {
      alert("Product is already in the cart!");
    } else {
      dispatch(addItems(newItem));
      // alert("Product added to the cart!");
    }
  }
  return (
    <Card
      className="shadow-lg rounded-3 border-1 overflow-hidden card-hover"
      style={{ width: "20rem" }}
    >
      <Card.Img
        variant="top"
        src={thumbnail}
        className={`img-fluid ${!loading ? "d-none" : ""}`}
        onLoad={() => setLoading(true)}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className="text-muted text-justify small">
          {description}
        </Card.Text>
        <Card.Text className="text-warning">⭐ {rating}</Card.Text>
        <Card.Text>
          <strong className="">${price}</strong>
        </Card.Text>
        <Button variant="success" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductItem;
