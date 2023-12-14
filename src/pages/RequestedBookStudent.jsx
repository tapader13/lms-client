import React, { useEffect, useState } from 'react';
import style from './requestedbookstudent.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
function RequestedBookStudent() {
  const [issupending, setissupending] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/studentauth/issuependingrequest')
      .then((res) => {
        setissupending(res.data.result);
      })
      .catch((err) => {
        toast('err! in fetch data', { position: 'top-center' });
      });
  }, []);
  const handleReturn = (id) => {
    axios
      .put(`http://localhost:4000/studentauth/returnpendingrequest/${id}`)
      .then((res) => {
        if (res.data.status) {
          toast('Return book Request Pending Now!', { position: 'top-left' });
        } else {
          toast('Err in fetch data,returnpendingrequest!', {
            position: 'top-left',
          });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={style.main}>
      <div className={`${style.content}`}>
        {issupending.map((pandissu, i) => {
          const { id, userid, bookid, issued, returned } = pandissu;
          return (
            <div key={i} className={style.card}>
              <div className={style.cardinfo}>
                <p>Id: {id}</p>
                <p>User Id: {userid}</p>
                <p>Book Id: {bookid}</p>
                <p>
                  Issued Status:{' '}
                  <span style={{ color: 'green' }}>{issued}</span>
                </p>
                <p>
                  Returned Status:
                  <span style={{ color: 'red' }}> {returned}</span>
                </p>
              </div>
              <div className={style.actions}>
                {issued === 'accept' && returned !== 'accept' && (
                  <Link onClick={() => handleReturn(id)}>
                    <Button variant='outline-danger'>Return</Button>
                  </Link>
                )}
                <Link to={`/student/dashbord/bookdetails/${pandissu.bookid}`}>
                  <Button variant='outline-info'>Details</Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RequestedBookStudent;
