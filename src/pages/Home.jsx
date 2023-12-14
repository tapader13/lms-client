import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Card from 'react-bootstrap/Card';
import style from './home.module.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
ChartJS.register(ArcElement, Tooltip, Legend);
function Home() {
  const [totalBook, setTotalBook] = useState(0);
  const [issued, setIssued] = useState(0);
  const [retpend, setRetpend] = useState(0);
  const [typetotal, setTypetotal] = useState(0);
  const [feedback, setFeedback] = useState(0);
  const [totaladmin, setTotaladmin] = useState(0);

  useEffect(() => {
    totalbookcount();
    issuedbookcount();
    retpendingcount();
    totaltypeofbooks();
    totaladmincount();
    totalFeedback();
  }, []);
  const totalFeedback = () => {
    axios.get('http://localhost:4000/auth/totalfeedback').then((res) => {
      if (res.data.status) {
        setFeedback(res.data.total);
      } else {
        toast.error('🦄 error for fetch total book!', {
          position: 'top-center',
          draggable: true,
          theme: 'colored',
        });
      }
    });
  };
  const totalbookcount = () => {
    axios.get('http://localhost:4000/auth/totalbook').then((res) => {
      if (res.data.status) {
        setTotalBook(res.data.total);
      } else {
        toast.error('🦄 error for fetch total book!', {
          position: 'top-center',
          draggable: true,
          theme: 'colored',
        });
      }
    });
  };
  const totaltypeofbooks = () => {
    axios.get('http://localhost:4000/auth/totaltypebook').then((res) => {
      if (res.data.status) {
        setTypetotal(res.data.total);
      } else {
        toast.error('🦄 error for fetch total type book!', {
          position: 'top-center',
          draggable: true,
          theme: 'colored',
        });
      }
    });
  };
  const issuedbookcount = () => {
    axios.get('http://localhost:4000/auth/issuedcount').then((res) => {
      if (res.data.status) {
        setIssued(res.data.total);
      } else {
        toast.error('🦄 error for fetch pending issue!', {
          position: 'top-center',
          draggable: true,
          theme: 'colored',
        });
      }
    });
  };
  const retpendingcount = () => {
    axios.get('http://localhost:4000/auth/retpending').then((res) => {
      if (res.data.status) {
        setRetpend(res.data.total);
      } else {
        toast.error('🦄 error for fetch return pending!', {
          position: 'top-center',
          draggable: true,
          theme: 'colored',
        });
      }
    });
  };
  const totaladmincount = () => {
    axios.get('http://localhost:4000/auth/totalcountadmin').then((res) => {
      if (res.data.status) {
        setTotaladmin(res.data.total);
      } else {
        toast.error('🦄 error for fetch return pending!', {
          position: 'top-center',
          draggable: true,
          theme: 'colored',
        });
      }
    });
  };
  return (
    <>
      <div className={style.main}>
        <div className={style.content}>
          <Card className={`${style.Card} ${style.Card1}`} border='info'>
            <Card.Header className={style.header}>Books</Card.Header>
            <Card.Body>
              <Card.Title>Total Number Of Books</Card.Title>
              <Card.Text>Books : {totalBook}</Card.Text>
            </Card.Body>
          </Card>
          <Card className={style.Card} border='info'>
            <Card.Header className={style.header}>Admins</Card.Header>
            <Card.Body>
              <Card.Title>Total Number Of Admins</Card.Title>
              <Card.Text>Total Admins : {totaladmin}</Card.Text>
            </Card.Body>
          </Card>
          <Card className={style.Card} border='primary'>
            <Card.Header className={style.header}>Issued Pending</Card.Header>
            <Card.Body>
              <Card.Title>Total Pending Books</Card.Title>
              <Card.Text>Pending Books: {issued}</Card.Text>
            </Card.Body>
          </Card>
          <Card className={style.Card} border='primary'>
            <Card.Header className={style.header}>Feedback Pending</Card.Header>
            <Card.Body>
              <Card.Title>Total Number of Feedback</Card.Title>
              <Card.Text>Feedbacks: {feedback}</Card.Text>
              <Link to={'/dashbord/feedbacksolve'}>
                <Button variant='outline-info'>Details</Button>
              </Link>
            </Card.Body>
          </Card>
          <Card className={style.Card} border='info'>
            <Card.Header className={style.header}>Types</Card.Header>
            <Card.Body>
              <Card.Title>Total Type Of Books</Card.Title>
              <Card.Text>Books : {typetotal}</Card.Text>
            </Card.Body>
          </Card>
          <Card className={style.Card} border='warning'>
            <Card.Header className={style.header}>Returned Pending</Card.Header>
            <Card.Body>
              <Card.Title>Total Pending Books</Card.Title>
              <Card.Text>Pending Books: {retpend}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className={style.chart}>
          <Pie
            data={{
              labels: [
                'totalBook',
                'totaladmin',
                'issued',
                'feedback',
                'typetotal',
                'retpend',
              ],
              datasets: [
                {
                  label: ': ',
                  data: [
                    totalBook,
                    totaladmin,
                    issued,
                    feedback,
                    typetotal,
                    retpend,
                  ],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                  ],
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
