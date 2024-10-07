/* eslint-disable @typescript-eslint/no-unused-vars */
import {defineConfig} from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    }
  }
});
