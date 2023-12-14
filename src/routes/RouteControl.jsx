import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashbord from '../pages/Dashbord';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import AddBook from '../pages/AddBook';
import ShowBook from '../pages/ShowBook';
import EditBook from '../pages/EditBook';
import Issu from '../pages/Issu';
import ReturnPending from '../pages/ReturnPending';
import ProfileAdminUpdate from '../pages/ProfileAdminUpdate';
import AddAdmin from '../pages/AddAdmin';
import CreateAccount from '../pages/CreateAccount';
import DashbordStudent from '../pages/DashbordStudent';
import StudentHome from '../pages/StudentHome';
import StudentProfile from '../pages/StudentProfile';
import StudentProfileUpdate from '../pages/StudentProfileUpdate';
import StarterPage from '../pages/StarterPage';
import RequestedBookStudent from '../pages/RequestedBookStudent';
import BookDetails from '../pages/BookDetails';
import PendingDetails from '../pages/PendingDetails';
import ReturnedDitails from '../pages/ReturnedDitails';
import More from '../pages/More';
import FeedBack from '../pages/FeedBack';
import FeedbackSolve from '../pages/FeedbackSolve';
import FeedbackParticularUser from '../pages/FeedbackParticularUser';
import PrivateRoute from './PrivateRoute';
import History from '../pages/History';
import AcceptRequestBook from '../pages/AcceptRequestBook';
function RouteControl() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StarterPage />} />
          <Route path='/adminlogin' element={<Login />} />
          <Route path='/createaccount' element={<CreateAccount />}></Route>
          <Route
            path='/student/dashbord'
            element={
              <PrivateRoute>
                <DashbordStudent />
              </PrivateRoute>
            }
          >
            <Route path='' element={<StudentHome />} />
            <Route
              path='/student/dashbord/studentprofile'
              element={<StudentProfile />}
            />
            {/* <Route path='/student/dashbord/studentMore' element={<More />}> */}
            <Route path='/student/dashbord/fed' element={<FeedBack />}></Route>
            <Route path='/student/dashbord/hist' element={<History />}></Route>
            {/* </Route> */}
            <Route
              path='/student/dashbord/profileupdate/:id'
              element={<StudentProfileUpdate />}
            />
            <Route
              path='/student/dashbord/requestedbooks'
              element={<RequestedBookStudent />}
            />
            <Route
              path='/student/dashbord/bookdetails/:bookid'
              element={<BookDetails />}
            />
          </Route>
          <Route
            path='/dashbord'
            element={
              <PrivateRoute>
                <Dashbord />
              </PrivateRoute>
            }
          >
            <Route path='' element={<Home />} />
            <Route path='/dashbord/profile' element={<Profile />} />
            <Route path='/dashbord/addbook' element={<AddBook />} />
            <Route path='/dashbord/feedbacksolve' element={<FeedbackSolve />} />
            <Route
              path='/dashbord/particularuser/:id'
              element={<FeedbackParticularUser />}
            />
            <Route
              path='/dashbord/pendingdetails/:bookid'
              element={<PendingDetails />}
            />
            <Route
              path='/dashbord/bookreturndetails/:bookid'
              element={<ReturnedDitails />}
            />
            <Route path='/dashbord/showbook' element={<ShowBook />} />
            <Route path='/dashbord/issupending' element={<Issu />} />
            <Route path='/dashbord/returnpending' element={<ReturnPending />} />
            <Route path='/dashbord/editbook/:id' element={<EditBook />} />
            <Route
              path='/dashbord/acceptrequestbook'
              element={<AcceptRequestBook />}
            />
            <Route
              path='/dashbord/profileupdate/:id'
              element={<ProfileAdminUpdate />}
            />
            <Route path='/dashbord/addnewadmin' element={<AddAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RouteControl;
