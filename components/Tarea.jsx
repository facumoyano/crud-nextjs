import React from "react";
import {
    Box,
    Heading,
    Flex,
    Text,
    Button,
    useColorModeValue,
} from "@chakra-ui/react";
import { useCrud } from "../context/CrudProvider";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Login from "../components/Login";

const Tarea = ({ tarea, i }) => {
    const { eliminarTarea, editarTarea, isLoading, currentUser } = useCrud();
    const router = useRouter();

    return (
        <>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    delay: 0.2,
                    duration: 0.3,
                    type: "spring",
                    stiffness: 120,
                }}
            >
                <motion.div whileHover={{ scale: 1.1 }}>
                    <Flex
                        color="white"
                        bg="gray.600"
                        flexDirection="column"
                        m={4}
                    >
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                            p={4}
                        >
                            <Flex gap={2} alignItems="center">
                                <Heading>{i + 1}</Heading>
                                <Flex flexDirection="column">
                                    <Heading fontSize="2xl">
                                        {tarea.nombre}
                                    </Heading>
                                    <Text>{tarea.descripcion}</Text>
                                </Flex>
                            </Flex>
                            <Flex flexDirection="column" gap={2}>
                                <Button
                                    leftIcon={<AiFillDelete />}
                                    bg="red.500"
                                    color="white"
                                    _hover={{ bg: "red.400" }}
                                    fontSize="s"
                                    onClick={() => eliminarTarea(tarea.id)}
                                >
                                    Eliminar
                                </Button>
                                <Button
                                    leftIcon={<AiFillEdit />}
                                    bg="yellow.500"
                                    color="white"
                                    _hover={{ bg: "yellow.400" }}
                                    fontSize="s"
                                    onClick={() => {
                                        editarTarea(tarea.id, tarea);
                                        router.push(`/edit/${tarea.id}`);
                                    }}
                                >
                                    Editar
                                </Button>
                                <Box
                                    display="flex"
                                    flexDirection="row"
                                    alignItems="center"
                                    gap={2}
                                    cursor="pointer"
                                    mt={2}
                                >
                                    <Box
                                        width="15px"
                                        height="15px"
                                        borderRadius="50%"
                                        backgroundColor={
                                            tarea.estado === "finalizada"
                                                ? "green.400"
                                                : "red.400"
                                        }
                                    ></Box>
                                    <Text>
                                        {tarea.estado === "finalizada"
                                            ? "Finalizada"
                                            : "Por hacer"}
                                    </Text>
                                </Box>
                            </Flex>
                        </Flex>
                    </Flex>
                </motion.div>
            </motion.div>
        </>
    );
};

export default Tarea;
