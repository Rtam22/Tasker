import { fireEvent, screen, render, cleanup } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { routesConfig } from "../router.js";

export function renderWithRouter() {
  const routerRender = createMemoryRouter(routesConfig, {
    initialEntries: ["/notes"],
  });

  const renderRoute = render(<RouterProvider router={routerRender} />);

  return {
    renderRoute,
    routerRender,
    refreshPage: () => {
      cleanup();
      return render(<RouterProvider router={routerRender} />);
    },
  };
}

export function navigateToBin() {
  const binElement = screen.getAllByText("Bin");
  fireEvent.click(binElement[0]);
  fireEvent.click(screen.getByTestId("notes-tab"));
  return screen.getByTestId("binList");
}
