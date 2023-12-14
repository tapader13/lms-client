import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import style from './dashbord.module.css';
import { toast } from 'react-toastify';
import { MdOutlinePending } from 'react-icons/md';
import { AiFillFileAdd } from 'react-icons/ai';
import { MdLocalLibrary } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaOdysee } from 'react-icons/fa6';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GiTireIronCross } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineLogout } from 'react-icons/ai';
import { GoGitPullRequest } from 'react-icons/go';
import axios from 'axios';
function Dashbord() {
  const navigate = useNavigate();
  const [leftvisible, setLeftvisible] = useState(false);
  const handleHamburger = () => {
    setLeftvisible(!leftvisible);
  };

  const handleLogout = () => {
    axios
      .get('http://localhost:4000/auth/logout')
      .then((res) => {
        if (res.data.status) {
          localStorage.removeItem('valid');

          navigate('/');
        } else {
          toast.error('Something Wrong in Logout', { position: 'top-center' });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className={` ${style.main}`}>
        <div className={` fixed-top  ${style.fixednav}`}>
          <div className={`text-center py-3  text-danger ${style.headenav}`}>
            <div className={`fs-2 fw-bold ${style.navleft}`}>
              <span className={style.menu_icon}>
                {' '}
                {leftvisible ? (
                  <GiTireIronCross onClick={handleHamburger} />
                ) : (
                  <GiHamburgerMenu onClick={handleHamburger} />
                )}
              </span>
            </div>
            <div className={`fs-2 fw-bold ${style.navleft}`}>
              <span>
                {' '}
                <MdLocalLibrary />
              </span>
              <span style={{ color: 'rgb(100, 50, 150)' }}>LMS</span>
            </div>
            <div className={`fs-2 fw-bold ${style.navleft}`}>
              <span className={style.numbicon}>
                {' '}
                <BsFillTelephoneFill />
              </span>
              <span className={style.number}> +8801786224382</span>
            </div>
            <div className={style.mainname}>
              <h3 className='fs-2 fw-bold '>
                {' '}
                <span style={{ color: 'rgb(100, 50, 150)' }}>Library</span>{' '}
                <span style={{ color: 'rgb(20, 150, 90)' }}>Management</span>{' '}
                <span style={{ color: 'rgb(200, 100, 50)' }}>System</span>
              </h3>
            </div>
          </div>
        </div>
        <div className={` ${style.content}`}>
          <div
            className={` vh-100  ${style.leftSidebar} ${
              leftvisible ? style.responleft : ''
            }`}
          >
            <div className={` ${style.part} ${style.partdash}`}>
              <Link to='/dashbord' className={style.link}>
                <span>
                  <i className='bi bi-speedometer2'></i>
                </span>
                <span>Dashboard</span>
              </Link>
            </div>
            <div className={` ${style.part}`}>
              <Link to={'/dashbord/profile'} className={style.link}>
                <span>
                  <CgProfile />
                </span>
                <span>Profile</span>
              </Link>
            </div>
            <div className={` ${style.part}`}>
              <Link onClick={handleLogout} className={style.link}>
                <span>
                  <AiOutlineLogout />
                </span>
                <span>Logout</span>
              </Link>
            </div>
            <div className={` ${style.part}`}>
              <Link to={'/dashbord/addbook'} className={style.link}>
                <span>
                  <AiFillFileAdd />
                </span>
                <span>Add Books</span>
              </Link>
            </div>
            <div className={` ${style.part}`}>
              <Link to={'/dashbord/showbook'} className={style.link}>
                <span>
                  <FaOdysee />
                </span>
                <span>Show Books</span>
              </Link>
            </div>
            <div className={` ${style.part}`}>
              <Link to={'/dashbord/acceptrequestbook'} className={style.link}>
                <span>
                  <GoGitPullRequest />
                </span>
                <span>Accepted Book</span>
              </Link>
            </div>
            <div className={` ${style.part}`}>
              <Link to={'/dashbord/issupending'} className={style.link}>
                <span>
                  <GoGitPullRequest />
                </span>
                <span>Issue Pending</span>
              </Link>
            </div>
            <div className={` ${style.part}`}>
              <Link to={'/dashbord/returnpending'} className={style.link}>
                <span>
                  <MdOutlinePending />
                </span>
                <span>Return Pending</span>
              </Link>
            </div>
          </div>
          <div className={` ${style.rightContent}`}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashbord;
