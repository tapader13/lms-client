import React, { useEffect, useState } from 'react';
import style from './studenthome.module.css';
import { CiSearch } from 'react-icons/ci';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import Button from 'react-bootstrap/esm/Button';
function StudentHome() {
  const [books, setBooks] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [filterSemester, setFilterSemester] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalpage, setTotalpage] = useState('');
  const [request, setRequest] = useState([]);
  useEffect(() => {
    let base_url = 'http://localhost:4000/studentauth/showbook';

    const params = new URLSearchParams();
    if (searchItem) {
      params.append('bookname', searchItem);
    }
    if (filterSemester) {
      params.append('semester', filterSemester);
    }
    params.append('page', page);
    params.append('limit', limit);

    base_url += `?${params.toString()}`;

    axios
      .get(base_url)
      .then((res) => {
        setBooks(res.data.data);
        setTotalpage(res.data.totalPage);
      })
      .catch((err) => console.log(err.message));
  }, [searchItem, filterSemester, page, limit]);

  const handlePaginate = (e) => {
    setPage(e.selected + 1);
  };
  const handleReuest = (id) => {
    setRequest([...request, id]);
    axios
      .post('http://localhost:4000/studentauth/requestbook', { id })
      .then((res) => {
        if (res.data.status) {
          toast('request done!!!', { position: 'top-center' });
        } else {
          console.log(res);
          toast('wrong request!!!', { position: 'top-center' });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className={style.main}>
        <div className={style.content}>
          <form action=''>
            <div className={style.contentsrc}>
              <label htmlFor='search'>
                <strong>Search</strong>
              </label>
              <div className={style.srccontent}>
                <input
                  id='searchInput'
                  type='text'
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                  className={style.srcinicon}
                  placeholder='Search book by name...'
                />
                <CiSearch className={style.icn} />
              </div>
            </div>
          </form>
        </div>
        <div className={style.checksemester}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => {
            return (
              <div key={semester}>
                <input
                  type='radio'
                  value={semester}
                  checked={semester === filterSemester}
                  onChange={(e) => setFilterSemester(semester)}
                  name='semester'
                  id={`semester${semester}`}
                />
                <label htmlFor={`semester${semester}`}>
                  <span>Sem {semester}</span>
                </label>
              </div>
            );
          })}
        </div>
        <div className={style.showbook}>
          {books.map((book, i) => {
            const isrequest = request.includes(book.id);
            return (
              <div className={style.card} key={i}>
                <img
                  src={`http://localhost:4000/images/${book.image}`}
                  alt='image not found'
                />
                <div className={style.cardcontent}>
                  <h6>
                    <strong>Name:</strong> {book.name}
                  </h6>
                  <h6>
                    <strong>Author:</strong> {book.author}
                  </h6>
                  <h6>
                    <strong>Semester:</strong> {book.semester}
                  </h6>
                  <h6>
                    <strong>Quantity:</strong> {book.quantity}
                  </h6>
                </div>

                {!isrequest && (
                  <Button
                    onClick={() => handleReuest(book.id)}
                    variant='success'
                    className={style.btn}
                  >
                    Request
                  </Button>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            pageCount={totalpage}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            onPageChange={handlePaginate}
            pageLinkClassName={'page-link'}
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            activeClassName='active'
          />
        </div>
      </div>
    </>
  );
}

export default StudentHome;
