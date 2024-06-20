import React from 'react';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import Employee from '@/app/example/page';


it('render popup employee', () => {
    render(<Employee/>);
    // Verificamos que el texto "Prueba testing" esté presente en el documento
    expect(screen.getAllByText("Empleados"));
  });



const mockEmployees = [
    { idEmpleado: 1, nombre: 'Juan', apellido: 'Perez', telefono: '123456789', correoElectronico: 'juan@example.com', salario: 1000, puesto: 'Desarrollador', direccion: 'Calle 1', ciudad: 'Ciudad 1', pais: 'País 1', estadoCivil: 'Soltero', numeroHijos: 0, seguroSocial: '123-45-6789', evaluacionDesempeno: 'Bueno'},
    { idEmpleado: 2, nombre: 'Ana', apellido: 'Garcia', telefono: '987654321', correoElectronico: 'ana@example.com', salario: 1200, puesto: 'Analista', direccion: 'Calle 2', ciudad: 'Ciudad 2', pais: 'País 2', estadoCivil: 'Casado', numeroHijos: 2, seguroSocial: '987-65-4321', evaluacionDesempeno: 'Excelente' }
    // Añade más empleados simulados según sea necesario
];



it('should load all employee data into the table', async () => {
    await act(async () => {
        render(<Employee testEmployees={mockEmployees} />);
    });

    // Verifica que el DataGrid esté presente
    const dataGrid = document.querySelector('.dx-datagrid');
    expect(dataGrid).toBeInTheDocument();

    // Espera a que las filas de datos se rendericen
    await waitFor(() => {
        const rows = dataGrid.querySelectorAll('.dx-data-row');
        const dataRows = Array.from(rows).filter(row => {
            // Filtrar filas que contienen datos específicos para empleados
            return mockEmployees.some(employee => {
                return row.textContent.includes(employee.nombre) &&
                       row.textContent.includes(employee.apellido);
            });
        });
        expect(dataRows.length).toBe(mockEmployees.length);
    });

    // Verifica que cada empleado esté presente en la tabla
    mockEmployees.forEach(employee => {
        expect(dataGrid).toHaveTextContent(employee.nombre);
        expect(dataGrid).toHaveTextContent(employee.apellido);
        expect(dataGrid).toHaveTextContent(employee.telefono);
        expect(dataGrid).toHaveTextContent(employee.correoElectronico);
        expect(dataGrid).toHaveTextContent(employee.salario.toString());
        expect(dataGrid).toHaveTextContent(employee.puesto);
        expect(dataGrid).toHaveTextContent(employee.direccion);
        expect(dataGrid).toHaveTextContent(employee.ciudad);
        expect(dataGrid).toHaveTextContent(employee.pais);
        expect(dataGrid).toHaveTextContent(employee.estadoCivil);
        expect(dataGrid).toHaveTextContent(employee.numeroHijos.toString());
        expect(dataGrid).toHaveTextContent(employee.seguroSocial);
        expect(dataGrid).toHaveTextContent(employee.evaluacionDesempeno);
     
          
        // Añade más verificaciones para otros campos si es necesario
    });
});




// Handles empty employee list gracefully
it('should handle empty employee list gracefully', async () => {
    await act(async () => {
        render(<Employee />);
    });

    // Verifica que el componente DataGrid esté presente
    const dataGrid = document.querySelector('.dx-datagrid');
    expect(dataGrid).toBeInTheDocument();

    // Verifica que el DataGrid esté vacío buscando la clase de fila de datos específica
    const rows = dataGrid.querySelectorAll('.dx-data-row');
    expect(rows.length).toBe(0);
});


