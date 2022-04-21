import React from "react";
import { HStack } from "@chakra-ui/react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { nanoid } from "nanoid";

import KanbanCard from "../KanbanCard";

import { initialData } from "../../../data/initial-data";
import useLocalStorage from "../../../hooks/useLocalStorage";

const KanbanStack: React.FC = () => {
  const [data, setData] = useLocalStorage("data", initialData);

  React.useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const onDragEnd = (result: DropResult): void => {
    const { source, destination, draggableId } = result;

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

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newData);
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

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [sourceColumn.id]: newSourceTaskIds,
          [destinationColumn.id]: newDestinationTaskIds,
        },
      };

      setData(newData);
    }

    return;
  };

  const handleNewTask = (event: any) => {
    event.preventDefault();

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

    setData(newData);
    event.target["content"].value = "";

    return;
  };

  const handleDeleteTask = (taskId: string, idColumn: string) => {
    const index: number = data.columns[idColumn].taskIds.indexOf(
      taskId as never
    );

    // TODO: Delete task
    return alert("This feature is not implemented yet");
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <HStack
        mt="40px"
        p={4}
        spacing={8}
        top={0}
        right={0}
        bottom={0}
        left={0}
        userSelect="none"
        whiteSpace={"nowrap"}
        overflowX="auto"
        overflowY="hidden"
        position="absolute"
        alignItems={"flex-start"}
      >
        {data.columnOrder.map((columnId: string): React.ReactNode => {
          const column = data.columns[columnId];
          const tasks = (column.taskIds as string[]).map(
            (taskId: string) => data.tasks[taskId]
          );

          return (
            <KanbanCard
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={tasks}
              handleNewTask={(event: any) => handleNewTask(event)}
              handleDeleteTask={(taskId: string, idColumn: string) =>
                handleDeleteTask(taskId, idColumn)
              }
            />
          );
        })}
      </HStack>
    </DragDropContext>
  );
};

export default KanbanStack;
