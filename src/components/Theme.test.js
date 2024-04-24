import { render, screen } from '@testing-library/react';
import Themes from './Themes';

test('renders learn react link', () => {
  render(<Themes />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
