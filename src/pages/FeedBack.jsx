import React, { useState } from 'react';
import style from './feedback.module.css';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import axios from 'axios';
function FeedBack() {
  const [feedtype, setFeedtype] = useState('Suggestion');
  const [feeddate, setFeeddate] = useState('');
  const [feeddlts, setFeeddlts] = useState('');

  const handleType = (e) => {
    setFeedtype(e.target.value);
  };
  const handleform = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/studentauth/feedback', {
        feeddate,
        feeddlts,
        feedtype,
      })
      .then((res) => {
        if (res.data.status) {
          toast('feedback done!', { position: 'bottom-center' });
          setFeeddate('');
          setFeeddlts('');
          setFeedtype('');
        } else {
          toast('feedback err!', { position: 'bottom-center' });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={style.main}>
      <div className={style.content}>
        <h4>Give your valuable feedback</h4>
        <form onSubmit={handleform}>
          <div className={style.ftype}>
            <label htmlFor='fedtype'>Feedback Type: </label>
            <select
              required
              name='sel'
              id='sel'
              value={feedtype}
              onChange={handleType}
            >
              <option value='Complaint'>Complaint</option>
              <option value='Advice'>Advice</option>
              <option value='Suggestion'>Suggestion</option>
              <option value='Question'>Question</option>
              <option value='Other'>Other</option>
            </select>
          </div>
          <div className={style.ftype}>
            <label htmlFor='date'>FeedBack Date:</label>
            <input
              type='date'
              required
              value={feeddate}
              name='date'
              onChange={(e) => setFeeddate(e.target.value)}
              id='date'
            />
          </div>
          <div className={style.feddlts}>
            <label htmlFor='feddtls'>Feedback Details: </label>
            <br />
            <textarea
              className={style.txt}
              required
              name='textarea'
              id='feddtls'
              value={feeddlts}
              placeholder='Maximum 70 words.....'
              onChange={(e) => setFeeddlts(e.target.value)}
            ></textarea>
          </div>
          <div className={style.btn}>
            <Button variant='outline-success' type='submit'>
              Submit Now
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FeedBack;
