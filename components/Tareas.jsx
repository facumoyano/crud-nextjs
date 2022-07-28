import React from "react";
import { Heading, useColorModeValue } from "@chakra-ui/react";
import { useCrud } from "../context/CrudProvider";
import { motion } from "framer-motion";
import Login from "../components/Login";
import Tarea from "./Tarea";

const Tareas = () => {
    const { tareas, currentUser } = useCrud();
    const color = useColorModeValue("white", "green.400");
    return (
        <>
            {currentUser && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <Heading textAlign="center" color={color}>
                            {tareas.length === 0 ? "No hay tareas" : "Tareas"}
                        </Heading>
                    </motion.div>

                    {tareas.map((tarea, i) => (
                        <Tarea tarea={tarea} key={i} i={i} />
                    ))}
                </>
            )}

            {!currentUser && <Login />}
        </>
    );
};

export default Tareas;
