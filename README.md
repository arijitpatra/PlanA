# Plan A Frontend Coding Challenge

## Intro

Plan A helps companies monitor, reduce, and offset their carbon footprint, based on the data
they input about their emissions. Though this gives individual companies visibility on their
own emissions, it doesn’t give us a clear idea on our progress on a country level.
This task addresses the other side of the problem; using satellite data to estimate the
amount of GHG emissions in the atmosphere over time to measure our actual impact.

## Install

### `npm install`

## Available Scripts

### `npm start`

### `npm test`

## Task

The repository implements a single page dashboard in React that shows the density of a given GHG for a
given country over a given date range, with the following requirements:

- The user is able to set the following parameters on the page:
	- GHG type (emission type)
	- Country (Germany, France, and UK)
	- Start date
	- End date

The task is to extend this functionality to:

- Add tabs to the chart to allow the user to aggregate the data by time: per month and year.
- Include tests for added functionalities

## Output

- You have 3 hours to complete the assignment. Please also let us know how long it took you so we can increase or reduce the scope for next time


## What we’re looking for

- UX/layout (elements positioning, responsiveness, browser support, accessibility)
- JS framework (rendering the page, updating part of it depending on how the info gets updated)
- General software development best practice (coding style, scalability, readability, etc.)
- Testing coverage

## Libraries

* [typescript](https://www.typescriptlang.org/)
* [material-ui](https://material-ui.com/)
* [recharts](https://recharts.org/en-US/)
* [styled-componets](https://styled-components.com/)
* [moment.js](https://momentjs.com/)
* [react-responsive](https://github.com/contra/react-responsive)
