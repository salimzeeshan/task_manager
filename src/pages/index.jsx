import {
  Box,
  Button,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { IoAddCircle } from "react-icons/io5";
import CreateTask from "./components/CreateTask";
import { useEffect, useState } from "react";
import useLocalStorage from "./custom-hooks/useLocalStorage";
import { MdDelete, MdEdit } from "react-icons/md";
import UpdateTask from "./components/UpdateTask";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import PendingTasks from "./components/PendingTasks";
import CompletedTasks from "./components/CompletedTasks";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const { tasks, deleteTask } = useLocalStorage();
  const [taskList, setTaskList] = useState([]);
  const [filterTask, setFilterTask] = useState("All");

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  function handleOnOpenEdit(index, object) {
    localStorage.setItem(
      "currentEdit",
      JSON.stringify({ ...object, index: index })
    );
    onOpenEdit();
  }

  return (
    <Box>
      <CreateTask isOpen={isOpen} onClose={onClose} />
      <UpdateTask isOpen={isOpenEdit} onClose={onCloseEdit} />

      <Box className="header">
        {filterTask === "All" || filterTask === "Pending" ? (
          <Text>Pending Tasks</Text>
        ) : (
          <Text>Completed Tasks</Text>
        )}
        <Box>
          <Select
            className="custom-button"
            value={filterTask}
            onChange={(e) => setFilterTask(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </Select>
          <Button onClick={onOpen} className="custom-button green-button">
            <IoAddCircle />
            Add Task
          </Button>
        </Box>
      </Box>

      {filterTask === "All" || filterTask === "Pending" ? (
        <PendingTasks handleOnOpenEdit={handleOnOpenEdit} taskList={taskList} />
      ) : null}

      {filterTask === "All" ? (
        <Box className="header" mt={"50px"}>
          <Text>Completed Tasks</Text>
        </Box>
      ) : null}

      {filterTask === "All" || filterTask === "Completed" ? (
        <CompletedTasks
          handleOnOpenEdit={handleOnOpenEdit}
          taskList={taskList}
        />
      ) : null}
    </Box>
  );
}
