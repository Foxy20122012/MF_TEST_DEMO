'use client'
import React, { Component } from "react";
import CustomersService from "@/services/sales/customers/customers"
import 'devextreme/dist/css/dx.light.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import DataGrid, { Column, Editing, Popup, Paging, Form, Pager, Item, SearchPanel, FilterRow, Scrolling } from "devextreme-react/data-grid";
import ResponseHandler from '@/module/handler/responseHandler';
import Messages from '@/template/component/messages';
import { LoadPanel } from 'devextreme-react/load-panel';

const allowedPageSizes = [5, 10, 20];

export default class ProductsPage extends Component{
  request = new CustomersService();

  constructor(props) {
      super(props);
      this.state = {
          showColumnLines: true,
          showRowLines: true,
          showBorders: true,
          rowAlternationEnabled: true,
          customers: props.testCustomers || [],
          focusedRowKey: null,
          showLoader: false
      }; 
      this.dataGridRef = React.createRef();
      this.onToolbarPreparing = this.onToolbarPreparing.bind(this);
  }

  componentDidMount() {
      if (!this.props.testCustomers) {
          this.getCustomer();
      }
  }

  getCustomer = () => {
      this.setState({ showLoader: true });
      this.request.getCustomer()
          .then(ok => {
              this.setState({
                  customers: ok.data,
                  showLoader: false
              });
          })
          .catch(error => {
              this.setState({ showLoader: false });
              ResponseHandler.error(error);
          });
  }



  addCustomer = (data) => {
    this.request.addCustomer(data)
        .then(ok => {
            this.getCustomer(); // Refresca la lista de empleados
            ResponseHandler.success('Agregado exitosamente');
        })
        .catch(error => {
            console.error('Error agregando ', error);
            ResponseHandler.error(error);
        });
}

updateCustomer = (id, newData) => {
    const oldData = this.state.customers.find(ctm => ctm.id === id);
    const updatedData = { ...oldData, ...newData }; // Fusiona los datos antiguos con los nuevos
    this.request.updateCustomers(id, updatedData)
        .then(ok => {
            this.getCustomer(); // Refresca la lista de empleados
            ResponseHandler.success(' exitosamente');
        })
        .catch(error => {
            console.error('Error actualizando :', error);
            ResponseHandler.error(error);
        });
}

deleteCustomer = (id) => {
    this.request.deleteCustomer(id)
        .then(ok => {
            this.getCustomer(); // Refresca la lista de empleados
            
        })
        .catch(error => {
            console.error('Error eliminando :', error);
            ResponseHandler.error(error);
        });
}



  //
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
  render(){
    const { showColumnLines, showRowLines, rowAlternationEnabled, customers, focusedRowKey } = this.state;
    return(
      <div>
        Customers
        <React.Fragment>
        <DataGrid
                        useIcons
                        ref={this.dataGridRef}
                        dataSource={this.state.customers}
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
                                        this.addCustomer(cambios);
                                    } else {
                                        // Es una actualización
                                        const id = key;
                                        this.updateCustomer(id, cambios);
                                    }
                                } else {
                                    e.cancel = true; // Cancelar la operación si el usuario cancela la confirmación
                                }
                            }
                        }}
      
                        onRowRemoving={async (e) => {
                            // Ejecutar eliminación sin confirmación personalizada
                            this.deleteCustomer(e.data.id);
                        }}
                    >
                        <Scrolling mode="standard" />
                        <Paging defaultPageSize={10} />
                        <Pager showPageSizeSelector={true} allowedPageSizes={allowedPageSizes} showInfo={true} />
                        <SearchPanel visible={true} highlightCaseSensitive={true} placeholder='Buscar'/>
                        <Column dataField="id" caption="ID" />
                        <Column dataField="first_name" caption="First Name" />
                        <Column dataField="last_name" caption="Last Name" />
                        <Column dataField="email" caption="Email" />
                        <Column dataField="phone" caption="Phone" />
                        <Column dataField="address" caption="Address" />
                        <Column dataField="city" caption="city" />
                        <Column dataField="country" caption="country" />
                        <Column dataField="created_at" caption="Created At" dataType="date" />
                        <FilterRow visible={true} />
                        <Editing
                            mode="popup"
                            useIcons
                            allowAdding={true}
                            allowUpdating={true}
                            allowDeleting={true}
                            onRowInserting={(e) => this.addCustomer(e.data)}
                            onRowUpdating={(e) => this.updateCustomer(e.key, e.newData)}
                        >
                            <Popup title="Customer Info" showTitle={true} width={700} height={525} />
                            <Form>
                                <Item dataField="first_name" />
                                <Item dataField="last_name" />
                                <Item dataField="email" />
                                <Item dataField="phone" />
                                <Item dataField="address" />
                                <Item dataField="city" />
                                <Item dataField="country" />
                            </Form>
                        </Editing>
                    </DataGrid>
        </React.Fragment>
      </div>

    )
  }
}

