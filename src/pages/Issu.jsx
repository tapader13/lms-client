import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import style from './issu.module.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';

function Issu() {
  const [pending, setPending] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:4000/auth/issuependingbook')
      .then((res) => {
        if (res.data.status) {
          setPending(res.data.data);
        } else {
          toast('err in fetch data', { position: 'top-left' });
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className={style.main}>
        <div className={`${style.content}`}>
          {pending.map((pandissu, i) => {
            return (
              <div key={i} className={style.card}>
                <div className={style.cardinfo}>
                  <p>Id: {pandissu.id}</p>
                  <p>User Id: {pandissu.userid}</p>
                  <p>Book Id: {pandissu.bookid}</p>
                  <p>Issued Status: {pandissu.issued}</p>
                  <p>Returned Status: {pandissu.returned}</p>
                </div>
                <div className={style.actions}>
                  <Link to={`/dashbord/pendingdetails/${pandissu.id}`}>
                    <Button variant='outline-info'>Details</Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Issu;
