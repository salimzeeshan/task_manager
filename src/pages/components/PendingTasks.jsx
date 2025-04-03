import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

const PendingTasks = ({ taskList, handleOnOpenEdit }) => {
  return (
    <Box className="task-list-container">
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
              if (task.status !== "Pending") return;
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

export default PendingTasks;
