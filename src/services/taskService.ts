import { nanoid } from "nanoid";

const create = (event: any, data: any) => {
  const columnId = event.target["columnId"].value;
  const content = event.target["content"].value;

  if (!content) {
    return;
  }

  const newTaskId = nanoid();
  const newData = {
    ...data,
    tasks: {
      ...data.tasks,
      [newTaskId]: {
        id: newTaskId,
        content: content,
      },
    },
    columns: {
      ...data.columns,
      [columnId]: {
        ...data.columns[columnId],
        taskIds: [...data.columns[columnId].taskIds, newTaskId],
      },
    },
  };

  return newData;
};

const destroy = (taskId: string, idColumn: string, data: any) => {
  const index: number = data.columns[idColumn].taskIds.indexOf(taskId as never);

  const newData = data;

  delete newData.tasks[taskId];
  newData.columns[idColumn].taskIds.splice(index, 1);

  return newData;
};

const onDragEnd = (result: any, data: any) => {
  const { source, destination, draggableId } = result;
  let newData;

  if (!destination) return;

  if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  )
    return;

  const sourceColumn = data.columns[source.droppableId];
  const destinationColumn = data.columns[destination.droppableId];

  // drag on same kanban card
  if (sourceColumn.id === destinationColumn.id) {
    const newTaskIds = Array.from(sourceColumn.taskIds);

    // delete task from list
    newTaskIds.splice(source.index, 1);
    // move task to destination index
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...sourceColumn,
      taskIds: newTaskIds,
    };

    newData = {
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn,
      },
    };
  }

  // drag on different kanban card
  if (sourceColumn.id !== destinationColumn.id) {
    const sourceTaskIds = Array.from(sourceColumn.taskIds);
    sourceTaskIds.splice(source.index, 1);
    const newSourceTaskIds = {
      ...sourceColumn,
      taskIds: sourceTaskIds,
    };

    const destinationTaskIds = Array.from(destinationColumn.taskIds);
    destinationTaskIds.splice(destination.index, 0, draggableId);
    const newDestinationTaskIds = {
      ...destinationColumn,
      taskIds: destinationTaskIds,
    };

    newData = {
      ...data,
      columns: {
        ...data.columns,
        [sourceColumn.id]: newSourceTaskIds,
        [destinationColumn.id]: newDestinationTaskIds,
      },
    };
  }

  return newData;
};

export { create, destroy, onDragEnd };
