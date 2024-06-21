'use client'
import React, { Component } from "react";
import CategoryService from "@/services/warehouse/products/category"
import 'devextreme/dist/css/dx.light.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import DataGrid, { Column, Editing, Popup, Paging, Form, Pager, Item, SearchPanel, FilterRow, Scrolling } from "devextreme-react/data-grid";
import ResponseHandler from '@/module/handler/responseHandler';
import Messages from '@/template/component/messages';
import { LoadPanel } from 'devextreme-react/load-panel';

const allowedPageSizes = [5, 10, 20];

export default class ProductsPage extends Component{

    request = new CategoryService();

    constructor(props) {
        super(props);
        this.state = {
            showColumnLines: true,
            showRowLines: true,
            showBorders: true,
            rowAlternationEnabled: true,
            category: props.category || [],
            focusedRowKey: null,
            showLoader: false
        }; 
        this.dataGridRef = React.createRef();
        this.onToolbarPreparing = this.onToolbarPreparing.bind(this);
    }
  
    componentDidMount() {
        if (!this.props.category) {
            this.getCategory();
        }
    }
  
    getCategory = () => {
        this.setState({ showLoader: true });
        this.request.getCategory()
            .then(ok => {
                this.setState({
                    category: ok.data,
                    showLoader: false
                });
            })
            .catch(error => {
                this.setState({ showLoader: false });
                ResponseHandler.error(error);
            });
    }


    
  addCategory = (data) => {
    this.request.addCategory(data)
        .then(ok => {
            this.getCategory(); // Refresca la lista de empleados
            ResponseHandler.success('Agregado exitosamente');
        })
        .catch(error => {
            console.error('Error agregando ', error);
            ResponseHandler.error(error);
        });
}

updateCategory = (id, newData) => {
    const oldData = this.state.category.find(ctm => ctm.id === id);
    const updatedData = { ...oldData, ...newData }; // Fusiona los datos antiguos con los nuevos
    this.request.updateCategory(id, updatedData)
        .then(ok => {
            this.getCategory(); // Refresca la lista de empleados
            ResponseHandler.success(' exitosamente');
        })
        .catch(error => {
            console.error('Error actualizando :', error);
            ResponseHandler.error(error);
        });
}

deleteCategory = (id) => {
    this.request.deleteCategory(id)
        .then(ok => {
            this.getCategory(); // Refresca la lista de empleados
            
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
        const { showColumnLines, showRowLines, rowAlternationEnabled, category, focusedRowKey } = this.state;
        return(
            <div>
                  <React.Fragment>
                  <DataGrid
                        useIcons
                        ref={this.dataGridRef}
                        dataSource={this.state.category}
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
                                        this.addCategory(cambios);
                                    } else {
                                        // Es una actualización
                                        const id = key;
                                        this.updateCategory(id, cambios);
                                    }
                                } else {
                                    e.cancel = true; // Cancelar la operación si el usuario cancela la confirmación
                                }
                            }
                        }}
      
                        onRowRemoving={async (e) => {
                            // Ejecutar eliminación sin confirmación personalizada
                            this.deleteCategory(e.data.id);
                        }}
                    >
                        <Scrolling mode="standard" />
                        <Paging defaultPageSize={10} />
                        <Pager showPageSizeSelector={true} allowedPageSizes={allowedPageSizes} showInfo={true} />
                        <SearchPanel visible={true} highlightCaseSensitive={true} placeholder='Buscar Cetegoria'/>
                        <Column dataField="id" caption="ID" />
                        <Column dataField="name" caption="Name" />
                        <Column dataField="description" caption="Description" />
                        <Column dataField="created_at" caption="Created At" dataType="date" />
                        <FilterRow visible={true} />
                        <Editing
                            mode="popup"
                            useIcons
                            allowAdding={true}
                            allowUpdating={true}
                            allowDeleting={true}
                            onRowInserting={(e) => this.addCategory(e.data)}
                            onRowUpdating={(e) => this.updateCategory(e.key, e.newData)}
                        >
                            <Popup title="Category Info" showTitle={true} width={700} height={525} />
                            <Form>
                                <Item dataField="name" />
                                <Item dataField="description" />
                            </Form>
                        </Editing>
                    </DataGrid>
                  </React.Fragment>
            </div>
        )
    }
}

