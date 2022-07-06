import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Todo} from "../components/Page/Todo";

test("renders todos", async () => {
  render(<Todo />);

  const listitems = await screen.findAllByRole("listitem");
  expect(listitems).toHaveLength(3);

  await userEvent.type(screen.getByRole("textbox"), "공부하기");
  userEvent.click(screen.getByRole("button"));

  expect(await screen.findByText("공부하기")).toBeInTheDocument();
});
