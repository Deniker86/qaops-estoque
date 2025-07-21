const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://frontend-qaops:3000',
    retries: 3,
    video: true,  // garante gravação de vídeo
    setupNodeEvents(on, config) {
      // event listeners
    },
  },
});