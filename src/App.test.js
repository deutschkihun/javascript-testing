import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i); // handling upper and lower case of alphabet
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react link with sensitive text', () => {
  render(<App />);
  const linkElement = screen.getByText("Learn React"); // ex.) learn react (fail)
  expect(linkElement).toBeInTheDocument();
});


test('renders learn react link with testid', () => {
  render(<App />);
  const linkElement = screen.getByTestId('customId')
  expect(linkElement).toBeInTheDocument();
});

test('renders 3 list items', () => {
  render(<App />);
  const listItem = screen.getAllByRole('listitem')
  expect(listItem).toHaveLength(3)
  expect(listItem.length).toBe(3)
  expect(listItem.length).toEqual(3)
});

test('render title', () => {
  render(<App/>)
  const title = screen.getByTestId('title');
  expect(title).toBeInTheDocument()
})

test('sum should be 6', () => {
  render(<App/>)
  const sum = screen.getByTitle('sum');
  expect(sum.textContent).toBe('6')
})

// testing library
// to test our application we need to reach out dom element first and to reach all those elements
// we are using testing library by using many different queries and also interact with dom element

// jest
// javascript testing library and it allows us to run our test and it determines whether the tests pass 
// or fail, it takes our expectation and compare with the actual result and it's called an assertion