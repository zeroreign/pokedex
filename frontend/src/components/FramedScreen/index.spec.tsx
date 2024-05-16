import { render, screen, waitFor } from "@testing-library/react";

describe("Screen Frame", () => {
  it("should render", async () => {
    render(<FramedScreen />);
  });
});