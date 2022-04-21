import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";
import { GrDrag, GrTrash } from "react-icons/gr";

type TaskCardProps = {
  id: string;
  idColumn: string;
  index: number;
  content: string;
  handleDeleteTask: any;
};

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  idColumn,
  content,
  index,
  handleDeleteTask,
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <Box
          width="100%"
          bg="white"
          p={1}
          rounded={2}
          backgroundColor={snapshot.isDragging ? "blue.50" : "white"}
          boxShadow={
            snapshot.isDragging
              ? "6px 6px 0 rgba(10, 40, 76, .15)"
              : "0 1px 0 rgba(9, 30, 66, .25)"
          }
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <Flex alignItems={"center"}>
            <Text
              mr={4}
              flex={1}
              fontSize="sm"
              wordBreak={"break-all"}
              whiteSpace="normal"
              color={"gray.900"}
            >
              {content}
            </Text>

            <span style={{ color: "black" }}>
              <Box
                as={GrTrash}
                cursor="pointer"
                onClick={() => handleDeleteTask(id, idColumn)}
              />
            </span>
            <span style={{ color: "black" }} {...provided.dragHandleProps}>
              <Box as={GrDrag} />
            </span>
          </Flex>
        </Box>
      )}
    </Draggable>
  );
};

export default TaskCard;
