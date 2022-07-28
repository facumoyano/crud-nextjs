import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import React, { useContext, createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { auth, db } from "../firebase";

const CrudContext = createContext();

const CrudProvider = ({ children }) => {
    const [tareas, setTareas] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [tarea, setTarea] = useState({
        nombre: "",
        descripcion: "",
        estado: "",
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            setIsLoading(false)
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        if(currentUser && currentUser.email) {
            
            
            const getData = async () => {
                const colRef = collection(db, "tareas");
                const result = await getDocs(
                    query(colRef, where("email", "==", currentUser.email))
                );
                setTareas(getArrayFromCollection(result));
               
            };
            getData();
           
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    function signup(email, password) {
        createUserWithEmailAndPassword(auth, email, password);
        return;
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }

    const getArrayFromCollection = (collection) => {
        return collection.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
        });
    };

    const crearTarea = async (nombre, descripcion, estado) => {
        setTareas([...tareas, { id: uuidv4(), nombre, descripcion, estado }]);
        await addDoc(collection(db, "tareas"), {
            nombre: nombre,
            descripcion: descripcion,
            estado: estado,
            email: currentUser.email,
            timestamp: serverTimestamp(),
        });
    };

    const eliminarTarea = async (id) => {
        setTareas(tareas.filter((tarea) => tarea.id !== id));
        const colRef = collection(db, 'tareas');
        await deleteDoc(doc(colRef, id));
    };

    const editarTarea = async (id, tareaActualizada) => {
        setTareas([
            ...tareas.map((tarea) =>
                tarea.id === id ? { ...tarea, ...tareaActualizada } : tarea
            ),
        ]);
        const colRef = collection(db, 'tareas');
        await updateDoc(doc(colRef, id), tarea)
    };

    return (
        <CrudContext.Provider
            value={{
                tareas,
                setTareas,
                crearTarea,
                eliminarTarea,
                editarTarea,
                signup,
                login,
                logout,
                currentUser,
                tarea,
                setTarea,
                isLoading,
                setIsLoading
            }}
        >
            {children}
        </CrudContext.Provider>
    );
};

export default CrudProvider;

export const useCrud = () => {
    return useContext(CrudContext);
};
