import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import style from './showbook.module.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
function ShowBook() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:4000/auth/showbook')
      .then((res) => {
        if (res.data.status) {
          setBooks(res.data.data);
        } else {
          toast('book not fetch', { position: 'top-center' });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDlt = (id) => {
    axios.delete(`http://localhost:4000/auth/deletebook/${id}`).then((res) => {
      if (res.data.status) {
        axios
          .get('http://localhost:4000/auth/showbook')
          .then((res) => {
            if (res.data.status) {
              setBooks(res.data.data);
            } else {
              toast('book not fetch', { position: 'top-center' });
            }
          })
          .catch((err) => console.log(err));
      } else {
        toast('book not deleted', { position: 'top-center' });
      }
    });
  };
  return (
    <div className={style.main}>
      <div className={style.content}>
        {books.map((book, i) => {
          return (
            <div key={i} className={style.card}>
              <div className={style.imgBox}>
                <img
                  className={style.img}
                  src={`http://localhost:4000/images/${book.image}`}
                  alt='image not found'
                />
              </div>
              <div className={style.cardinfo}>
                <h6>
                  {' '}
                  <strong> Book name:</strong> {book.name}
                </h6>
                <h6>
                  {' '}
                  <strong>Semester:</strong> {book.semester}
                </h6>
                <h6>
                  {' '}
                  <strong> Price:</strong> {book.price}
                </h6>
                <h6>
                  {' '}
                  <strong>Quantity:</strong> {book.quantity}
                </h6>
                <h6>
                  {' '}
                  <strong>Author:</strong> {book.author}
                </h6>
              </div>
              <div className={style.actions}>
                <Link onClick={() => handleDlt(book.id)}>
                  <Button variant='outline-danger'>Delete</Button>
                </Link>
                <Link to={`/dashbord/editbook/${book.id}`}>
                  <Button variant='outline-info'>Edit</Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShowBook;
