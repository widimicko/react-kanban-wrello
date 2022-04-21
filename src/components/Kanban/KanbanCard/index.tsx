import React from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { Droppable } from "react-beautiful-dnd";

import { Task } from "../../../data/initial-data";
import TaskCard from "../TaskCard";

type KanbanCardProps = {
  id: string;
  title: string;
  tasks: Task[];
};

const KanbanCard: React.FC<KanbanCardProps> = ({ id, title, tasks = [] }) => {
  return (
    <Box width="270px" p={2} bg="blue.200" rounded={4}>
      <Flex direction="column">
        <Box mb={2}>
          <Text fontSize={"lg"} fontWeight={500} color="gray.900" isTruncated>
            {title}
          </Text>
        </Box>

        <Droppable droppableId={id}>
          {(provided, snapshot) => (
            <VStack
              flex={1}
              rounded={2}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <TaskCard
                    key={index}
                    index={index}
                    id={task.id}
                    content={task.content}
                  />
                ))
              ) : (
                // Empty Task
                <Box width="100%" bg="white" p={1} rounded={2}>
                  <Flex alignItems={"center"}>
                    <Text
                      mr={4}
                      flex={1}
                      fontSize="sm"
                      wordBreak={"break-all"}
                      whiteSpace="normal"
                      color={"gray.900"}
                    >
                      Click to add new task
                    </Text>

                    <span style={{ color: "black" }}>+</span>
                  </Flex>
                </Box>
              )}
              {provided.placeholder}
            </VStack>
          )}
        </Droppable>
      </Flex>
    </Box>
  );
};

export default KanbanCard;
