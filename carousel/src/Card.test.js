import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

// Smoke test
it("should render Card without crashing", () => {
	render(
		<Card
			caption='Test Image'
			src='test.jpg'
			currNum={1}
			totalNum={3}
		/>
	);
});

// Snapshot test
it("matches Card snapshot", () => {
	const { asFragment } = render(
		<Card
			caption='Test Image'
			src='test.jpg'
			currNum={1}
			totalNum={3}
		/>
	);
	expect(asFragment()).toMatchSnapshot();
});
