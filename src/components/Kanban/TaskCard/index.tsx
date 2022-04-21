import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

type TaskCardProps = {
  content: string;
};

const TaskCard: React.FC<TaskCardProps> = ({ content }) => {
  return (
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
          {content}
        </Text>

        <span style={{ color: "black" }}>=</span>
      </Flex>
    </Box>
  );
};

export default TaskCard;
