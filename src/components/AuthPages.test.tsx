import { it, expect, describe,vi } from 'vitest'
import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import AuthPages from "./AuthPages"; // Adjust the import path as necessary
import { Navigate } from "react-router-dom";
import Spinner from "./Spinner";
import '@testing-library/jest-dom/vitest';

vi.mock("react-router-dom", () => ({
  Navigate: vi.fn(() => null),
}));

describe("AuthPages", () => {
  it("displays a loading spinner initially", async () => {
    render(<AuthPages><></></AuthPages>);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
  
  it("navigates to login if no user is authenticated", async () => {
    render(<AuthPages><></></AuthPages>);
    await waitFor(() => expect(Navigate).toHaveBeenCalledWith({ to: "/login" }, {}));
  });
});
