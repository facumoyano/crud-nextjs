import React from "react";
import {
    Box,
} from "@chakra-ui/react";
import { useCrud } from "../context/CrudProvider";

import Loader from "../components/Loader";
import Tareas from "../components/Tareas";


const Home = () => {
    const {  isLoading } = useCrud();  

    return (
        <Box maxW="600px" margin="0 auto" py={10}>
            {
                isLoading ? <Loader /> : <Tareas />
            }
        </Box>
    );
};

export default Home;
