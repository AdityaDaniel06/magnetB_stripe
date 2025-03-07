import { useEffect, useState } from "react";
import axios from "axios";

import ProductItem from "../features/Product/ProductItem";
import Spinner from "react-bootstrap/Spinner";
import { Container, Row, Col } from "react-bootstrap";

function Homepage() {
  const [responseData, setResponseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    try {
      setIsLoading(true);
      const resp = await axios.get("https://dummyjson.com/products");
      setResponseData(resp.data.products);
    } catch (err) {
      console.error("Error fetching data: ", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="secondary" size="lg" />
      </div>
    );

  return (
    <Container fluid className="py-5">
      <Row className="g-4 justify-content-center">
        {responseData.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4}>
            <ProductItem data={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Homepage;
