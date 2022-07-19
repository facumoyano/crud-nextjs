import React, { useContext, createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const CrudContext = createContext()

const CrudProvider = ({children}) => {
    const [tareas, setTareas] = useState([])

   const crearTarea = (nombre, descripcion, estado) => {
    setTareas([...tareas, {id: uuidv4(), nombre, descripcion, estado}])
    
   }

   const eliminarTarea = (id) => {
        setTareas(tareas.filter(tarea => tarea.id !== id))
   }

   const editarTarea = (id, tareaActualizada) => {
        setTareas([
            ...tareas.map(tarea => tarea.id === id ? {...tarea, ...tareaActualizada} : tarea)
        ])
   }

    return (
        <CrudContext.Provider value={{
            tareas,
            setTareas,
            crearTarea,
            eliminarTarea,
            editarTarea
        }}>
            {children}
        </CrudContext.Provider>
    )
}

export default CrudProvider

export const useCrud = () => {
    return useContext(CrudContext)
}