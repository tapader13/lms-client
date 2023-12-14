import React, { useEffect, useState } from 'react';
import style from './feedbacksolve.module.css';
import axios from 'axios';
import moment from 'moment';
import Button from 'react-bootstrap/esm/Button';
import { Link, useNavigate } from 'react-router-dom';
function FeedbackSolve() {
  const [dlts, setDlts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get('http://localhost:4000/auth/feedbackdlts')
      .then((res) => {
        if (res.data.status) {
          setDlts(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleBack = () => {
    navigate('/dashbord');
  };
  return (
    <div className={style.main}>
      <div style={{ textAlign: 'center' }}>
        <Button onClick={handleBack} variant='primary'>
          Back
        </Button>
      </div>
      <div className={style.content}>
        {dlts.map((dlt, i) => {
          return (
            <div className={style.card} key={i}>
              <h5>
                {' '}
                <strong>Id: </strong> {dlt.id}
              </h5>
              <h5>
                {' '}
                <strong>Userid: </strong> {dlt.userid}
              </h5>
              <h5>{dlt.status}</h5>
              <h6>
                {' '}
                <strong>Date: </strong>{' '}
                {moment(dlt.feedback_date).format('D-M-Y')}
              </h6>
              <h5>
                {' '}
                <strong>Type: </strong> {dlt.feedback_type}
              </h5>
              <h5>
                {' '}
                <strong>Details:</strong> {dlt.feedback_details}
              </h5>
              <div style={{ textAlign: 'center' }}>
                <Link to={`/dashbord/particularuser/${dlt.id}`}>
                  <Button variant='success'>Solve</Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FeedbackSolve;
