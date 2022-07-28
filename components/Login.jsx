import React, { useState, useEffect } from "react";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    useToast,
    Button,
    Heading,
    useColorModeValue,
    Text,
    Toast,
} from "@chakra-ui/react";
import { useCrud } from "../context/CrudProvider";
import { motion } from "framer-motion";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
    const [usuario, setUsuario] = useState({
        email: "",
        password: "",
    });
    const [isLoggingIn, setIsLoggingIn] = useState(true);

    const { login, signup, setTarea } = useCrud();

    const toast = useToast();

    const handleChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    };

    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((res) => {
                toast({
                    title: "Ingreso exitoso",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });
            })
            .catch((err) => {
                toast({
                    title: err.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast({
                title: "Los campos son obligatorios",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
        if (isLoggingIn) {
            try {
                await login(email, password);
            } catch (err) {
                toast({
                    title: "Email o contraseña incorrectos",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }
            return;
        }
        await signup(email, password);
    };

    const { email, password } = usuario;

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <Heading
                    textAlign="center"
                    color={useColorModeValue("white", "green.400")}
                    mt={6}
                >
                    {isLoggingIn ? "Ingresar" : "Registrarse"}
                </Heading>
            </motion.div>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{ margin: 20 }}
            >
                <Box
                    bg="gray.600"
                    maxW="600px"
                    margin="0 auto"
                    borderRadius="5px"
                >
                    <Box
                        as="form"
                        mt={10}
                        p={5}
                        display="flex"
                        flexDirection="column"
                        gap={6}
                    >
                        <FormControl color="white">
                            <FormLabel>Email: </FormLabel>
                            <Input
                                type="email"
                                bg={useColorModeValue("gray.700", "gray.200")}
                                border="none"
                                name="email"
                                onChange={(e) => handleChange(e)}
                                value={email}
                            />
                        </FormControl>
                        <FormControl color="white">
                            <FormLabel>Password: </FormLabel>
                            <Input
                                type="password"
                                bg={useColorModeValue("gray.700", "gray.200")}
                                border="none"
                                name="password"
                                onChange={(e) => handleChange(e)}
                                value={password}
                            />
                        </FormControl>
                        <Button
                            bg="green.400"
                            color="white"
                            _hover={{ bg: "green.300" }}
                            textTransform="uppercase"
                            fontWeight="600"
                            type="submit"
                            onClick={(e) => handleSubmit(e)}
                        >
                            {isLoggingIn ? "Ingresar" : "Registrarse"}
                        </Button>
                        <Text textAlign="center" color="white">
                            O
                        </Text>
                        <GoogleButton
                            style={{ width: "100%", outline: "none" }}
                            label="Ingresar con google"
                            onClick={signInWithGoogle}
                        />
                        <Text
                            color="white"
                            cursor="pointer"
                            onClick={() => setIsLoggingIn(!isLoggingIn)}
                        >
                            {isLoggingIn ? "Registrar" : "Iniciar sesión"}
                        </Text>
                    </Box>
                </Box>
            </motion.div>
        </>
    );
};

export default Login;
