import { useEffect, useReducer } from "react"
import { todoReducer } from '../08-useReducer/todoReducer'

const init = ( ) =>{
    return JSON.parse(localStorage.getItem('todos') ) || [];
}

export const useTodos = (initialValue = 10) =>{
    const [ todos, dispatchTodo ] = useReducer(todoReducer, [], init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const handleNewTodo = (todo) =>{
        console.log({todo});
        const action ={
            type: '[TODO] Add Todo',
            payload: todo,
        }
        dispatchTodo( action );
    }

    const handleDeleteTodo = (id) =>{
        console.log(id);
        dispatchTodo({
            type: '[TODO] Remove Todo',
            payload: id,
        })
    }
    const onHandleToggleTodo = (id) =>{
        console.log(id);
        dispatchTodo({
            type: '[TODO] Toggle Todo',
            payload: id,
        })
    }



    return{
        todos,
        handleDeleteTodo,
        onHandleToggleTodo,
        handleNewTodo,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo=>!todo.done).length,
    };
}