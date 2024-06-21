const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
  e2e: {
    baseUrl: "http://localhost:3000/",
    chromeWebSecurity: false, // Deshabilita la política de seguridad del mismo origen para Chrome
    experimentalStudio: true, // Habilita Cypress Studio para la creación visual de pruebas
    setupNodeEvents(on, config) {
      // Implementar otros eventos del nodo aquí si es necesario
    },
  },
});
