// BookingForm.js
import React, { useState, useEffect } from 'react';

function BookingForm({ availableTimes, dispatch, onSubmit }) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '',
    occasion: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { date, time, guests, occasion } = formData;
    const isValid =
      date &&
      time &&
      occasion &&
      Number(guests) >= 1 &&
      Number(guests) <= 10;

    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === 'date') {
        dispatch && dispatch({ type: 'UPDATE_TIMES', date: value });
      }

      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit && onSubmit(formData);
    }
  };

  return (
    <section aria-label="Booking Form Section" style={{ padding: '1rem 0' }}>
      <h2>Book Now</h2>

      <form onSubmit={handleSubmit} aria-label="Booking Form">
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="res-date">Choose date</label><br />
          <input
            type="date"
            id="res-date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="res-time">Choose time</label><br />
          <select
            id="res-time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          >
            <option value="">Select time</option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="guests">Number of guests</label><br />
          <input
            type="number"
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            min="1"
            max="10"
            required
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="occasion">Occasion</label><br />
          <select
            id="occasion"
            name="occasion"
            value={formData.occasion}
            onChange={handleChange}
            required
          >
            <option value="">Select occasion</option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
          </select>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <button
            type="submit"
            disabled={!isFormValid}
            aria-label="On Click Make Your Reservation"
          >
            Make Your Reservation
          </button>
        </div>
      </form>
    </section>
  );
}

export default BookingForm;
