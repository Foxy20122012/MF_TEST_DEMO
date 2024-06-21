/* ==== Test Created with Cypress Studio ==== */
it('Inserción productos', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('http://localhost:3000/product');
  cy.get('.text-2xl').click();
  cy.get('.dx-toolbar-item-auto-hide > .dx-item-content > .dx-widget > .dx-button-content > .dx-icon').click();
  cy.get('#dx_dx-dcbd741f-dc63-3f6e-9c7e-daa3061c7847_name').clear();
  cy.get('#dx_dx-dcbd741f-dc63-3f6e-9c7e-daa3061c7847_name').type('Mesa de noche');
  cy.get('#dx_dx-dcbd741f-dc63-3f6e-9c7e-daa3061c7847_description').clear('m');
  cy.get('#dx_dx-dcbd741f-dc63-3f6e-9c7e-daa3061c7847_description').type('mesa de noche para el dormitorio');
  cy.get('#dx_dx-dcbd741f-dc63-3f6e-9c7e-daa3061c7847_price').clear('7');
  cy.get('#dx_dx-dcbd741f-dc63-3f6e-9c7e-daa3061c7847_price').type('700');
  cy.get('#dx_dx-dcbd741f-dc63-3f6e-9c7e-daa3061c7847_category_id').clear('3');
  cy.get('#dx_dx-dcbd741f-dc63-3f6e-9c7e-daa3061c7847_category_id').type('3');
  cy.get('#dx_dx-dcbd741f-dc63-3f6e-9c7e-daa3061c7847_sku').click();
  cy.get('#dx_dx-dcbd741f-dc63-3f6e-9c7e-daa3061c7847_sku').clear('D');
  cy.get('#dx_dx-dcbd741f-dc63-3f6e-9c7e-daa3061c7847_sku').type('DOR-00086');
  cy.get('#dx_dx-dcbd741f-dc63-3f6e-9c7e-daa3061c7847_stock').clear('5');
  cy.get('#dx_dx-dcbd741f-dc63-3f6e-9c7e-daa3061c7847_stock').type('5');
  cy.get('.dx-popup-bottom > .dx-toolbar-items-container > .dx-toolbar-after > :nth-child(1) > .dx-item-content > .dx-widget > .dx-button-content > .dx-button-text').click();
  cy.get('.swal2-confirm').click();
  cy.get('.swal-button').click();
  /* ==== End Cypress Studio ==== */
});