const dns = require("dns");

module.exports = {
  sets: {
    desktop: {
      files: "test/hermione",
    },
  },

  browsers: {
    chrome: {
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
      screenshotMode: "fullpage",
    },
  },
  plugins: {
    "html-reporter/hermione": {
      enabled: true,
    },
  },
};
