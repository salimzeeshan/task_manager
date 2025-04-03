import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import useLocalStorage from "../custom-hooks/useLocalStorage";

const CompletedTasks = ({ taskList, handleOnOpenEdit }) => {
  const { deleteTask } = useLocalStorage();
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    taskList.map((task) => {
      if (task.status === "Completed") {
        setIsEmpty(false);
      }
    });
  }, [taskList]);

  if (isEmpty) {
    return (
      <Box
        height={"70px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        className="task-list-container"
      >
        <Text>No Pending Tasks</Text>
      </Box>
    );
  }

  return (
    <Box className="task-list-container" mb={20}>
      <TableContainer>
        <Table variant="simple">
          <Thead className="table-header">
            <Tr>
              <Th>Name</Th>
              <Th>Status</Th>
              <Th>Due Date</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {taskList.map((task, index) => {
              if (task.status !== "Completed") return;
              return (
                <Tr key={index}>
                  <Td>{task.name}</Td>
                  <Td>{task.status}</Td>
                  <Td>{task.dueDate}</Td>
                  <Td>
                    <Button
                      colorScheme="blue"
                      onClick={() => {
                        handleOnOpenEdit(index, task);
                      }}
                    >
                      <MdEdit />
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        deleteTask(index);
                      }}
                    >
                      <MdDelete />
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CompletedTasks;
