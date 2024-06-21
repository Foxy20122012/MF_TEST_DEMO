// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands');

// Ignorar errores de ResizeObserver
const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]$/;

Cypress.on('uncaught:exception', (err) => {
    console.log('Uncaught exception:', err.message);
  // Ignorar errores de ResizeObserver
  if (err.message.includes('ResizeObserver loop limit exceeded') || 
      err.message.includes('ResizeObserver loop completed with undelivered notifications')) {
    return false;
  }
  // Permitir que Cypress falle en otros errores
  return true;
});

// Deshabilitar temporalmente ResizeObserver si es necesario
if (Cypress.env('IGNORE_RESIZE_OBSERVER_ERRORS')) {
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
