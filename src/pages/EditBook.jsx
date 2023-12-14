import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import style from './editbook.module.css';
import axios from 'axios';
function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    author: '',
    semester: '',
    price: '',
    quantity: '',
  });
  useEffect(() => {
    axios
      .get(`http://localhost:4000/auth/editbook/${id}`)
      .then((res) => {
        setValues({
          ...values,
          name: res.data.data[0].name,
          author: res.data.data[0].author,
          semester: res.data.data[0].semester,
          price: res.data.data[0].price,
          quantity: res.data.data[0].quantity,
        });
      })
      .catch((err) => console.log(err));
  }, []);
  const handleSub = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:4000/auth/editbook/${id}`, values)
      .then((res) => {
        if (res.data.status) {
          toast('Update book successfully', { position: 'top-center' });
          setValues({
            name: '',
            author: '',
            semester: '',
            price: '',
            quantity: '',
            image: '',
          });
          navigate('/dashbord/showbook');
        } else {
          toast('Update book not work', { position: 'top-center' });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={style.main}>
      <div className={style.content}>
        <form action='' onSubmit={handleSub} encType='multipart/form-data'>
          <div className={style.inp}>
            <label htmlFor='name'>
              <strong>Book Name:</strong>{' '}
            </label>
            <input
              type='text'
              name='name'
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              id='name'
              required
            />
          </div>
          <div className={style.inp}>
            <label htmlFor='author'>
              <strong>Author Name:</strong>{' '}
            </label>
            <input
              type='text'
              value={values.author}
              onChange={(e) => setValues({ ...values, author: e.target.value })}
              name='author'
              id='author'
              required
            />
          </div>
          <div className={style.inp}>
            <label htmlFor='semester'>
              <strong>Semester:</strong>{' '}
            </label>
            <input
              type='number'
              value={values.semester}
              onChange={(e) =>
                setValues({ ...values, semester: e.target.value })
              }
              name='semester'
              id='semester'
              required
            />
          </div>
          <div className={style.inp}>
            <label htmlFor='price'>
              <strong>Price:</strong>{' '}
            </label>
            <input
              type='number'
              value={values.price}
              onChange={(e) => setValues({ ...values, price: e.target.value })}
              name='price'
              id='price'
              required
            />
          </div>
          <div className={style.inp}>
            <label htmlFor='quantity'>
              <strong>Quantity:</strong>{' '}
            </label>
            <input
              type='number'
              value={values.quantity}
              onChange={(e) =>
                setValues({ ...values, quantity: e.target.value })
              }
              name='quantity'
              id='quantity'
              required
            />
          </div>

          <div className={style.btn}>
            <Button variant='outline-warning' type='submit'>
              UPDATE BOOK
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBook;
