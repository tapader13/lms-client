import React from 'react';
import style from './starter.module.css';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
function StarterPage() {
  return (
    <>
      <div className={style.main}>
        <div className={style.content}>
          <h2>Library Manegment System</h2>

          <h5>Developed By Minhaj Tapader</h5>

          <Link to={'/adminlogin'}>
            <Button variant='btn btn-outline-info'>Get Started</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default StarterPage;
