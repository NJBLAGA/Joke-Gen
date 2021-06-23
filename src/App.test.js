import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Joke Library', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/joke library/i);
  expect(linkElement).toBeInTheDocument();
});
