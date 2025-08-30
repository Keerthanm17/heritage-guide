import { render, screen } from '@testing-library/react';
const Hello = require('./Hello');

test('renders hello world', () => {
	render(<Hello />);
	const linkElement = screen.getByText(/hello world/i);
	expect(linkElement).toBeInTheDocument();
});
