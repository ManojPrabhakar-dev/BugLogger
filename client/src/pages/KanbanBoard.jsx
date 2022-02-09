import React, { useState } from "react";
import "./kanbanBoard.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

const itemsFromBackend = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" },
];

const columnsFromBackend = {
  [uuid()]: {
    index: 1,
    name: "BackLog",
    items: itemsFromBackend,
  },
  [uuid()]: {
    index: 2,
    name: "To do",
    items: [],
  },
  [uuid()]: {
    index: 3,
    name: "In Progress",
    items: [],
  },
  [uuid()]: {
    index: 4,
    name: "Done",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  const sourceColumn = columns[source.droppableId];
  const destColumn = columns[destination.droppableId];
  const colDiff = Math.abs(sourceColumn.index - destColumn.index);

  if (colDiff > 1) return;

  if (source.droppableId !== destination.droppableId) {
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function KanbanBoard() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div className="kanban_layout">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className="kanban_column" key={columnId}>
              <h3>{column.name}</h3>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="kanban_item_container"
                      style={{
                        background: snapshot.isDraggingOver
                          ? "lightblue"
                          : "lightgrey",
                      }}
                    >
                      {column.items.map((item, index) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="kanban_task_item"
                                  style={{
                                    userSelect: "none",
                                    backgroundColor: snapshot.isDragging
                                      ? "#263B4A"
                                      : "#456C86",
                                    color: "white",
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  {item.content}
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

const KanbanBoard1 = () => {
  return (
    <div className="kanban_layout">
      <div className="kanban_column">
        <h3>BackLog</h3>
        <div className="kanban_item_container">
          <div className="kanban_task_item">Task 1</div>
          <div className="kanban_task_item">Task 2</div>
          <div className="kanban_task_item">Task 3</div>
        </div>
      </div>
      <div className="kanban_column">
        <h3>In Progress</h3>
        <div className="kanban_item_container">
          <div className="kanban_task_item">Task 1</div>
        </div>
      </div>
      <div className="kanban_column">
        <h3>Done</h3>
        <div className="kanban_item_container"></div>
      </div>
    </div>
  );
};

export default KanbanBoard;
