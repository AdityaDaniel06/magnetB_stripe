import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";

import { useSelector } from "react-redux";
import { Link } from "react-router";
import { getTotalQuantity } from "../../slice/cartSlice";

function TopNavbar() {
  const totalQuantity = useSelector(getTotalQuantity);

  return (
    <Navbar bg="success" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fs-3">
          <IoHomeOutline size={35} /> My Demo Shop
        </Navbar.Brand>
        <Nav className="me-auto ">
          <Nav.Link as={Link} to="/" className="text-white fs-5">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/features" className="text-white fs-5">
            Features
          </Nav.Link>
          <Nav.Link as={Link} to="/pricing" className="text-white fs-5">
            Pricing
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link
            as={Link}
            to="/view-cart"
            className="text-white fs-5 position-relative"
          >
            <MdOutlineShoppingCart size={30} />
            <span
              className="position-absolute top-0 end-0 rounded-circle text-success bg-white font-weight-bold px-1"
              style={{ fontSize: "12px" }}
            >
              {totalQuantity > 0 ? totalQuantity : ""}
            </span>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;
