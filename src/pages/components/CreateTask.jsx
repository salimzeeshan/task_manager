import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useLocalStorage from "../custom-hooks/useLocalStorage";

const CreateTask = ({ isOpen, onClose }) => {
  const { tasks, addTask, fetchTasks } = useLocalStorage("tasks", []);
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [errorText, setErrorText] = useState(null);

  const handleAddTask = () => {
    if (taskName.trim() === "" || dueDate.trim() === "") return;
    const newTask = { name: taskName, dueDate, status };
    addTask(newTask);
    setTaskName("");
    setDueDate("");
    setStatus("Pending");
    onClose();
  };

  useEffect(() => {
    if (taskName === "" && dueDate === "") {
      setErrorText("All fields are required");
    } else if (taskName === "") {
      setErrorText("Task name is required");
    } else if (dueDate === "") {
      setErrorText("Due date is required");
    } else {
      setErrorText(null);
    }
  }, [taskName, dueDate]);

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="modal-content" borderRadius={"15px"} overflow={"hidden"}>
        <ModalHeader className="modal-header">Create a task</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="modal-body" pb={6}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Due date</FormLabel>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4} mb={4}>
            <FormLabel>Status</FormLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </Select>
          </FormControl>
          <Box height={"10px"}>
            <Text color={"red.400"}>{errorText}</Text>
          </Box>
        </ModalBody>

        <ModalFooter className="modal-footer">
          <Button
            isDisabled={errorText}
            colorScheme="blue"
            mr={3}
            onClick={handleAddTask}
          >
            Add Task
          </Button>
          <Button colorScheme="red" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateTask;
