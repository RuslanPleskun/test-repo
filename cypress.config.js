const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: true,
  watchForFileChanges: false,
  screenshotOnRunFailure: true,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: "mochareports",
    overwrite: true,
    html: true,
    json: true,
    attachments: true
  },
  retries: 1,
  e2e: {
    baseUrl: 'https://allo.ua/',
    setupNodeEvents(on, config) {
    },
  },
});
