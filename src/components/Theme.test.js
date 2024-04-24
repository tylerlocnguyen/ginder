import { render, screen } from '@testing-library/react';
import Themes from './Themes';

//Checks the react link to see if it is the document
test('renders learn react link', () => {
  render(<Themes />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
