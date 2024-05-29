"use client";

import { Component } from "react";
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
} from "devextreme-react/data-grid";
import { exportDataGrid } from "devextreme/excel_exporter";
import 'devextreme/dist/css/dx.light.css'; // O el tema que estés usando (dx.light.css, dx.dark.css, etc.)
import { Item } from "devextreme-react/form";
import { employees } from "./data.js";

const calculateCellValue = (data) =>
  [data.Title, data.FirstName, data.LastName].join(" ");

const exportFormats = ["xlsx"];

class HomePage extends Component {
  state = {
    tareas: [],
    showColumnLines: true,
    showRowLines: true,
    showBorders: true,
    rowAlternationEnabled: true,
  };

  componentDidMount() {
    this.obtenerContacto();
  }

  obtenerContacto = () => {
    fetch("http://localhost:5051/")
      .then((response) => response.json(), "SE CARGO LA DATA")
      .then((data) => {
        // Extraer los datos de la tarea del objeto anidado
        const tareas = Object.values(data).map((item) => item);
        this.setState({ tareas });
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
      <div className="text-center">
        <div>
          <div>
            <DataGrid
              id="gridContainer"
              dataSource={this.state.tareas}
              keyExpr="idContacto"
              allowColumnReordering={true}
              allowColumnResizing={true}
              columnAutoWidth={true}
              showBorders={true}
              showColumnLines={showColumnLines}
              showRowLines={showRowLines}
              rowAlternationEnabled={rowAlternationEnabled}
              focusedRowEnabled={true}
              focusedRowKey={this.state.focusedRowKey}
              onFocusedRowChanged={(e) => {
                this.setState({ focusedRowKey: e.row?.id });
              }}
            >
                       <Paging enabled={false} />
          <Editing
            mode="popup"
            allowUpdating={true}
            allowAdding={true}
            allowDeleting={true}
            onChangesChange={(e) => {
              if (e.changes && e.changes.length > 0) {
                const id = e.changes[0].key; // Obtener el id de la tarea
                const cambios = e.changes[0].data; // Obtener los cambios realizados
                this.actualizarTarea(id, cambios); // Llamar a actualizarTarea con el id y los cambios
              }
            }}
          >
            <Popup
              title="Task Info"
              showTitle={true}
              width={700}
              height={525}
            />
            <Form>
              <Item itemType="group" colCount={2} colSpan={2}>
                <Item dataField="titulo" />
                <Item dataField="descripcion" />
                <Item dataField="estado" />
                <Item dataField="fechaInicio" />
                <Item dataField="fechaFin" />
                <Item dataField="prioridad" />
                <Item dataField="etiquetas" />
              </Item>
            </Form>
          </Editing>
              <FilterRow visible={true} />
              <FilterPanel visible={true} />
              <HeaderFilter visible={true} />
              <Scrolling columnRenderingMode="virtual" />
              <SearchPanel visible={true} />
              <Grouping contextMenuEnabled={true} expandMode="rowClick" />
              <GroupPanel
                visible={true}
                emptyPanelText="Use the context menu of header columns to group data"
              />
              <Export
                enabled={true}
                formats={exportFormats}
                allowExportSelectedData={true}
              />

              <ColumnChooser enabled={true} />
              <ColumnFixing enabled={true} />

              <Column dataField="idContacto" />
              <Column dataField="nombre" alignment="right" />
              <Column dataField="telefono" alignment="right" />
              <Column dataField="fechaNacimiento" dataType="date" />
            </DataGrid>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
