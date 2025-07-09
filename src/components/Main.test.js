// src/components/Main.test.js

import { initializeTimes, updateTimes } from './Main';

// ✅ MOCK react-router-dom (for useNavigate)
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

// ✅ MOCK fetchAPI module
jest.mock('./api', () => ({
  fetchAPI: jest.fn(),
  submitAPI: jest.fn(),
}));

import { fetchAPI } from './api';

beforeEach(() => {
  jest.clearAllMocks();
});

test('initializeTimes should call fetchAPI with today\'s date', () => {
  const fakeTimes = ['17:00', '18:00'];
  fetchAPI.mockReturnValue(fakeTimes);

  const result = initializeTimes();

  expect(fetchAPI).toHaveBeenCalledTimes(1);
  expect(result).toEqual(fakeTimes);
});

test('updateTimes should call fetchAPI with given date', () => {
  const fakeTimes = ['19:00', '20:00'];
  const testDate = '2023-07-10';
  fetchAPI.mockReturnValue(fakeTimes);

  const result = updateTimes([], testDate);

  expect(fetchAPI).toHaveBeenCalledWith(new Date(testDate));
  expect(result).toEqual(fakeTimes);
});
