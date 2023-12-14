import React from 'react';
import style from './more.module.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet } from 'react-router-dom';
function More() {
  return (
    <div className={style.main}>
      {/* <div className={`${style.navbar} ${style.posfixed}`}>
        <Navbar data-bs-theme='dark'>
          <Container>
            <Navbar.Brand>
              <Link
                to={'/student/dashbord/studentMore/fed'}
                className={style.link}
              >
                FeedBack
              </Link>{' '}
            </Navbar.Brand>
            <Navbar.Brand>
              <Link
                to={'/student/dashbord/studentMore/hist'}
                className={style.link}
              >
                History
              </Link>{' '}
            </Navbar.Brand>
          </Container>
        </Navbar>
      </div>
      <div className={style.out}>
        <Outlet />
      </div> */}
    </div>
  );
}

export default More;
