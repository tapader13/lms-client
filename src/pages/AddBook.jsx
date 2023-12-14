import React, { useState } from 'react';
import style from './addbook.module.css';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
function AddBook() {
  const [values, setValues] = useState({
    name: '',
    author: '',
    semester: '',
    price: '',
    status: '',
    quantity: '',
    image: '',
  });
  const handleSub = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('name', values.name);
    formData.append('author', values.author);
    formData.append('status', values.status);
    formData.append('quantity', values.quantity);
    formData.append('image', values.image);
    formData.append('price', values.price);
    formData.append('semester', values.semester);
    axios
      .post('http://localhost:4000/auth/addbook', formData)
      .then((res) => {
        if (res.data.status) {
          toast('Add book successfully', { position: 'top-center' });
          setValues({
            name: '',
            author: '',
            semester: '',
            price: '',
            status: '',
            quantity: '',
            image: '',
          });
        } else {
          toast('Add book not work', { position: 'top-center' });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(values);
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
            <label htmlFor='status'>
              <strong>Status:</strong>{' '}
            </label>
            <input
              type='text'
              value={values.status}
              onChange={(e) => setValues({ ...values, status: e.target.value })}
              name='status'
              id='status'
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
          <div className={style.inp}>
            <label htmlFor='image'>
              <strong>Image:</strong>{' '}
            </label>
            <input
              type='file'
              onChange={(e) =>
                setValues({ ...values, image: e.target.files[0] })
              }
              name='image'
              id='image'
              required
            />
          </div>
          <div className={style.btn}>
            <Button variant='outline-warning' type='submit'>
              ADD BOOK
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
