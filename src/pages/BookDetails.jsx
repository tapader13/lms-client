import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import style from './bookdetails.module.css';
import Button from 'react-bootstrap/esm/Button';
function BookDetails() {
  const [details, setDetails] = useState([]);
  const { bookid } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:4000/studentauth/issuependbookdtls/${bookid}`)
      .then((res) => {
        if (res.data.status) {
          setDetails(res.data.data);
        } else {
          toast('err! in fetch data', { position: 'top-center' });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleBack = () => {
    navigate('/student/dashbord/requestedbooks');
  };
  return (
    <div className={style.main}>
      <div className={style.content}>
        {details.map((dtls, i) => {
          return (
            <div key={i} className={style.card}>
              <div className={style.imgBox}>
                <img
                  height={'100%'}
                  width={'100%'}
                  className={style.img}
                  src={`http://localhost:4000/images/${dtls.image}`}
                  alt='image not found'
                />
              </div>
              <div className={style.cardinfo}>
                <h6>
                  <strong>Book Id:</strong> {dtls.id}
                </h6>
                <h6>
                  <strong>Book Status:</strong> {dtls.status}
                </h6>
                <h6>
                  <strong>Book name:</strong> {dtls.name}
                </h6>
                <h6>
                  <strong>Semester:</strong> {dtls.semester}
                </h6>
                <h6>
                  <strong>Price:</strong> {dtls.price}
                </h6>
                <h6>
                  <strong>Quantity:</strong> {dtls.quantity}
                </h6>
                <h6>
                  <strong>Author:</strong> {dtls.author}
                </h6>
              </div>
              <div className={style.actions}>
                <Button onClick={handleBack} variant='outline-danger'>
                  Back
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BookDetails;
