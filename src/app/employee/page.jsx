'use client'
import 'devextreme/dist/css/dx.light.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from "react";
import { Button } from 'devextreme-react/button'
import DataGrid, { Column, ColumnChooser, ColumnFixing, Editing, Popup, Paging, Form, Export, Grouping, GroupPanel, Pager, 
    SearchPanel, FilterRow, HeaderFilter, FilterPanel, FilterBuilderPopup, Scrolling, Item } from "devextreme-react/data-grid";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showColumnLines: true,
            showRowLines: true,
            showBorders: true,
            rowAlternationEnabled: true,
            employees: []
        };

        this.dataGridRef = React.createRef();
        this.onToolbarPreparing = this.onToolbarPreparing.bind(this);
    }

    componentDidMount() {
        this.getEmployee();
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

    render() {
        const {
            showColumnLines,
            showRowLines,
            showBorders,
            rowAlternationEnabled,
          } = this.state;
        return (
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
                    <Column dataField="idEmpleado" caption="ID Empleado" />
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

export default App;
