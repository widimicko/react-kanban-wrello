import React from "react";
import { Box, HStack } from "@chakra-ui/react";

const KanbanStack: React.FC = () => {
  return (
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
      <Box width="270px" p={2} bg="blue.400" rounded={4}>
        Hello Kanban
      </Box>
      <Box width="270px" p={2} bg="blue.400" rounded={4}>
        Hello Kanban
      </Box>
      <Box width="270px" p={2} bg="blue.400" rounded={4}>
        Hello Kanban
      </Box>
      <Box width="270px" p={2} bg="blue.400" rounded={4}>
        Hello Kanban
      </Box>
      <Box width="270px" p={2} bg="blue.400" rounded={4}>
        Hello Kanban
      </Box>
    </HStack>
  );
};

export default KanbanStack;
