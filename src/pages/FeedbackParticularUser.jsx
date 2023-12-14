import React, { useState } from 'react';
import style from './feedbackparticular.module.css';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
function FeedbackParticularUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [text, setText] = useState('');
  const handleBack = () => {
    navigate('/dashbord/feedbacksolve');
  };
  const handleMail = () => {
    axios
      .post(`http://localhost:4000/auth/sendmailtouser/${id}`, { text })
      .then((res) => {
        if (res.data.status) {
          toast('mail send!', { position: 'top-center' });
          navigate('/dashbord/feedbacksolve');
        } else {
          toast('mail not send!', { position: 'top-center' });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className={style.main}>
        <div className={style.content}>
          <h3>Write Something For User</h3>
          <textarea
            className={style.txt}
            required
            name='solvetext'
            id='solvetext'
            placeholder='Send Mail Text To User...'
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <br />
          <div
            style={{
              textAlign: 'center',
              marginBlock: '5px',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <Button onClick={handleMail}>Submit Mail</Button>
            <Button onClick={handleBack}>Back</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedbackParticularUser;
