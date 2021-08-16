import React, { useEffect, useState } from 'react'
import TodoItem from '../todoItem/TodoItem'
import { Button, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, getAll } from '../../redux/features/todo/todoSlice'
import { Todo } from '../../redux/todos.type'
import { Modal } from '../modal/Modal'
import { RootState } from '../../redux'
import classes from './styles.module.css'
import { logoutUser } from '../../redux/features/auth/auth.slice'

const TodoList = () => {
   const dispatch = useDispatch()
   const [value, setValue] = useState<string>('')
   const [open, setOpen] = useState<boolean>(false)
   const [index, setIndex] = useState<number | null>(null)

   useEffect(() => {
      dispatch(getAll())
   }, [dispatch])

   const todos = useSelector((state: RootState) => state.todos.todos)

   const token = useSelector((state: RootState) => state.auth.token)

   const handleClose = () => {
      setOpen(false)
   }
   const logoutHandler = () => {
      dispatch(logoutUser())
   }
   const addItem = () => {
      if (value.trim().length) {
         if (!token) {
            throw new Error('lol')
         }
         dispatch(addTodo({ title: value, token: token }))
      }
      setValue('')
   }
   return (
      <>
         <Button onClick={logoutHandler} color={'secondary'}>
            Exit
         </Button>
         <TextField
            className={classes.root}
            id="outlined-basic"
            label="Todo"
            variant="outlined"
            value={value}
            onChange={(event) => {
               setValue(event.target.value)
            }}
         />
         <Button onClick={addItem} color={'inherit'}>
            Save
         </Button>
         <div className={classes.TodoList}>
            <div>
               {todos.map((todo: Todo, index) => (
                  <TodoItem
                     todo={todo}
                     setOpen={() => setOpen(true)}
                     setIndex={setIndex}
                     key={`${todo.id}-todoListItem`}
                     index={index}
                  />
               ))}
            </div>
            <Modal open={open} handleClose={handleClose} index={index} />
         </div>
      </>
   )
}

export default TodoList
