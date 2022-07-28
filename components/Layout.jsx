import React from "react";
import Navbar from "./Navbar";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";

const Layout = ({ children }) => {
    return (
        <Box bg={useColorModeValue("gray.800", "white")} minHeight="100vh">
            <Head>
                <title>Tasks App</title>
                <meta name="description" content="Tu app de tareas." />
            </Head>
            <Navbar />
            <main>{children}</main>
        </Box>
    );
};

export default Layout;
