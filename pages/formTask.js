import React, { useState, useEffect } from "react";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Heading,
    useColorModeValue,
    Select
} from "@chakra-ui/react";
import { useCrud } from "../context/CrudProvider";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const FormTask = () => {
    const [tarea, setTarea] = useState({
        nombre: "",
        descripcion: "",
        estado: ''
    });

    

    const router = useRouter();

    const { crearTarea, editarTarea, tareas } = useCrud();

    const handleChange = (e) => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nombre.length >= 1) {
            if (!router.query.id) {
                crearTarea(nombre, descripcion, estado);
            } else {
                editarTarea(router.query.id, tarea);
            }
            router.push("/");
        }
    };

    useEffect(() => {
        if (router.query.id) {
            const tareaEncontrada = tareas.find(
                (tarea) => tarea.id === router.query.id
            );
            if (tareaEncontrada) {
                setTarea({
                    nombre: tareaEncontrada.nombre,
                    descripcion: tareaEncontrada.descripcion,
                    estado: tareaEncontrada.estado
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.query.id]);

    const { nombre, descripcion, estado } = tarea;

    return (
        <>
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.5, duration: 0.5}}>
          <Heading textAlign='center' color={useColorModeValue("white", "green.400")} mt={6}>
            {router.query.id ? 'Editar' : 'Crear nueva tarea'}
          </Heading>
        </motion.div>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{margin: 20}}
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
                            <FormLabel>Nombre: </FormLabel>
                            <Input
                                type="text"
                                bg={useColorModeValue("gray.700", "gray.200")}
                                border="none"
                                name="nombre"
                                onChange={(e) => handleChange(e)}
                                value={nombre}
                            />
                        </FormControl>
                        <FormControl color="white">
                            <FormLabel>Descripción: </FormLabel>
                            <Textarea
                                type="text"
                                bg={useColorModeValue("gray.700", "gray.200")}
                                border="none"
                                rows="8"
                                name="descripcion"
                                onChange={(e) => handleChange(e)}
                                value={descripcion}
                            />
                        </FormControl>
                        <FormControl color="white">
                            <FormLabel>Estado: </FormLabel>
                            <Select
                                
                                bg={useColorModeValue("gray.700", "gray.200")}
                                border="none"
                                name="estado"
                                onChange={(e) => handleChange(e)}
                                value={estado}
                            >
                                <option style={{backgroundColor: 'white', color:'black'}} value=''>--Selecciona una opción--</option>
                                <option style={{backgroundColor: 'white', color:'black'}} value='finalizada'>Finalizada</option>
                                <option style={{backgroundColor: 'white', color:'black'}} value='porhacer'>Por hacer</option>
                            </Select>
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
                            {router.query.id ? "Editar" : "Crear"}
                        </Button>
                    </Box>
                </Box>
            </motion.div>
        </>
    );
};

export default FormTask;
