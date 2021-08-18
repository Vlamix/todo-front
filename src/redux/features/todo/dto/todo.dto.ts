export interface AddDto {
   title: string
   token: string
}

export interface RemoveDto {
   id: number
   index: number
}

export interface ToggleDto {
   index: number
   body: { isCompleted: boolean }
   id: number
}

export interface ChangeDto {
   index: number
   body: { title: string }
}
