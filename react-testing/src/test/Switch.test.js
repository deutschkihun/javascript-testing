import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Switch } from '../components/Page/Switch';
import userEvent from '@testing-library/user-event'


test("OFF button is enabled initially", () => {
    render(<Switch />);

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("OFF");
    expect(button).toBeEnabled();
});


test("ON button does not appear initially", () => {
    render(<Switch />);
  
    expect(
      screen.queryByRole("button", {
        name: /on/i
      })
    ).not.toBeInTheDocument();
});

test("button is disabled once clicked", async () => {
    render(<Switch />);
  
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(button).toBeDisabled();
});

// asynchronous testing: findbyXXX or waitFor()

test('ON button will be enalbed when clicked', async () => {
    render(<Switch />);

    userEvent.click(screen.getByRole('button'))
    const button = await screen.findByRole('button',{
        name: /on/i
    })
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
})

test("ON button will be enabled when clicked", async () => {
    render(<Switch />);

    userEvent.click(screen.getByRole("button"));

    const button = await screen.findByRole("button", {
            name: /on/i
        });

    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
});

// Validate that certain elements disappear asynchronously on the DOM: waitForElementToBeRemoved
test('OFF button will be removed when clicked', async () => {
    render(<Switch />);

    userEvent.click(screen.getByRole('button'))

    await waitForElementToBeRemoved(() => 
        screen.queryByRole('button', {
            name:/off/i
        })
    )

    //alternative
    await waitFor(() => 
        expect(
            screen.queryByRole('button', {
                name:/off/i
            })
        )
    )
})
  


