// BookingForm.test.js
import { render, screen } from '@testing-library/react';
import BookingForm from './BookingForm';

test('renders the BookingForm label', () => {
  render(<BookingForm availableTimes={['17:00']} dispatch={() => {}} onSubmit={() => {}} />);
  const labelElement = screen.getByText("Choose date");
  expect(labelElement).toBeInTheDocument();
});
