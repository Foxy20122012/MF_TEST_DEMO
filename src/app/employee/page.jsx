'use client'
import 'devextreme/dist/css/dx.light.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Button } from 'devextreme-react/button'

import React from "react";

import DataGrid, {
    Column,
    ColumnChooser,
    ColumnFixing,
    Editing,
    Popup,
    Paging,
    Form,
    Export,
    Grouping,
    GroupPanel,
    Pager,
    SearchPanel,
    FilterRow,
    HeaderFilter,
    FilterPanel,
    FilterBuilderPopup,
    Scrolling,
    Item
  } from "devextreme-react/data-grid";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showColumnLines: true,
            showRowLines: true,
            showBorders: true,
            rowAlternationEnabled: true,
            customers: [
                { id: 1, companyName: 'Super Mart of the West', city: 'Los Angeles', state: 'CA' },
                { id: 2, companyName: 'Electronics Depot', city: 'New York', state: 'NY' },
                // Add more customers as needed
            ]
        };

        this.dataGridRef = React.createRef();
        this.onToolbarPreparing = this.onToolbarPreparing.bind(this);
    }

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
                        <Popup title="Customer Information" showTitle={true} width={700} height={525}>
                            <Form>
                                <Item itemType="group" colCount={2} colSpan={2}>
                                    <Item dataField="companyName" />
                                    <Item dataField="city" />
                                    <Item dataField="state" />
                                </Item>
                            </Form>
                        </Popup>
                    </Editing>
                    <Column dataField="companyName" />
                    <Column dataField="city" />
                    <Column dataField="state" />
                </DataGrid>
                <Button
                icon="save"
                text="Save"
            />
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
