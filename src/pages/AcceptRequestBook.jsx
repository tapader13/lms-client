import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import style from './acceptbookrequest.module.css';
function AcceptRequestBook() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:4000/auth/acceptrequest')
      .then((res) => {
        if (res.data.status) {
          setBooks(res.data.data);
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
              <h6>Book Id: {book.bookid}</h6>
              <h6>User Id: {book.userid}</h6>
              <h6>Issued: {book.issued}</h6>
              <h6>Book Name: {book.bookname}</h6>
              <h6>Author Name: {book.author}</h6>
              <h6>Semester: {book.semester}</h6>
              <h6>Username: {book.username}</h6>
              <h6>User Email: {book.author}</h6>
              <h6>User Role: {book.role}</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AcceptRequestBook;
