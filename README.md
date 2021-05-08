![Netlify Status](https://api.netlify.com/api/v1/badges/6ec35d25-adc1-40e7-be1e-4d73e816d5fa/deploy-status)

<p>
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/rafaelmuttoni/advsindpro-frontend.svg">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/rafaelmuttoni/advsindpro-frontend.svg">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/rafaelmuttoni/advsindpro-frontend.svg">

  <a href="https://github.com/rafaelmuttoni/advsindpro-frontend/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/rafaelmuttoni/advsindpro-frontend.svg">
  </a>

  <a href="https://github.com/rafaelmuttoni/advsindpro-frontend/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/rafaelmuttoni/advsindpro-frontend.svg">
  </a>
</p>

<h1>
    AdvSind Pro
</h1>

<p>A Web App built for a Condo Manager who also works as a Lawyer.</p>

## :rocket: Technologies

This project was built with React and Material UI (using Material Kit's boilerplate). It's using Axios to communicate with the API, FullCalendar (with Moment) for an awesome Calendar/Schedule and React-pdf for automating PDF creation.

Some cool features for improved User Experience:
1️⃣ The application has a Context with a State that stores a information about which condo is selected (the default is All Condos), so the user can select a specific condo and all the dashboard information will be related to the selected condo.
2️⃣ When the user is creating a condo, after inputing the zip code the application makes a GET request to [Via Cep's Api](https://viacep.com.br/) to get address information and automatically fills some of the inputs.

Check the [API's repository](https://github.com/rafaelmuttoni/advsindpro-backend/).

## :information_source: How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/) or [Yarn](https://yarnpkg.com/) on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/rafaelmuttoni/advsindpro-frontend

# Go into the repository
$ cd advsindpro-frontend

# Install dependencies
$ yarn

# Run gatsby server
$ yarn dev
```

---

:wave: [Get in touch!](https://www.linkedin.com/in/rafaelmuttoni/)
