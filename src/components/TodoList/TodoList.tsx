import React, { useState } from 'react'
import TodoItem from '../TodoItem'
import { Button, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { addTodos } from '../../redux/features/todo/todoSlice'
import { selectTodos } from '../../redux/features/todo/todo.seletors'
import { Todo } from '../../redux/todos.type'
import { Modal } from '../Modal'
import { RootState } from '../../redux'
import classes from './styles.module.css'

const TodoList = () => {
   const todos: Todo[] = useSelector(selectTodos)
   const dispatch = useDispatch()
   const [text, setValue] = useState<string>('')
   const [open, setOpen] = useState<boolean>(false)
   const [index, setIndex] = useState<string>('')
   const token = useSelector((state: RootState) => state.auth.token)

   const handleClose = () => {
      setOpen(false)
   }
   const addItem = () => {
      if (text.trim().length) {
         if (!token) {
            throw new Error('lol')
         }
         dispatch(addTodos({ title: text, token: token }))
      }
      setValue('')
   }
   return (
      <>
         <TextField
            className={classes.root}
            id="outlined-basic"
            label="Todo"
            variant="outlined"
            value={text}
            onChange={(event) => {
               setValue(event.target.value)
            }}
         />
         <Button onClick={addItem}>Save</Button>
         <div className={'TodoList'}>
            <div>
               {todos.map((todo: Todo, index) => (
                  <TodoItem
                     todo={todo}
                     setOpen={() => setOpen(true)}
                     setIndex={setIndex}
                     key={`${todo.id}-todoListItem`}
                  />
               ))}
            </div>
            <Modal open={open} handleClose={handleClose} index={index} />
         </div>
      </>
   )
}

export default TodoList
