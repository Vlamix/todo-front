import React from 'react'
import { Button, Checkbox, Grid } from '@material-ui/core'
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
      <Grid
         className={'TodoItem'}
         container
         justifyContent={'space-around'}
         alignItems={'center'}
         xs={12}
         md={8}
      >
         <Checkbox
            onChange={() => {
               console.log('some')
               handleToggle()
            }}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
         />
         <div className={classes.join(' ')}>{props.todo.title}</div>

         <Grid container xs={4} md={3} justifyContent={'space-between'}>
            <Button
               variant={'contained'}
               color={'primary'}
               onClick={() => {
                  props.setOpen()
                  props.setIndex(props.todo.id)
               }}
            >
               Change
            </Button>
            <Button
               variant={'contained'}
               color={'default'}
               onClick={removeThis}
            >
               Remove
            </Button>
         </Grid>
      </Grid>
   )
}

export default TodoItem
