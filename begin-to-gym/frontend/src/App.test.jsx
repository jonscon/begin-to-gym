import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import App from "./App.jsx";

describe("test App.jsx", function () {
    it("renders without crashing", function () {
        render(<App />);
    })

    it("matchces snapshot", function () {
        const {asFragment} = render(<App />);
        expect(asFragment()).toMatchSnapshot();
    })
})
