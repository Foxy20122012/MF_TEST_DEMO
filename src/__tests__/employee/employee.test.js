import React from 'react';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import Employee from '../../app/employee/page';
import userEvent from '@testing-library/user-event';
import Messages from '../../template/component/messages';


describe("Render ",()=>{
    beforeEach(()=>{
         // Renderizamos la página o componente
        render(<Employee/>);
    })
    //Test para validar existencia del texto
    it('render Page employee', () => {

        // Verificamos que el texto "Prueba testing" esté presente en el documento
        expect(screen.getAllByText("Employee"));
      });
});