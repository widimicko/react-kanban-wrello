import React, { useState, useReducer } from "react";
import { HStack, Box, Input, Flex, Text } from "@chakra-ui/react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import * as taskService from "../../../services/taskService";
import * as cardService from "../../../services/cardService";

import KanbanCard from "../KanbanCard";

import { initialData } from "../../../data/initial-data";
// import useLocalStorage from "../../../hooks/useLocalStorage";

const KanbanStack: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  // const [data, setData] = useLocalStorage("data", initialData);
  console.log("Re-render");

  // React.useEffect(() => {
  //   localStorage.setItem("data", JSON.stringify(data));
  // }, [data]);

  const onTaskDragEnd = (result: DropResult): void => {
    const newData = taskService.onDragEnd(result, data);
    setData(newData);
  };

  const handleNewTask = (event: any) => {
    event.preventDefault();
    const newData = taskService.create(event, data);
    setData(newData);
    event.target["content"].value = "";
  };

  const handleDeleteTask = (taskId: string, idColumn: string) => {
    const newData = taskService.destroy(taskId, idColumn, data);
    setData(newData);
    forceUpdate();
  };

  const handleNewCard = (event: any) => {
    event.preventDefault();
    const newData = cardService.create(event, data);
    setData(newData);
    event.target["title"].value = "";
  };

  const handleDeleteCard = (id: string) => {
    const newData = cardService.destroy(id, data);
    setData(newData);
    forceUpdate();
  };

  return (
    <DragDropContext onDragEnd={onTaskDragEnd}>
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
              handleDeleteCard={(id: string) => handleDeleteCard(id)}
            />
          );
        })}
        <Box width="270px" p={2} bg="blue.200" rounded={4}>
          <Flex direction="column">
            <Box mb={2}>
              <Text
                fontSize={"lg"}
                fontWeight={500}
                color="gray.900"
                isTruncated
              >
                Create New Card
              </Text>
              <form onSubmit={handleNewCard} style={{ marginTop: "15px" }}>
                <Input
                  name="title"
                  id="title"
                  size={"sm"}
                  backgroundColor={"white"}
                  color="black"
                  placeholder="Create New Card"
                  _placeholder={{ color: "gray.500" }}
                />
              </form>
            </Box>
          </Flex>
        </Box>
      </HStack>
    </DragDropContext>
  );
};

export default KanbanStack;
