import { useState } from 'react'
import './book.scss'
import {
  bookType,
  useAddBookMutation,
  useGetBookQuery,
  useUpdateBookMutation,
  useDeteteBookMutation,
} from '../../redux/book/bookSlice'

let editIndex: number = -1
const Book = () => {
  const {
    data: bookList = [],
    isLoading,
    isError,
    isSuccess,
  } = useGetBookQuery()
  const [inputBookName, setInputBookName] = useState('')
  const [inputWriterName, setInputWriterName] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  const [addBook] = useAddBookMutation()
  const [updateBook] = useUpdateBookMutation()
  const [deteteBook] = useDeteteBookMutation()

  const onEdit = (data: string, index: number) => {
    editIndex = index
    setIsEdit(!isEdit)
    setInputBookName(data)
  }

  let fetchedData
  if (isLoading) {
    fetchedData = <span>Loading...</span>
  } else if (isError) {
    fetchedData = <span>Opss!Something went wrong!</span>
  } else if (isSuccess) {
    fetchedData = bookList.map((item: bookType, index: number) => {
      return (
        <div key={index} className="o-book__list">
          <div>
            <label>Sold</label>
            <input
              type="checkbox"
              checked={item.isSold || false}
              id={item.id.toString()}
              onChange={() => updateBook({ ...item, isSold: !item.isSold })}
            ></input>
          </div>

          <button onClick={() => onEdit(item.bookName, index)}>
            Edit bookName
          </button>
          <span>Book Name: {item.bookName}</span>
          {isEdit && index === editIndex && (
            <div>
              <input
                type="text"
                value={inputBookName}
                onChange={(e) => setInputBookName(e.target.value)}
              ></input>
              <button onClick={() => updateData(item)}>Done</button>
            </div>
          )}

          <span>Writer Name: {item.writerName}</span>

          <button onClick={() => deteteBook({ id: item.id })}>
            Delete Book
          </button>
        </div>
      )
    })
  }

  const addData = (e: any) => {
    e.preventDefault()
    addBook({
      id: bookList.length + 1,
      bookName: inputBookName,
      writerName: inputWriterName,
      isSoild: false,
    })
    setInputBookName('')
    setInputWriterName('')
  }

  const updateData = (currentData: bookType) => {
    updateBook({ ...currentData, bookName: inputBookName })
    setIsEdit(!isEdit)
    setInputBookName('')
    editIndex = -1
  }

  return (
    <div className="o-book">
      <h2> Book List</h2>
      <br />
      <br />
      {!isEdit && (
        <div>
          <label>Book Name</label>
          <input
            type="text"
            value={inputBookName}
            onChange={(e) => setInputBookName(e.target.value)}
          ></input>
          <br />
          <br />

          <label>Writer Name</label>
          <input
            type="text"
            value={inputWriterName}
            onChange={(e) => setInputWriterName(e.target.value)}
          ></input>
          <br />
          <br />

          <button onClick={addData}> Add Book</button>
        </div>
      )}
      <br />
      {fetchedData}
    </div>
  )
}

export default Book
