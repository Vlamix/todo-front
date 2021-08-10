import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useDispatch } from 'react-redux'
import { changeTodo } from '../redux/features/todo/todoSlice'

interface ModalProps {
   open: boolean
   handleClose: () => void
   index: string
}

export const Modal: React.FC<ModalProps> = (props) => {
   const dispatch = useDispatch()
   const [changeText, setChangeText] = useState<string>('')

   const Edit = () => {
      console.log(props.index)
      const index = props.index
      dispatch(changeTodo({ index, changeText }))
      setChangeText('')
   }

   return (
      <div>
         <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
         >
            <DialogTitle id="form-dialog-title">Change yours Todo</DialogTitle>
            <DialogContent>
               <TextField
                  value={changeText}
                  onChange={(event) => setChangeText(event.target.value)}
                  autoFocus
                  margin="dense"
                  id="name"
                  type="email"
                  fullWidth
               />
            </DialogContent>
            <DialogActions>
               <Button onClick={props.handleClose} color="primary">
                  Cancel
               </Button>
               <Button
                  onClick={() => {
                     props.handleClose()
                     Edit()
                  }}
                  color="primary"
               >
                  Change
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   )
}
