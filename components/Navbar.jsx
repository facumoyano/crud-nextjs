import React from "react";
import {
    Box,
    Flex,
    Text,
    Button,
    Spacer,
    useColorMode,
    useColorModeValue,
    IconButton,
} from "@chakra-ui/react";
import { RiAddFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { useCrud } from "../context/CrudProvider";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
    const { tareas } = useCrud();
    const router = useRouter();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box as="nav" bg={useColorModeValue("gray.600", "gray.200")} p={4}>
            <Flex maxW="1200px" margin="0 auto" alignItems="flex-end">
                <Box display="flex" alignItems="center" gap={2}>
                    <Text
                        color={useColorModeValue("white", "green.400")}
                        fontWeight="600"
                        fontSize="2xl"
                        cursor="pointer"
                        onClick={() => router.push("/")}
                    >
                        CRUD
                    </Text>
                    <Text
                        color={useColorModeValue("white", "green.400")}
                        fontWeight="400"
                        fontSize="lg"
                        cursor="pointer"
                    >
                        {tareas.length} tareas
                    </Text>
                </Box>
                <Spacer />
                <Box display="flex" alignItems="center" gap={2}>
                    <IconButton
                        icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
                        isRound="true"
                        size="lg"
                        alignSelf="flex-end"
                        onClick={toggleColorMode}
                        color="green.400"
                        bg="transparent"
                        _hover={{ bg: "transparent" }}
                        _active={{ bg: "transparent" }}
                    />

                    <Button
                        leftIcon={<RiAddFill />}
                        bg="green.400"
                        color="white"
                        _hover={{ bg: "green.300" }}
                        onClick={() => router.push("/formTask")}
                    >
                        Crear tarea
                    </Button>
                </Box>
            </Flex>
        </Box>
    );
};

export default Navbar;
