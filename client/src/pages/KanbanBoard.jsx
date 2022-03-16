import React, { useState, useEffect } from "react";
import { Paper, CircularProgress, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateTask } from "../actions/taskAction";
import TaskInfo from "../components/Tasks/Task/TaskInfo";
import "./kanbanBoard.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import moment from "moment";

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
    name: "In Review",
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
    // console.log(`updated Task : ${JSON.stringify(updatedStatus)}`);
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
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
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
          <TaskInfo open={open} setOpen={setOpen} taskInfo={selectedTask} />
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
                          className="kanban_item_wrapper"
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
                                      className="kanban_task_item_container"
                                      style={{
                                        userSelect: "none",
                                        border: snapshot.isDragging
                                          ? "1px solid #0d415f"
                                          : "none",
                                        ...provided.draggableProps.style,
                                      }}
                                      onClick={() => {
                                        setSelectedTask(item);
                                        console.log("item clicked");
                                      }}
                                    >
                                      <span className="taskTitle">
                                        {item.title}
                                      </span>
                                      {getChip(item.priority)}
                                      <div className="footerWrapper">
                                        <span className="creatorText">
                                          {item.creator}
                                        </span>
                                        <span className="creatorAt">
                                          {moment(item.createdAt).fromNow()}
                                        </span>
                                      </div>
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

function getChip(text) {
  let color = "#555";
  if (text === "Medium") {
    color = "#d1841f";
  } else if (text === "Critical" || text === "High") {
    color = "#db3e3e";
  } else if (text === "Low") {
    color = "#117fb3";
  }
  return (
    <div className="chipStyle" style={{ backgroundColor: color }}>
      {text}
    </div>
  );
}

export default KanbanBoard;
