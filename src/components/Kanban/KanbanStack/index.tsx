import React, { useState } from "react";
import { HStack } from "@chakra-ui/react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import KanbanCard from "../KanbanCard";

import { initialData } from "../../../data/initial-data";

const KanbanStack: React.FC = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result: DropResult): void => {
    //
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
        {data.columnOrder.map((columnId: string) => {
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
            />
          );
        })}
      </HStack>
    </DragDropContext>
  );
};

export default KanbanStack;
