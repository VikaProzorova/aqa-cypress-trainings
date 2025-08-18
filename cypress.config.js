const { defineConfig } = require("cypress");
const path = require("path");
const fs = require("fs");

const getConfigFileObject = (env = "qauto") => {
  const configFilePath = path.join(
    "cypress",
    "fixtures",
    "config",
    `cypress.env.${env}.json`
  );
  const configFileString = fs.readFileSync(configFilePath).toString();
  return JSON.parse(configFileString);
};

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        writeFile({ filename, content }) {
          fs.writeFileSync(filename, JSON.stringify(content, null, 2));
          return null;
        },
        readFile(filename) {
          return fs.readFileSync(filename, "utf8");
        },
      });
      const configOverrides = getConfigFileObject(
        process.env.TEST_ENVIRONMENT || "qauto"
      );
      const envDefaultVars = { ...config.env };
      config = { ...config, ...configOverrides };
      config.env = { ...config.env, ...envDefaultVars };
      console.log(config.baseUrl);
      return config;
    },
    specPattern: "cypress/e2e/**/*.test.{js,jsx,ts,tsx}",
    baseUrl: "https://qauto.forstudy.space",
    env: {
      contacts: {
        supportEmailHref: "mailto:developer@ithillel.ua",
        supportEmailLabel: "support@ithillel.ua",
        mainSiteHref: "https://ithillel.ua",
        mainSiteLabel: "ithillel.ua",
        facebookHref: "https://www.facebook.com/Hillel.IT.School",
        telegramHref: "https://t.me/ithillel_kyiv",
        youtubeHref: "https://www.youtube.com/user/HillelITSchool",
        linkedinHref: "https://www.linkedin.com/school/ithillel/",
      },
    },
    reporter: "mochawesome",
    reporterOptions: {
      overwrite: false,
      html: false,
      json: true,
    },
  },
});
