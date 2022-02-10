import React, { useState, useEffect } from "react";
import { Paper, CircularProgress, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateTask } from "../actions/taskAction";
import "./kanbanBoard.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

const columnsFromBackend = {
  [uuid()]: {
    index: 1,
    name: "Open",
    items: [],
  },
  [uuid()]: {
    index: 2,
    name: "Inprogress",
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

const onDragEnd = (result, columns, setColumns, dispatch) => {
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
    const updatedStatus = { ...removed, status: destColumn.name };
    dispatch(updateTask(updatedStatus));
    console.log(`updated Task : ${JSON.stringify(updatedStatus)}`);
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

const cardStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  m: 1,
};

function KanbanBoard() {
  const [columns, setColumns] = useState(columnsFromBackend);
  const taskState = useSelector((state) => state.tasks);
  const { loading, error, tasks } = taskState;
  const dispatch = useDispatch();

  useEffect(() => {
    if (tasks) {
      for (let colId in columnsFromBackend) {
        const colInfo = columnsFromBackend[colId];
        const task_category = tasks.filter(
          (task) => task.status === colInfo.name
        );
        colInfo.items = [...task_category];
      }
      setColumns({ ...columnsFromBackend });
    }
  }, [tasks]);

  return (
    <>
      {loading ? (
        <Paper sx={cardStyle}>
          <CircularProgress />
        </Paper>
      ) : error ? (
        <Paper sx={cardStyle}>
          <Typography>{error}</Typography>
        </Paper>
      ) : tasks.length === 0 ? (
        <Paper sx={cardStyle}>
          <Typography variant="h6">No Items Found</Typography>
        </Paper>
      ) : (
        <div className="kanban_layout">
          <DragDropContext
            onDragEnd={(result) =>
              onDragEnd(result, columns, setColumns, dispatch)
            }
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
                                key={item._id}
                                draggableId={item._id}
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
                                      {item.title}
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
      )}
    </>
  );
}

export default KanbanBoard;
