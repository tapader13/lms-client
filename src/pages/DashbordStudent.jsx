import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import style from './dashbordstudent.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CiCirclePlus } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdLocalLibrary } from 'react-icons/md';
import { CiFacebook } from 'react-icons/ci';
import { FaGithub } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';
import { GoGitPullRequest } from 'react-icons/go';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GiTireIronCross } from 'react-icons/gi';
import { FiSun } from 'react-icons/fi';
import { MdDarkMode } from 'react-icons/md';

import Button from 'react-bootstrap/esm/Button';
function DashbordStudent() {
  const navigate = useNavigate();
  const [leftvisible, setLeftvisible] = useState(false);
  const [theme, setTheme] = useState('light-theme');
  const handleHamburger = () => {
    setLeftvisible(!leftvisible);
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  const handleLogout = () => {
    axios
      .get('http://localhost:4000/studentauth/logout')
      .then((res) => {
        if (res.data.status) {
          localStorage.removeItem('valid');
          navigate('/');
        } else {
          toast.error('Something Wrong in Logout', {
            position: 'top-center',
          });
        }
      })
      .catch((err) => console.log(err));
  };
  const handleMode = () => {
    theme === 'dark-theme' ? setTheme('light-theme') : setTheme('dark-theme');
  };
  return (
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
            <Link to={'/student/dashbord'} className={style.link}>
              <span style={{ color: 'red' }}>
                {' '}
                <MdLocalLibrary />
              </span>
              <span>
                <strong style={{ color: 'rgb(100, 50, 150)' }}>L</strong>{' '}
                <strong style={{ color: 'rgb(20, 150, 90)' }}>M</strong>{' '}
                <strong style={{ color: 'rgb(200, 100, 50)' }}>S</strong>
              </span>
            </Link>
          </div>

          {/* <div className={`fs-2 fw-bold ${style.navleft}`}>
            <span className={style.numbicon}>
              {' '}
              <BsFillTelephoneFill />
            </span>
            <span className={style.number}> +8801786224382</span>
          </div> */}
          <div className={`fs-4 fw-medium ${style.navle}`}>
            <Link
              to={'/student/dashbord/requestedbooks'}
              className={style.link}
            >
              <span style={{ color: 'rgb(100, 50, 150)' }}>
                Requested Books
              </span>
            </Link>
          </div>
          <div className={`fs-4 fw-medium ${style.navle}`}>
            <Link to={'/student/dashbord/fed'} className={style.link}>
              <span style={{ color: 'rgb(100, 50, 150)' }}>FeedBack</span>
            </Link>
          </div>
          <div className={`fs-4 fw-medium ${style.navle}`}>
            <Link to={'/student/dashbord/hist'} className={style.link}>
              <span style={{ color: 'rgb(100, 50, 150)' }}>History</span>
            </Link>
          </div>
          <div className={`fs-4 fw-medium ${style.navle}`}>
            <Link
              to={'/student/dashbord/studentprofile'}
              className={style.link}
            >
              <span style={{ color: 'rgb(100, 50, 150)' }}>Profile</span>
            </Link>
          </div>
          <div className={`fs-4 fw-medium ${style.navle}`}>
            <Link onClick={handleLogout} className={style.link}>
              <span style={{ color: 'rgb(100, 50, 150)' }}>Logout</span>
            </Link>
          </div>
          <div className={`fs-2 fw-bold ${style.navleft}`}>
            <span className={style.mde} onClick={handleMode}>
              {theme === 'light-theme' ? (
                <strong style={{ color: 'black' }}>
                  <MdDarkMode />{' '}
                </strong>
              ) : (
                <strong style={{ color: 'white' }}>
                  <FiSun />
                </strong>
              )}
            </span>
          </div>
        </div>
      </div>
      <div className={` ${style.content}`}>
        <div
          className={` vh-100  ${style.leftSidebar} ${
            leftvisible ? style.responleft : ''
          }`}
        >
          <div className={` ${style.part}`}>
            <Link to='/student/dashbord' className={style.link}>
              <span>
                <i className='bi bi-speedometer2'></i>
              </span>
              <span>Dashboard</span>
            </Link>
          </div>
          <div className={` ${style.part}`}>
            <Link
              to={'/student/dashbord/studentprofile'}
              className={style.link}
            >
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
            <Link to={'/student/dashbord/studentMore'} className={style.link}>
              <span>
                <CiCirclePlus />
              </span>
              <span>More</span>
            </Link>
          </div>
          <div className={` ${style.part}`}>
            <Link
              to={'/student/dashbord/requestedbooks'}
              className={style.link}
            >
              <span>
                <GoGitPullRequest />
              </span>
              <span>Requested Books</span>
            </Link>
          </div>
        </div>
        <div className={` ${style.rightContent}`}>
          <Outlet />
        </div>
        <div className={style.footer_content}>
          <div className={style.contfoot}>
            {' '}
            <h5>MENU</h5>
            <ul>
              <Link
                to={'/student/dashbord/requestedbooks'}
                className={style.link}
              >
                <li>requested books</li>
              </Link>
              <Link to={'/student/dashbord/fed'} className={style.link}>
                <li>feedback</li>
              </Link>
              <Link to={'/student/dashbord/hist'} className={style.link}>
                <li>history</li>
              </Link>
              <Link
                to={'/student/dashbord/studentprofile'}
                className={style.link}
              >
                <li>profile</li>
              </Link>
            </ul>
          </div>
          <div className={style.contfoot}>
            <h5>ADDRESS</h5>
            <p>
              zakigonj,sylhet <br />
              dhaka,bangladesh
            </p>
            <div className={style.ifr}>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7239.115970452504!2d92.36240394191758!3d24.878941861668615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3751d34ea340969d%3A0x4caba9ef966a4701!2sZakiganj%2C%20Bangladesh!5e0!3m2!1sen!2sin!4v1702616456037!5m2!1sen!2sin'
                allowFullScreen=''
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              ></iframe>
            </div>
          </div>
          <div className={style.contfoot}>
            <h5>CONTACTS</h5>
            <h6>Phone</h6>
            <p>++8801786224382</p>
            <h6>E-mail</h6>
            <p>minhajtapader0@gmail.com</p>
            <div className={style.contacticon}>
              <a
                href='https://www.facebook.com/profile.php?id=100075376118027'
                target='_blank'
                rel='noopener noreferrer'
              >
                <CiFacebook className={style.ic} />
              </a>
              <a
                href='https://github.com/tapader13'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaGithub className={style.ic} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashbordStudent;
