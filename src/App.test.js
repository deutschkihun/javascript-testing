import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login'

jest.mock("axios", () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: { id: 1, name: "John" },
    }),
  },
}));

test('renders learn react link', () => {
  render(<Home />);
  const linkElement = screen.getByText(/learn react/i); // handling upper and lower case of alphabet
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react link with sensitive text', () => {
  render(<Home />);
  const linkElement = screen.getByText("Learn React"); // ex.) learn react (fail)
  expect(linkElement).toBeInTheDocument();
});


test('renders learn react link with testid', () => {
  render(<Home />);
  const linkElement = screen.getByTestId('customId')
  expect(linkElement).toBeInTheDocument();
});

test('renders 3 list items', () => {
  render(<Home />);
  const listItem = screen.getAllByRole('listitem')
  expect(listItem).toHaveLength(3)
  expect(listItem.length).toBe(3)
  expect(listItem.length).toEqual(3)
});

test('render title', () => {
  render(<Home/>)
  const title = screen.getByTestId('title');
  expect(title).toBeInTheDocument()
})

test('sum should be 6', () => {
  render(<Home/>)
  const sum = screen.getByTitle('sum');
  expect(sum.textContent).toBe('6')
})

// testing library
// to test our application we need to reach out dom element first and to reach all those elements
// we are using testing library by using many different queries and also interact with dom element

// jest
// javascript testing library and it allows us to run our test and it determines whether the tests pass 
// or fail, it takes our expectation and compare with the actual result and it's called an assertion

test('usename input should be empty', () => {
  render(<Login/>)
  const userInputElement = screen.getByPlaceholderText(/username/i);
  expect(userInputElement.value).toBe("")
})

test('password input should be empty', () => {
  render(<Login/>)
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  expect(passwordInputElement.value).toBe("")
})


test('button should be disabled', () => {
  render(<Login />)
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toBeDisabled()
})


test('loading text in button should not be rendered', () => {
  render(<Login />)
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).not.toHaveTextContent(/please wait/i)
})

test('error message should not be visible', () => {
  render(<Login />)
  const errorElement = screen.getByTestId("error");
  expect(errorElement).not.toBeVisible();
})

test('usename input should be changed', () => {
  render(<Login/>)
  const userInputElement = screen.getByPlaceholderText(/username/i);
  const testValue = 'test';

  fireEvent.change(userInputElement, {target: {value: testValue}});
  expect(userInputElement.value).toBe(testValue);
})

test('password input should be changed', () => {
  render(<Login/>)
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  const testValue = 'test';

  fireEvent.change(passwordInputElement, {target: {value: testValue}});
  expect(passwordInputElement.value).toBe(testValue);
})

test('button should not be disabled when input exist', () => {
  render(<Login/>)
  const buttonElement = screen.getByRole('button');
  const userInputElement = screen.getByPlaceholderText(/username/i);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  const testValue = 'test';

  fireEvent.change(userInputElement, {target: {value: testValue}});
  fireEvent.change(passwordInputElement, {target: {value: testValue}});

  expect(buttonElement).not.toBeDisabled()
})

test('loading text in button should be rendered when click login button', () => {
  render(<Login />)
  const buttonElement = screen.getByRole('button');
  const userInputElement = screen.getByPlaceholderText(/username/i);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  const testValue = 'test';

  fireEvent.change(userInputElement, {target: {value: testValue}});
  fireEvent.change(passwordInputElement, {target: {value: testValue}});
  fireEvent.click(buttonElement)

  expect(buttonElement).toHaveTextContent(/please wait/i)
})

test('loading text in button should not be rendered after fetching', async () => {
  render(<Login />)
  const buttonElement = screen.getByRole('button');
  const userInputElement = screen.getByPlaceholderText(/username/i);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  const testValue = 'test';

  fireEvent.change(userInputElement, {target: {value: testValue}});
  fireEvent.change(passwordInputElement, {target: {value: testValue}});
  fireEvent.click(buttonElement)

  const user = await screen.findByText('John')
  await waitFor(() => expect(buttonElement).not.toHaveTextContent(/please wait/i))
  expect(user).toBeInTheDocument();
})

// mocking
// why we need mocking 
// technically we can copy the part that we are communicating with backend or fetching position to testing code 
// but test should be independent of other factors like backend. If backend server is down, your test gonna be always fail
// we use mock
