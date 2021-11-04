import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import cartActions from "../redux/actions/cart.actions";
import bookActions from "../redux/actions/book.actions";
const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const BookDetailPage = () => {
  const [addingBook, setAddingBook] = useState(false);
  const [addingBookToCart, setAddingBookToCart] = useState(false);
  const params = useParams();
  const bookId = params.id;

  const addToReadingList = (book) => {
    setAddingBook(book);
  };

  const addToCart = (book) => {
    setAddingBookToCart(book);
  };

  useEffect(() => {
    if (addingBook) {
      dispatch(bookActions.addToFavorite({addingBook}))
    }
  }, [addingBook]);

  useEffect(() => {
    if (addingBookToCart) {
      dispatch(cartActions.addToCart({addingBookToCart}))
    }
  }, [addingBookToCart]);

  const dispatch = useDispatch();
  const book = useSelector((state) => state.books.books);
  const loading = useSelector(state => state.books.loading);
  // console.log("book", book);
  // const errorMessage = useSelector(state => state.books.errorMessage);
  useEffect(() => {
    dispatch(bookActions.getBookDetail({bookId}));
  }, [bookId]);

  return (
    <Container>
      {loading ? (
        <div className="text-center">
          <ClipLoader color="#f86c6b" size={150} loading={true} />
        </div>
      ) : (
        <Row className="border border-info mt-5">
          <Col md={3}>
            {book && (
              <img
                className="w-100"
                src={`${BACKEND_API}/${book.imageLink}`}
                alt=""
              />
            )}
          </Col>
          <Col md={9}>
            {book && (
              <>
                <h2>{book.title}</h2>
                <div>
                  <strong>Author:</strong> {book.author}
                </div>
                <div>
                  <strong>Year:</strong> {book.year}
                </div>
                <div>
                  <strong>Country:</strong> {book.country}
                </div>
                <div>
                  <strong>Pages:</strong> {book.pages}
                </div>
                <div>
                  <strong>Language:</strong> {book.language}
                </div>
                <Button onClick={() => addToReadingList(book)}>
                  Add to Reading List
                </Button>{" "}
                <Button onClick={() => addToCart(book)}>
                  Add to Your Cart
                </Button>{" "}
              </>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default BookDetailPage;
