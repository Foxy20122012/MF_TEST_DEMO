'use client'
import React from "react";
import EmployeeService from "@/services/rrhh/employees/employeeService";
import 'devextreme/dist/css/dx.light.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import DataGrid, { Column, Editing, Popup, Paging, Form, Pager, Item, SearchPanel, FilterRow, Scrolling } from "devextreme-react/data-grid";
import ResponseHandler from '@/module/handler/responseHandler';
import Messages from '@/template/component/messages';
import { LoadPanel } from 'devextreme-react/load-panel';


const allowedPageSizes = [5, 10, 20];

class Employee extends React.Component {
    
    request = new EmployeeService();

    constructor(props) {
        super(props);
        this.state = {
            showColumnLines: true,
            showRowLines: true,
            showBorders: true,
            rowAlternationEnabled: true,
            employees: props.testEmployees || [],
            focusedRowKey: null,
            showLoader: false
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
        this.setState({ showLoader: true });
        this.request.getEmployee()
            .then(ok => {
                this.setState({
                    employees: ok.data,
                    showLoader: false
                });
            })
            .catch(error => {
                this.setState({ showLoader: false });
                ResponseHandler.error(error);
            });
    }

    addEmployee = (data) => {
        this.request.addEmployee(data)
            .then(ok => {
                this.getEmployee(); // Refresca la lista de empleados
                ResponseHandler.success('Empleado agregado exitosamente');
            })
            .catch(error => {
                console.error('Error agregando empleado:', error);
                ResponseHandler.error(error);
            });
    }

    updateEmployee = (id, newData) => {
        const oldData = this.state.employees.find(emp => emp.id === id);
        const updatedData = { ...oldData, ...newData }; // Fusiona los datos antiguos con los nuevos
        this.request.updateEmployee(id, updatedData)
            .then(ok => {
                this.getEmployee(); // Refresca la lista de empleados
                ResponseHandler.success(' exitosamente');
            })
            .catch(error => {
                console.error('Error actualizando empleado:', error);
                ResponseHandler.error(error);
            });
    }

    deleteEmployee = (id) => {
        this.request.deleteEmployee(id)
            .then(ok => {
                this.getEmployee(); // Refresca la lista de empleados
                
            })
            .catch(error => {
                console.error('Error eliminando empleado:', error);
                ResponseHandler.error(error);
            });
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

    render() {
        const { showColumnLines, showRowLines, rowAlternationEnabled, employees, focusedRowKey } = this.state;
        return (
            <div>
                <React.Fragment>
                    <DataGrid
                        useIcons
                        ref={this.dataGridRef}
                        dataSource={employees}
                        keyExpr="id"
                        showBorders={true}
                        onToolbarPreparing={this.onToolbarPreparing}
                        allowColumnReordering={true}
                        allowColumnResizing={true}
                        columnAutoWidth={true}
                        showColumnLines={showColumnLines}
                        showRowLines={showRowLines}
                        rowAlternationEnabled={rowAlternationEnabled}
                        focusedRowEnabled={true}
                        focusedRowKey={focusedRowKey}
                        onFocusedRowChanged={(e) => {
                            this.setState({ focusedRowKey: e.row?.id });
                        }}
                        onSaving={async (e) => {
                            // Confirmar solo para guardado (inserción o actualización)
                            if (e.changes && e.changes.length > 0) {
                                const confirm = await Messages.confirm("¿Estás seguro de que quieres guardar los cambios?", "Guardar");
                                if (confirm) {
                                    const cambios = e.changes[0].data; // Obtener los cambios realizados
                                    const key = e.changes[0].key; // Obtener la key de la tarea
                                    if (key && typeof key === "string" && key.startsWith("_DX_KEY_")) {
                                        // Es una inserción
                                        this.addEmployee(cambios);
                                    } else {
                                        // Es una actualización
                                        const id = key;
                                        this.updateEmployee(id, cambios);
                                    }
                                } else {
                                    e.cancel = true; // Cancelar la operación si el usuario cancela la confirmación
                                }
                            }
                        }}
      
                        onRowRemoving={async (e) => {
                            // Ejecutar eliminación sin confirmación personalizada
                            this.deleteEmployee(e.data.id);
                        }}
                    >
                        <Scrolling mode="standard" />
                        <Paging defaultPageSize={10} />
                        <Pager showPageSizeSelector={true} allowedPageSizes={allowedPageSizes} showInfo={true} />
                        <SearchPanel visible={true} highlightCaseSensitive={true} placeholder='Buscar empleado'/>
                        <Column dataField="id" caption="ID" />
                        <Column dataField="first_name" caption="First Name" />
                        <Column dataField="last_name" caption="Last Name" />
                        <Column dataField="email" caption="Email" />
                        <Column dataField="phone" caption="Phone" />
                        <Column dataField="job_title" caption="Job Title" />
                        <Column dataField="salary" caption="Salary" />
                        <Column dataField="created_at" caption="Created At" dataType="date" />
                        <FilterRow visible={true} />
                        <Editing
                            mode="popup"
                            useIcons
                            allowAdding={true}
                            allowUpdating={true}
                            allowDeleting={true}
                            onRowInserting={(e) => this.addEmployee(e.data)}
                            onRowUpdating={(e) => this.updateEmployee(e.key, e.newData)}
                        >
                            <Popup title="Employee Info" showTitle={true} width={700} height={525} />
                            <Form>
                                <Item dataField="first_name" />
                                <Item dataField="last_name" />
                                <Item dataField="email" />
                                <Item dataField="phone" />
                                <Item dataField="job_title" />
                                <Item dataField="salary" />
                            </Form>
                        </Editing>
                    </DataGrid>
                </React.Fragment>
            </div>
        );
    }
}

export default Employee;
