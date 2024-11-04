import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CreatePollForm from "./CreatePollForm";

describe("CreatePollForm", () => {
  const mockOnCreate = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form", () => {
    render(<CreatePollForm onCreate={mockOnCreate} />);
    expect(screen.getByText("Создать новый опрос")).toBeInTheDocument();
    expect(screen.getByLabelText("Заголовок опроса")).toBeInTheDocument();
    expect(screen.getByText("Одиночный выбор")).toBeInTheDocument();
    expect(screen.getByText("Множественный выбор")).toBeInTheDocument();
    expect(screen.getByLabelText("Ответ 1")).toBeInTheDocument();
    expect(screen.getByText("Создать опрос")).toBeInTheDocument();
  });

  it("allows adding and removing answers", () => {
    render(<CreatePollForm onCreate={mockOnCreate} />);

    fireEvent.click(screen.getByTestId("AddIcon"));

    let answerFields = screen.getAllByLabelText(/Ответ/i);
    expect(answerFields.length).toBe(2);

    fireEvent.change(answerFields[1], { target: { value: "New answer" } });
    expect(answerFields[1]).toHaveValue("New answer");

    fireEvent.click(screen.getAllByTestId("RemoveIcon")[0]);

    answerFields = screen.getAllByLabelText(/Ответ/i);
    expect(answerFields.length).toBe(1);
  });

  it("handles title and answer changes", () => {
    render(<CreatePollForm onCreate={mockOnCreate} />);

    const titleInput = screen.getByLabelText("Заголовок опроса");
    const answerInput = screen.getByLabelText("Ответ 1");

    fireEvent.change(titleInput, { target: { value: "New poll title" } });
    fireEvent.change(answerInput, { target: { value: "New answer" } });

    expect(titleInput).toHaveValue("New poll title");
    expect(answerInput).toHaveValue("New answer");
  });

  it("creates a poll when form is valid", () => {
    render(<CreatePollForm onCreate={mockOnCreate} />);

    const titleInput = screen.getByLabelText("Заголовок опроса");
    const answerInput = screen.getByLabelText("Ответ 1");
    const createButton = screen.getByRole("button", { name: /создать опрос/i });

    fireEvent.change(titleInput, { target: { value: "New poll title" } });
    fireEvent.change(answerInput, { target: { value: "New answer" } });

    fireEvent.click(createButton);

    expect(mockOnCreate).toHaveBeenCalledWith({
      title: "New poll title",
      answers: ["New answer"],
      votes: [0],
      type: "single",
      submitted: false,
    });
  });

  it("does not create a poll when form is invalid", () => {
    render(<CreatePollForm onCreate={mockOnCreate} />);

    const createButton = screen.getByRole("button", { name: /создать опрос/i });

    fireEvent.click(createButton);

    expect(mockOnCreate).not.toHaveBeenCalled();
  });
});
