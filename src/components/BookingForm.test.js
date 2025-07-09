// BookingForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

describe('BookingForm Validation', () => {
  const setup = () => {
    const mockDispatch = jest.fn();
    const mockSubmit = jest.fn();

    render(
      <BookingForm
        availableTimes={['17:00', '18:00']}
        dispatch={mockDispatch}
        onSubmit={mockSubmit}
      />
    );

    return {
      dispatch: mockDispatch,
      onSubmit: mockSubmit,
    };
  };

  test('renders input elements with HTML5 validation attributes', () => {
    setup();

    const dateInput = screen.getByLabelText(/choose date/i);
    const timeSelect = screen.getByLabelText(/choose time/i);
    const guestInput = screen.getByLabelText(/number of guests/i);
    const occasionSelect = screen.getByLabelText(/occasion/i);

    expect(dateInput).toBeRequired();
    expect(timeSelect).toBeRequired();
    expect(guestInput).toBeRequired();
    expect(guestInput).toHaveAttribute('min', '1');
    expect(guestInput).toHaveAttribute('max', '10');
    expect(occasionSelect).toBeRequired();
  });

  test('submit button is disabled by default', () => {
    setup();
    const submitBtn = screen.getByRole('button', { name: /make your reservation/i });
    expect(submitBtn).toBeDisabled();
  });

  test('submit button becomes enabled when form is valid', () => {
    setup();

    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: '2025-07-10' }
    });

    fireEvent.change(screen.getByLabelText(/choose time/i), {
      target: { value: '17:00' }
    });

    fireEvent.change(screen.getByLabelText(/number of guests/i), {
      target: { value: '4' }
    });

    fireEvent.change(screen.getByLabelText(/occasion/i), {
      target: { value: 'Birthday' }
    });

    const submitBtn = screen.getByRole('button', { name: /make your reservation/i });
    expect(submitBtn).toBeEnabled();
  });

  test('submit function is called when valid form is submitted', () => {
    const { onSubmit } = setup();

    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: '2025-07-10' }
    });

    fireEvent.change(screen.getByLabelText(/choose time/i), {
      target: { value: '17:00' }
    });

    fireEvent.change(screen.getByLabelText(/number of guests/i), {
      target: { value: '2' }
    });

    fireEvent.change(screen.getByLabelText(/occasion/i), {
      target: { value: 'Birthday' }
    });

    const submitBtn = screen.getByRole('button', { name: /make your reservation/i });
    fireEvent.click(submitBtn);

    expect(onSubmit).toHaveBeenCalledWith({
      date: '2025-07-10',
      time: '17:00',
      guests: '2',
      occasion: 'Birthday'
    });
  });

  test('submit function is not called if form is incomplete', () => {
    const { onSubmit } = setup();

    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: '' } // no date
    });

    const submitBtn = screen.getByRole('button', { name: /make your reservation/i });
    fireEvent.click(submitBtn);

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
