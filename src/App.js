import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import { useState } from 'react';
import MovieDescriptionPage from './components/MovieDescriptionPage';
import {usersData} from './config/constants';
import NavBar from './components/NavBar';
import CatalogHeader from './components/CatalogHeader';
import {USDollarFormat} from "./services/services";
import AddMoney from './components/AddMoney';
import Modal from './components/Modal';


function App() {
  const [users, setUsers] = useState(usersData);
  const [currentUserIndex, setCurrentUserIndex] = useState(-1); // no user selected in the beginning

  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [movieTitleForModal, setMovieTitleForModal] = useState("");

  const hideModal = function() {
    setShouldShowModal(false);
  }

  const rentMovie=function(movie) {
    // if movie is not in the rented list for the current user, rent it
    // else unrent it
    // returns final status of the movie: true if rented, false if not nrented  
    const newUsers = [...users];
    const indexRentedMovie = users[currentUserIndex].rentedMovies.
                              findIndex(rentedMovie => movie.id === rentedMovie.id);
    if (indexRentedMovie === -1) {
        if (users[currentUserIndex].budget >= movie.rentPrice) {
            newUsers[currentUserIndex].budget -= movie.rentPrice;
            newUsers[currentUserIndex].rentedMovies.push(movie);
            setUsers(newUsers);
            setShouldShowModal(true);
            setMovieTitleForModal(movie.title);
        } else {
           alert(`You budget is ${USDollarFormat.format(users[currentUserIndex].budget)},
                  which is not enough for renting a movie worth ${USDollarFormat.format(movie.rentPrice)}`);
          return false;
        }
    } else {
        newUsers[currentUserIndex].budget += movie.rentPrice;
        newUsers[currentUserIndex].rentedMovies.splice(indexRentedMovie, 1);
        setUsers(newUsers);
        return false;
      }
}

const updateBudget = function(amount) {
  if (currentUserIndex != -1) {
    const newUsers = [...users];
    newUsers[currentUserIndex].budget += amount;
    setUsers(newUsers);
  }
}

  return (
    <Router>
      <div>
          <div className="App">
            <NavBar />
            <div>{currentUserIndex === -1 ? "No user selected" : "Current user: " + users[currentUserIndex].name} </div>
          </div>
      </div>
      {shouldShowModal ? <Modal show={shouldShowModal} movieTitle={movieTitleForModal} hideModal={hideModal} /> : null}
      <Routes>
        <Route path="" element={<Landing users={users} setCurrentUserIndex={setCurrentUserIndex}/>} />
        <Route path="/catalog" element={<CatalogHeader user={users[currentUserIndex]} rentMovie={rentMovie}/>} />
        <Route path="/movies/:movieId" element=<MovieDescriptionPage /> />
        <Route path="/addmoney" element={<AddMoney user={users[currentUserIndex]} updateBudget={updateBudget}/>} />
      </Routes>
    </Router>
  );
}

export default App;
