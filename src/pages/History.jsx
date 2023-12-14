import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import style from './history.module.css';
function History() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:4000/studentauth/history')
      .then((res) => {
        if (res.data.status) {
          setBooks(res.data.result);
        } else {
          toast('err!', { position: 'top-left' });
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={style.main}>
      <div className={style.content}>
        {books.map((book, i) => {
          return (
            <div className={`${style.card} shadow-lg  rounded`} key={i}>
              <h6>Book Id: {book.bid}</h6>
              <h6>Book Name: {book.name}</h6>
              <h6>Book Author: {book.author}</h6>
              <h6>Issued: {book.issued}</h6>
              <h6>Returned: {book.returned}</h6>
              <h6>Semester: {book.semester}</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default History;
