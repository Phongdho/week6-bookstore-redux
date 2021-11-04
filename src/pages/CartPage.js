import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import cartActions from "../redux/actions/cart.actions";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const CartPage = () => {

    const history = useHistory();
  
    const handleClickBook = (bookId) => {
      history.push(`/books/${bookId}`);
    };
  
    const removeBook = (bookId) => {
      dispatch(cartActions.deleteCart({removedBookId: bookId}));
    };
  
    const dispatch = useDispatch();
    const loading = useSelector(state => state.carts.loading);
    const books = useSelector(state => state.carts.cartBooks);
  
    useEffect(() => {
      dispatch(cartActions.getCart());
    }, []);
  
  
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <h1 className="text-center">Your Cart</h1>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            {loading ? (
              <div className="text-center">
                <ClipLoader color="#f86c6b" size={150} loading={true} />
              </div>
            ) : (
              <ul className="list-unstyled d-flex flex-wrap justify-content-between" style={{display:"flex", flexDirection:"column", justifyContent:"center" }}>
                {books.map((book) => (
                  <li key={book.id}>
                    <Card
                      style={{
                        width: "60vw",
                        height: "20vh",
                        marginBottom: "2rem",
                        position: "relative",
                        display: "flex",
                        flexDirection:"row",
                        alignContent: "space-around"
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={`${BACKEND_API}/${book.imageLink}`}
                        onClick={() => handleClickBook(book.id)}
                        style={{width:"100px"}}
                      />
                      <Card.Body style={{marginLeft:"100px"}}>
                        <Card.Title>Book: {book.title}</Card.Title>
                        <Card.Text>By: {book.author}</Card.Text>
                        <Button
                          className="position-absolute btn-danger"
                          style={{ top: "5px", right: "5px" }}
                          size="sm"
                          onClick={() => removeBook(book.id)}
                        >
                          &times;
                        </Button>
                      </Card.Body>
                    </Card>
                  </li>
                ))}
              </ul>
            )}
            <div style={{textAlign:"right", width:"60vw"}}>
                Total Order Quantity: {books.length}
            </div>
            <div style={{textAlign:"right", width:"60vw", marginTop:"2rem"}}>
            <Button>Checkout</Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default CartPage;
  
