import { Spinner, Stack } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
    return (
        <Stack justifyContent="center" textAlign="center" alignItems="center">
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="green.400"
                size="xl"
            />
        </Stack>
    );
};

export default Loader;
