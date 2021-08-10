import React from 'react'
import { Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import './class.css'
import { Todo } from '../redux/todos.type'
import { removeTodo, toggleComplete } from '../redux/features/todo/todoSlice'

interface ModalInterface {
   setOpen: () => void
   todo: Todo
   setIndex: (id: string) => void
}

const TodoItem: React.FC<ModalInterface> = (props) => {
   const dispatch = useDispatch()
   const classes = []
   if (props.todo.completed) {
      classes.push('done')
   }
   const handleToggle = () => {
      dispatch(toggleComplete(props.todo))
   }
   const removeThis = () => {
      dispatch(removeTodo(props.todo.id))
   }

   return (
      <li>
         <div className={'TodoItem'}>
            <input
               type="checkbox"
               onChange={() => {
                  handleToggle()
               }}
               checked={props.todo.completed}
            />
            <span className={classes.join(' ')}>{props.todo.title}</span>
            <Button
               onClick={() => {
                  props.setOpen()
                  props.setIndex(props.todo.id)
               }}
            >
               Change
            </Button>
            <Button onClick={removeThis}>Remove</Button>
         </div>
      </li>
   )
}

export default TodoItem
