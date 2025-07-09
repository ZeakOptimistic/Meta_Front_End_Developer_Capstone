// src/App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders App without crashing', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Example check: looks for text on homepage
  const linkElement = screen.getByText(/little lemon/i);
  expect(linkElement).toBeInTheDocument();
});
