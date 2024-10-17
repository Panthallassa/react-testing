import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

// Smoke Test
it("renders Carousel without crashing", () => {
	render(
		<Carousel photos={TEST_IMAGES} title='Test Carousel' />
	);
});

// Snapshot Test
it("matches Carousel snapshot", () => {
	const { asFragment } = render(
		<Carousel photos={TEST_IMAGES} title='Test Carousel' />
	);
	expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
	const { container } = render(
		<Carousel
			photos={TEST_IMAGES}
			title='images for testing'
		/>
	);
	// expect the first image to show, but not the second
	expect(
		container.querySelector('img[alt="testing image 1"]')
	).toBeInTheDocument();
	expect(
		container.querySelector('img[alt="testing image 2"]')
	).not.toBeInTheDocument();

	// move forward in the carousel
	const rightArrow = container.querySelector(
		".bi-arrow-right-circle"
	);
	fireEvent.click(rightArrow);

	// expect the second image to show, but not the first
	expect(
		container.querySelector('img[alt="testing image 1"]')
	).not.toBeInTheDocument();
	expect(
		container.querySelector('img[alt="testing image 2"]')
	).toBeInTheDocument();
});

// Catching Bug #1
it("should work when you click on the left arrow", function () {
	const { container } = render(
		<Carousel
			photos={TEST_IMAGES}
			title='image for testing'
		/>
	);

	// Move forward to the second image
	const rightArrow = container.querySelector(
		".bi-arrow-right-circle"
	);
	fireEvent.click(rightArrow);

	// Expect the second image to show, and not the first
	expect(
		container.querySelector('img[alt="testing image 2"]')
	).toBeInTheDocument();
	expect(
		container.querySelector('img[alt="testing image 1"]')
	).not.toBeInTheDocument();

	// Click arrow left to go back to the first image
	const leftArrow = container.querySelector(
		".bi-arrow-left-circle"
	);
	fireEvent.click(leftArrow);

	// expect first image to show and not the second
	expect(
		container.querySelector('img[alt="testing image 1"]')
	).toBeInTheDocument();
	expect(
		container.querySelector('img[alt="testing image 2"]')
	).not.toBeInTheDocument();
});

// Catching Bug #2
it("should hide the left arrow when on the first image", function () {
	const { container } = render(
		<Carousel
			photos={TEST_IMAGES}
			title='images for testing'
		/>
	);

	// Expect the left arrow to be hidden
	expect(
		container.querySelector(".bi-arrow-left-circle")
	).not.toBeInTheDocument();
});

it("should hide the right arrow when in the last image", function () {
	const { container } = render(
		<Carousel
			photos={TEST_IMAGES}
			title='images for testing'
		/>
	);

	// Move to the last image
	const rightArrow = container.querySelector(
		".bi-arrow-right-circle"
	);
	fireEvent.click(rightArrow);

	// Expect the right arrow to be hidden
	expect(
		container.querySelector(".bi-arrow-right-cirlce")
	).not.toBeInTheDocument();
});
