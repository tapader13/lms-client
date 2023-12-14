import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import style from './returndetails.module.css';
import Button from 'react-bootstrap/esm/Button';
function ReturnedDitails() {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.bookid;
  const [bookdlts, setBookdlts] = useState([]);
  const [userdlts, setUserdlts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/auth/detailsreturnbookuser/${id}`)
      .then((res) => {
        if (res.data.status) {
          setBookdlts(res.data.book);
          setUserdlts(res.data.user);
        } else {
          toast('err! found in fetch data');
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleBack = () => {
    navigate('/dashbord/returnpending');
  };
  const handleReject = () => {
    axios
      .put(`http://localhost:4000/auth/rejectreturnbookadmin/${id}`)
      .then((res) => {
        if (res.data.status) {
          toast('book returned rejected!', { position: 'top-left' });
          navigate('/dashbord/issupending');
        } else {
          toast('err in reject part!', { position: 'top-right' });
        }
      })
      .catch((err) => console.log(err));
  };
  const handleAccept = () => {
    axios
      .put(`http://localhost:4000/auth/acceptreturnbookadmin/${id}`)
      .then((res) => {
        if (res.data.status) {
          toast('book return accepted!', { position: 'top-left' });
          navigate('/dashbord/issupending');
        } else {
          toast('err in accept part!', { position: 'top-right' });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={style.main}>
      <div className={style.content}>
        <div className={style.card}>
          {bookdlts.map((bkt, i) => {
            return (
              <div key={i} className={style.card1}>
                <h4>Book Details</h4>
                <h6>
                  <strong>Id:</strong> {bkt.id}
                </h6>
                <h6>
                  <strong>Name:</strong> {bkt.name}
                </h6>
                <h6>
                  <strong>Price:</strong> {bkt.price}
                </h6>
                <h6>
                  <strong>Quantity:</strong> {bkt.quantity}
                </h6>
                <h6>
                  <strong>Semester:</strong> {bkt.semester}
                </h6>
                <div className={style.btn}>
                  <Button
                    variant='success'
                    onClick={() => handleAccept(bkt.id)}
                  >
                    Accept
                  </Button>
                  <Button onClick={() => handleReject(bkt.id)} variant='danger'>
                    Reject
                  </Button>
                </div>
              </div>
            );
          })}
          {userdlts.map((usr, i) => {
            return (
              <div key={i} className={style.card2}>
                <h4>User Details</h4>
                <h6>
                  <strong>Id:</strong>
                  {usr.id}
                </h6>
                <h6>
                  <strong>Name:</strong>
                  {usr.name}
                </h6>
                <h6>
                  <strong>Email:</strong>
                  {usr.email}
                </h6>
                <h6>
                  <strong>Role:</strong>
                  {usr.role}
                </h6>
              </div>
            );
          })}
          <div>
            <Button onClick={handleBack} variant='primary'>
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReturnedDitails;
