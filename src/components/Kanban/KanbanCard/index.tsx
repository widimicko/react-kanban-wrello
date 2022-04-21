import React from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";

import TaskCard from "../TaskCard";

type KanbanCardProps = {
  id: string;
  title: string;
  tasks: Array<string>;
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

        <VStack flex={1} rounded={2}>
          <TaskCard content="Ini task 1" />
          <TaskCard content="Ini task 2" />
          <TaskCard content="Ini task 3" />
          <TaskCard content="Ini task 4" />
        </VStack>
      </Flex>
    </Box>
  );
};

export default KanbanCard;
