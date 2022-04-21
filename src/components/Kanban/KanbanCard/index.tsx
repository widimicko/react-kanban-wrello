import React from "react";
import { Box, Flex, Text, VStack, Input } from "@chakra-ui/react";
import { Droppable } from "react-beautiful-dnd";
import { RiDragDropLine } from "react-icons/ri";

import { Task } from "../../../data/initial-data";
import TaskCard from "../TaskCard";

type KanbanCardProps = {
  id: string;
  title: string;
  tasks: Task[];
  handleNewTask: any;
  handleDeleteTask: any;
};

const KanbanCard: React.FC<KanbanCardProps> = ({
  id,
  title,
  tasks = [],
  handleNewTask,
  handleDeleteTask,
}) => {
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
              justifyContent={tasks.length > 0 ? "none" : "center"}
              alignItems={tasks.length > 0 ? "none" : "center"}
              rounded={2}
              minHeight={tasks.length > 0 ? "none" : "60px"}
              border={
                snapshot.isDraggingOver || tasks.length > 0
                  ? "none"
                  : "1.5px dashed gray"
              }
              backgroundColor={
                snapshot.isDraggingOver ? "blue.400" : "blue.200"
              }
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <TaskCard
                    key={index}
                    index={index}
                    idColumn={id}
                    id={task.id}
                    content={task.content}
                    handleDeleteTask={handleDeleteTask}
                  />
                ))
              ) : (
                // Empty Task
                <>
                  <Box as={RiDragDropLine} />
                  <Text>Drop task here</Text>
                </>
              )}

              {provided.placeholder}
            </VStack>
          )}
        </Droppable>
        <form onSubmit={handleNewTask} style={{ marginTop: "15px" }}>
          <Input
            name="content"
            id="content"
            size={"sm"}
            backgroundColor={"white"}
            color="black"
            placeholder="Type here to create new task"
            _placeholder={{ color: "gray.500" }}
          />
          <input name="columnId" id="columnId" type="hidden" value={id} />
        </form>
      </Flex>
    </Box>
  );
};

export default KanbanCard;
