import React from 'react'
import { Button, Checkbox, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import './styles.module..css'
import { Todo } from '../../redux/todos.type'
import {
   changeToggleTodo,
   removeTodo,
} from '../../redux/features/todo/todoSlice'

interface ModalInterface {
   setOpen: () => void
   todo: Todo
   setIndex: (id: number) => void
   index: number
   setValue: (value: string) => void
}

const TodoItem: React.FC<ModalInterface> = (props) => {
   const dispatch = useDispatch()
   const classes = []
   if (props.todo.isChecked) {
      classes.push('done')
   }
   const handleToggle = () => {
      dispatch(
         changeToggleTodo({
            index: props.index,
            body: { isChecked: !props.todo.isChecked },
            id: props.todo.id,
         })
      )
   }
   const removeThis = () => {
      dispatch(removeTodo({ id: props.todo.id, index: props.index }))
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
            onChange={handleToggle}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            checked={props.todo.isChecked}
         />
         <div className={classes.join(' ')}>{props.todo.title}</div>

         <Grid container xs={4} md={3} justifyContent={'space-between'}>
            <Button
               variant={'contained'}
               color={'primary'}
               onClick={() => {
                  props.setOpen()
                  props.setIndex(props.todo.id)
                  props.setValue(props.todo.title)
               }}
            >
               Change
            </Button>
            <Button
               variant={'contained'}
               color={'secondary'}
               onClick={removeThis}
            >
               Remove
            </Button>
         </Grid>
      </Grid>
   )
}

export default TodoItem
