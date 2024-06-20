'use client'
import 'devextreme/dist/css/dx.light.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from "react";
import { Toast } from 'devextreme-react/toast';


import DataGrid, { Column, ColumnChooser, ColumnFixing, Editing, Popup, Paging, Form, Export, Grouping, GroupPanel, Pager, 
    SearchPanel, FilterRow, HeaderFilter, FilterPanel, FilterBuilderPopup, Scrolling, Item } from "devextreme-react/data-grid";
    
    

class Employee extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showColumnLines: true,
            showRowLines: true,
            showBorders: true,
            rowAlternationEnabled: true,
            employees: props.testEmployees || []
        };

        this.dataGridRef = React.createRef();
        this.onToolbarPreparing = this.onToolbarPreparing.bind(this);
    }

    componentDidMount() {
      if (!this.props.testEmployees) {
        this.getEmployee();
    }
      }
    
      getEmployee = () => {
        fetch("http://localhost:5051/Empleado/List")
            .then((response) => response.json())
            .then((data) => {
                // Extraer los datos del objeto anidado
                const employees = Object.values(data);
                this.setState({ employees });
            })
            .catch((error) => console.error("Error:", error));
    };

    insertarEmpleado = (nuevoEmpleado) => {
        fetch(`http://localhost:5051/Empleado/Insert`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(nuevoEmpleado)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al insertar el empleado');
          }
          return response.json();
        })
        .then(data => {
          // Realiza cualquier acción adicional después de insertar el empleado
          console.log('Empleado insertado:', data);
        })
        .catch(error => {
          console.error('Error al insertar el empleado:', error);
        });
      };
      
      eliminarEmpleado = (id) => {
        fetch(`http://localhost:5051/Empleado/Delete/${id}`, {
          method: 'DELETE'
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al eliminar el empleado');
          }
          return response.json();
        })
        .then(data => {
          // Realiza cualquier acción adicional después de eliminar el empleado
          console.log('Empleado eliminado:', data);
        })
        .catch(error => {
          console.error('Error al eliminar el empleado:', error);
        });
      };
      
      actualizarEmpleado = (id, cambios) => {
        // Obtener el empleado existente
        const empleadoExistente = this.state.employees.find(emp => emp.idEmpleado === id);
      
        // Mezclar los cambios con el empleado existente
        const empleadoActualizado = { ...empleadoExistente, ...cambios };
      
        fetch(`http://localhost:5051/Empleado/Update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(empleadoActualizado)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al actualizar el empleado');
          }
          return response.json();
        })
        .then(data => {
          // Realiza cualquier acción adicional después de actualizar el empleado
          console.log('Empleado actualizado:', data);
        })
        .catch(error => {
          console.error('Error al actualizar el empleado:', error);
        });
      };
      
      
    render() {
        const {
            showColumnLines,
            showRowLines,
            showBorders,
            rowAlternationEnabled,
            employees
          } = this.state;
        return (
          <div>
        <div>Empleados</div>
            <React.Fragment>
                
                <DataGrid
                 
                    useIcons
                    ref={this.dataGridRef}
                    dataSource={this.state.employees}
                    keyExpr="idEmpleado"
                    showBorders={true}
                    onToolbarPreparing={this.onToolbarPreparing}
                    allowColumnReordering={true}
                    allowColumnResizing={true}
                    columnAutoWidth={true} 
                    showColumnLines={showColumnLines}
                    showRowLines={showRowLines}
                    rowAlternationEnabled={rowAlternationEnabled}
                    focusedRowEnabled={true}
                    focusedRowKey={this.state.focusedRowKey}
                    onFocusedRowChanged={(e) => {
                      this.setState({ focusedRowKey: e.row?.id });
                    }}
                    onEditingStart={() => alert("EditingStart")}
                    onSaving={(e) => {
                        if (window.confirm("¿Estás seguro de que quieres guardar los cambios?")) {
                          const cambios = e.changes[0].data; // Obtener los cambios realizados
                          const key = e.changes[0].key; // Obtener la key de la tarea
                          if (key && typeof key === "string" && key.startsWith("_DX_KEY_")) {
                            // Es una inserción
                            this.insertarEmpleado(cambios);
                          } else {
                            // Es una actualización
                            const id = key;
                            this.actualizarEmpleado(id, cambios);
                          }
                        } else {
                          e.cancel = true; // Cancelar la operación si el usuario cancela la confirmación
                        }
                      }}
                      
        
        onRowRemoving={(e) => {
          if (
            window.confirm(
              "¿Estás seguro de que quieres eliminar este registro?"
            )
          ) {
            this.eliminarEmpleado(e.data.idEmpleado);
          } else {
            e.cancel = true; // Cancela la eliminación si el usuario cancela la confirmación
          }
        }}
        onRowRemoved={() => alert("Eliminacion confirmada")}
                    >
                    <Editing
                        mode="popup"
                        useIcons
                        allowUpdating={true}
                        allowDeleting={true}
                        allowAdding={true}>
                        <Popup title="Employee Information" showTitle={true} width={700} height={525}>
                            <Form>
                                <Item itemType="group" colCount={2} colSpan={2}>
                                    <Item dataField="nombre" />
                                    <Item dataField="apellido" />
                                    <Item dataField="telefono" />
                                    <Item dataField="correoElectronico" />
                                    <Item dataField="salario" />
                                    <Item dataField="puesto" />
                                    <Item dataField="direccion" />
                                    <Item dataField="ciudad" />
                                    <Item dataField="pais" />
                                    <Item dataField="estadoCivil" />
                                    <Item dataField="numeroHijos" />
                                    <Item dataField="seguroSocial" />
                                    <Item dataField="evaluacionDesempeno" />
                                    <Item dataField="activo" />
                                </Item>
                            </Form>
                        </Popup>
                    </Editing>
                    <ColumnChooser enabled={true} />
                    <ColumnFixing enabled={true} />
                    <Column dataField="nombre" caption="Nombre" />
                    <Column dataField="apellido" caption="Apellido" />
                    <Column dataField="telefono" caption="Teléfono" />
                    <Column dataField="correoElectronico" caption="Correo Electrónico" />
                    <Column dataField="salario" caption="Salario" />
                    <Column dataField="puesto" caption="Puesto" />
                    <Column dataField="direccion" caption="Dirección" />
                    <Column dataField="ciudad" caption="Ciudad" />
                    <Column dataField="pais" caption="País" />
                    <Column dataField="estadoCivil" caption="Estado Civil" />
                    <Column dataField="numeroHijos" caption="Número de Hijos" />
                    <Column dataField="seguroSocial" caption="Seguro Social" />
                    <Column dataField="evaluacionDesempeno" caption="Evaluación de Desempeño" />    
                    <Column dataField="activo" caption="Activo" dataType="boolean" />
                </DataGrid>
            </React.Fragment>
            </div>
        );
    }

    onToolbarPreparing(e) {
        e.toolbarOptions.items.unshift(
            {
                location: 'before',
                widget: 'dxButton',
                options: {
                    icon: 'refresh',
                    onClick: this.refreshGrid.bind(this)
                }
            }
        );
    }

    refreshGrid() {
        this.dataGridRef.current.instance.refresh();
    }
}

export default Employee;
