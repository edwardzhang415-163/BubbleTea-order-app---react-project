import React from 'react';
import { render } from '@testing-library/react';
import NotFound from './NotFound';

describe('NotFound Component', () => {
  test('renders NotFound text', () => {
    const { getByText } = render(<NotFound />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const notFoundElement = getByText('NotFound');
    expect(notFoundElement).toBeInTheDocument();
  });
});
