// Main.js
import React, { useReducer } from 'react';
import BookingForm from './BookingForm';
import { fetchAPI, submitAPI } from './api';
import { useNavigate } from 'react-router-dom';

export const initializeTimes = () => {
  return fetchAPI(new Date());
};

export const updateTimes = (state, date) => {
  return fetchAPI(new Date(date));
};

function Main() {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
  const navigate = useNavigate();

  const submitForm = (formData) => {
    if (submitAPI(formData)) {
      navigate("/confirmed");
    }
  };

  return (
    <main>
      <h2>Reserve a Table</h2>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} onSubmit={submitForm} />
    </main>
  );
}

export default Main;
