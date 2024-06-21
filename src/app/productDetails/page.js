'use client'
import React, { Component } from "react";
import ProductDestailsService from "@/services/warehouse/products/productDetails"
import 'devextreme/dist/css/dx.light.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import DataGrid, { Column, Editing, Popup, Paging, Form, Pager, Item, SearchPanel, FilterRow, Scrolling } from "devextreme-react/data-grid";
import ResponseHandler from '@/module/handler/responseHandler';
import Messages from '@/template/component/messages';
import { LoadPanel } from 'devextreme-react/load-panel';

const allowedPageSizes = [5, 10, 20];

export default class ProductsDetailsPage extends Component{

  request = new ProductDestailsService();


  constructor(props) {
    super(props);
    this.state = {
        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        rowAlternationEnabled: true,
        productDetails: props.productDetails || [],
        focusedRowKey: null,
        showLoader: false
    }; 
    this.dataGridRef = React.createRef();
    this.onToolbarPreparing = this.onToolbarPreparing.bind(this);
}

componentDidMount() {
    if (!this.props.productDetails) {
        this.getProductDestails();
    }
}

getProductDestails = () => {
    this.setState({ showLoader: true });
    this.request.getProductDestails()
        .then(ok => {
            this.setState({
                productDetails: ok.data,
                showLoader: false
            });
        })
        .catch(error => {
            this.setState({ showLoader: false });
            ResponseHandler.error(error);
        });
}



addProductDestails = (data) => {
this.request.addProductDestails(data)
    .then(ok => {
        this.getProductDestails(); // Refresca la lista de empleados
        ResponseHandler.success('Agregado exitosamente');
    })
    .catch(error => {
        console.error('Error agregando ', error);
        ResponseHandler.error(error);
    });
}

updateProductDestails = (id, newData) => {
const oldData = this.state.productDetails.find(ctm => ctm.id === id);
const updatedData = { ...oldData, ...newData }; // Fusiona los datos antiguos con los nuevos
this.request.updateProductDestails(id, updatedData)
    .then(ok => {
        this.getProductDestails(); // Refresca la lista de empleados
        ResponseHandler.success(' exitosamente');
    })
    .catch(error => {
        console.error('Error actualizando :', error);
        ResponseHandler.error(error);
    });
}

deleteProductDestails = (id) => {
this.request.deleteProductDestails(id)
    .then(ok => {
        this.getProductDestails(); // Refresca la lista de empleados
        
    })
    .catch(error => {
        console.error('Error eliminando :', error);
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
  render(){
    const { showColumnLines, showRowLines, rowAlternationEnabled, productDetails, focusedRowKey } = this.state;
    return(
        <div>
            <React.Fragment>
            <DataGrid
                        useIcons
                        ref={this.dataGridRef}
                        dataSource={this.state.productDetails}
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
                                        this.addProductDestails(cambios);
                                    } else {
                                        // Es una actualización
                                        const id = key;
                                        this.updateProductDestails(id, cambios);
                                    }
                                } else {
                                    e.cancel = true; // Cancelar la operación si el usuario cancela la confirmación
                                }
                            }
                        }}
      
                        onRowRemoving={async (e) => {
                            // Ejecutar eliminación sin confirmación personalizada
                            this.deleteProductDestails(e.data.id);
                        }}
                    >
                        <Scrolling mode="standard" />
                        <Paging defaultPageSize={10} />
                        <Pager showPageSizeSelector={true} allowedPageSizes={allowedPageSizes} showInfo={true} />
                        <SearchPanel visible={true} highlightCaseSensitive={true} placeholder='Buscar'/>
                        <Column dataField="id" caption="ID" />
                        <Column dataField="product_id" caption="Product Id" />
                        <Column dataField="attribute" caption="Attribute" />
                        <Column dataField="value" caption="Value" />
                        <Column dataField="created_at" caption="Created At" dataType="date" />
                        <FilterRow visible={true} />
                        <Editing
                            mode="popup"
                            useIcons
                            allowAdding={true}
                            allowUpdating={true}
                            allowDeleting={true}
                            onRowInserting={(e) => this.addProductDestails(e.data)}
                            onRowUpdating={(e) => this.updateProductDestails(e.key, e.newData)}
                        >
                            <Popup title="Product Details Info" showTitle={true} width={700} height={525} />
                            <Form>
                                <Item dataField="product_id" />
                                <Item dataField="attribute" />
                                <Item dataField="value" />
                            </Form>
                        </Editing>
                    </DataGrid>
            </React.Fragment>
        </div>
    )
  }
}