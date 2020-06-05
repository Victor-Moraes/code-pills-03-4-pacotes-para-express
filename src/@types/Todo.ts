export default interface Todo {
  id?: number,
  text: string,
  due_date?: string | Date,
  completed: boolean
}