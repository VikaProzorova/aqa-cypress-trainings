const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.test.{js,jsx,ts,tsx}',
    baseUrl: 'https://qauto.forstudy.space',
    env: {
      contacts: {
        supportEmailHref: 'mailto:developer@ithillel.ua',
        supportEmailLabel: 'support@ithillel.ua',
        mainSiteHref: 'https://ithillel.ua',
        mainSiteLabel: 'ithillel.ua',
        facebookHref: 'https://www.facebook.com/Hillel.IT.School',
        telegramHref: 'https://t.me/ithillel_kyiv',
        youtubeHref: 'https://www.youtube.com/user/HillelITSchool',
        linkedinHref: 'https://www.linkedin.com/school/ithillel/'
      }
    },
  },
});
