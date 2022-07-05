import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { Home } from '../components/Page/Home';
import { Login } from '../components/Page/Login'
import { NotFound } from '../components/Page/NotFound';
import App from '../App';
import { createMemoryHistory } from 'history';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

// https://testing-library.com/docs/user-event/intro/#difference-to-fireevent

jest.mock("axios", () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: { id: 1, name: "John" },
    }),
  },
}));

afterEach(cleanup)

// unit test 
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

test('renders 4 list items', () => {
  render(<Home />);
  const listItem = screen.getAllByRole('listitem')
  expect(listItem).toHaveLength(4)
  expect(listItem.length).toBe(4)
  expect(listItem.length).toEqual(4)
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


// Fire Event 
// Basically used when we want to trigger any specific event on an object
// 엄밀히 얘기해서 사용자가 <input> 엘리먼트에 데이터를 입력할 때는, change 이벤트 뿐만 아니라 focus, keydown, keyup과 같은 다양한 이벤트가 발생합니다. 
// 따라서 React Testing Library에 내장되어 있는 fireEvent를 사용하면, 실제로 발생해야하는 모든 유저 이벤트를 발생되지 않는다는 단점이 있습니다.

// User event 
// user-event is a companion library for Testing Library that provides more advanced simulation of browser interactions than the built-in fireEvent method.

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

test('usename input should be changed', async () => {
  render(<Login/>)
  const userInputElement = screen.getByPlaceholderText(/username/i);
  const testValue = 'test';

  // fireEvent.change(userInputElement, {target: {value: testValue}});
  await userEvent.type(userInputElement,testValue)
  expect(userInputElement.value).toBe(testValue);
})

test('password input should be changed', async () => {
  render(<Login/>)
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  const testValue = 'test';

  //fireEvent.change(passwordInputElement, {target: {value: testValue}});
  await userEvent.type(passwordInputElement,testValue)
  expect(passwordInputElement.value).toBe(testValue);
})

test('button should not be disabled when input exist', async () => {
  render(<Login/>)
  const buttonElement = screen.getByRole('button');
  const userInputElement = screen.getByPlaceholderText(/username/i);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  const testValue = 'test';

  //fireEvent.change(userInputElement, {target: {value: testValue}});
  //fireEvent.change(passwordInputElement, {target: {value: testValue}});

  await userEvent.type(userInputElement,testValue);
  await userEvent.type(passwordInputElement,testValue);

  expect(buttonElement).not.toBeDisabled()
})

test('loading text in button should be rendered when click login button', async () => {
  render(<Login />)
  const buttonElement = screen.getByRole('button');
  const userInputElement = screen.getByPlaceholderText(/username/i);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  const testValue = 'test';

  // fireEvent.change(userInputElement, {target: {value: testValue}});
  // fireEvent.change(passwordInputElement, {target: {value: testValue}});
  // fireEvent.click(buttonElement)

  await userEvent.type(userInputElement,testValue)
  await userEvent.type(passwordInputElement,testValue)
  await userEvent.click(buttonElement)
})

test('loading text in button should not be rendered after fetching', async () => {
  render(<Login />)
  const buttonElement = screen.getByRole('button');
  const userInputElement = screen.getByPlaceholderText(/username/i);
  const passwordInputElement = screen.getByPlaceholderText(/password/i);
  const testValue = 'test';

  // fireEvent.change(userInputElement, {target: {value: testValue}});
  // fireEvent.change(passwordInputElement, {target: {value: testValue}});
  // fireEvent.click(buttonElement)

  await userEvent.type(userInputElement,testValue)
  await userEvent.type(passwordInputElement,testValue)
  await userEvent.click(buttonElement)

  const user = await screen.findByText('John')
  await waitFor(() => expect(buttonElement).not.toHaveTextContent(/please wait/i))
  expect(user).toBeInTheDocument();
})

/* router unit testing */

describe("app routing unit test", () => {
  test('when rendering <App /> with endpoint "/"', () => {
    render(<App />);
    const textElement = screen.getByText(/learn react/i);
    const navbar = screen.getByTestId('navbar');
    const link = screen.getByTestId('deutschkihun')

    expect(textElement).toBeInTheDocument();
    expect(navbar).toContainElement(link)
  })

  test('when rendering <Menu/> with endpoint "/menu"', async () => {
    render(<App />);
    const link = screen.getByTestId('menu')
    //fireEvent.click(link)
    await userEvent.click(link)
  })

  test('routing에 해당되지 않는 path인 경우 /notfound 로 렌더링 되는가?', () => {
    const history = createMemoryHistory()
    history.push('/some/bad/route')

    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByText(/404-notfound/i)).toBeInTheDocument()
    const notfound = screen.getByTestId('404-notfound')
    expect(notfound).toBeInTheDocument()
  });
})