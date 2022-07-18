import React, { useEffect } from 'react'
import {Box, Heading, Flex, Text, Button, useColorModeValue} from '@chakra-ui/react'
import { useCrud } from '../context/CrudProvider'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import {useRouter} from 'next/router'
import {motion} from 'framer-motion'

const Home = () => {
  const {tareas, eliminarTarea, editarTarea} = useCrud()
  const router = useRouter()

  return (
    <Box maxW='600px' margin='0 auto' py={10}>
      <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.2, duration: 0.5}}>
      <Heading textAlign='center' color={useColorModeValue("white", "green.400")}>
        {tareas.length === 0 ? 'No hay tareas aún' : 'Tareas'}
      </Heading>
      </motion.div>
     {tareas.map((tarea, i) => (
      <motion.div key={i} initial={{x: -1500}} animate={{x: 0}} transition={{delay: 0.2, duration: 0.3, type:'spring', stiffness: 120}}>
        <motion.div whileHover={{scale: 1.1}}>
      <Flex color='white' bg='gray.600' flexDirection='column' my={4} >
        <Flex justifyContent='space-between' alignItems='center' p={4}>
          <Flex gap={2} alignItems='center'>
          <Heading>
            {i + 1}
          </Heading>
          <Flex flexDirection='column'>
            <Heading fontSize='2xl'>
              {tarea.nombre}
            </Heading>
            <Text>
              {tarea.descripcion}
            </Text>
          </Flex>
          </Flex>
          <Flex flexDirection='column' gap={2}>
          <Button leftIcon={<AiFillDelete />} bg='red.500' color='white' _hover={{bg: 'red.400'}} fontSize='s' onClick={() => eliminarTarea(tarea.id)}>
            Eliminar
          </Button>
          <Button leftIcon={<AiFillEdit />} bg='yellow.500' color='white' _hover={{bg: 'yellow.400'}} fontSize='s' onClick={() => {editarTarea(tarea.id, tarea); router.push(`/edit/${tarea.id}`)}}>
            Editar
          </Button>
          </Flex>
        </Flex>
        </Flex>
        </motion.div>
        </motion.div>
        ))}
      
    </Box>
  )
}

export default Home