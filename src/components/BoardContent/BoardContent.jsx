import React, { useEffect, useRef, useState } from 'react'
import './BoardContent.scss'
import BoardBar from 'components/BoardBar/BoardBar'

import {
    fetchBoards,
    createNewColumn,
    updateBoard,
    updateColumn,
    updateCard,
} from 'actions/callApi/callApi'
import { mapOrder } from 'utilities/sort'
import { applyDrag } from 'utilities/dragDrop'
import ConfirmModal from 'components/Common/ConfirmModal'
import { BOARD_ID } from 'utilities/constants'

import { isEmpty, cloneDeep } from 'lodash'
import { Container, Draggable } from 'react-smooth-dnd'

import Column from 'components/Column/Column'

const BoardContent = () => {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])

    const [openAddInput, setOpenAddInput] = useState(false)
    const inputRef = useRef(null)
    const [newColumnTitle, setNewColumnTitle] = useState('')

    const onChangeInput = (e) => setNewColumnTitle(e.target.value)

    useEffect(() => {
        fetchBoards(BOARD_ID).then((board) => {
            setBoard(board), setColumns(mapOrder(board.columns, board.columnOrder, '_id'))
        })
    }, [])

    useEffect(() => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus()
            inputRef.current.select()
        }
    }, [openAddInput])

    if (isEmpty(board)) {
        return (
            <div className='loading-container'>
                <div className='loading-ring'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }

    const onColumnDrop = (dropResult) => {
        let newColumns = cloneDeep(columns)

        newColumns = applyDrag(newColumns, dropResult)
        setColumns(newColumns)

        let newBoard = cloneDeep(board)
        newBoard.columnOrder = newColumns.map((column) => column._id)
        newBoard.columns = newColumns
        setBoard(newBoard)

        const compareArrColOrder = (board, newBoard) => {
            if (board.length !== newBoard.length) {
                return false
            } else {
                for (let i = 0; i < board.length; i++) {
                    if (board[i] !== newBoard[i]) {
                        return false
                    }
                }
                return true
            }
        }

        const resultCompareArrColOrder = compareArrColOrder(board.columnOrder, newBoard.columnOrder)

        if (!resultCompareArrColOrder) {
            updateBoard(newBoard._id, newBoard).catch(() => {
                setColumns(columns)
                setBoard(board)
            })
        }
    }

    const onCardDrop = (columnId, dropResult) => {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            let newColumns = [...columns]

            let currentColumn = newColumns.find((column) => column._id === columnId)
            currentColumn.cards = applyDrag(currentColumn.cards, dropResult)

            let cardsId = currentColumn.cards.map((card) => card._id)
            currentColumn.cardOrder = cardsId

            setColumns(newColumns)

            if (dropResult.removedIndex !== null && dropResult.addedIndex !== null) {
                // Call api update cardOrder in column
                if (dropResult.removedIndex !== dropResult.addedIndex) {
                    updateColumn(currentColumn._id, currentColumn).catch(() => {
                        setColumns(columns)
                    })
                }
            } else {
                // Call api update cardOrder in column
                // Call api update columnId in card
                if (dropResult.addedIndex !== null) {
                    let currentCard = cloneDeep(dropResult.payload)
                    currentCard.columnId = currentColumn._id

                    updateCard(currentCard._id, currentCard)
                    updateColumn(currentColumn._id, currentColumn)
                }
            }
        }
    }

    const toggleOpenAddInput = () => {
        setOpenAddInput(!openAddInput)
    }

    const addNewColumn = (e) => {
        e.preventDefault()

        if (!newColumnTitle) {
            inputRef.current.focus()
            return
        }

        const newColumnToAdd = {
            boardId: board._id,
            title: newColumnTitle.trim(),
        }

        let newBoard = { ...board }

        createNewColumn(newColumnToAdd).then((column) => {
            let newColumns = [...columns]
            newColumns.push(column)
            setColumns(newColumns)

            newBoard.columnOrder = newColumns.map((column) => column._id)
            newBoard.columns = newColumns
            setBoard(newBoard)
            toggleOpenAddInput()
            setNewColumnTitle('')
        })

        updateBoard(newBoard._id, newBoard)
    }

    const onUpdateColumnState = (columnToUpdate) => {
        let newColumns = [...columns]
        const columnToUpdateId = columnToUpdate._id
        const columnToUpdateIndex = newColumns.findIndex(
            (column) => column._id === columnToUpdateId
        )

        // Remove column
        if (columnToUpdate._destroy) {
            newColumns.splice(columnToUpdateIndex, 1)
            setColumns(newColumns)

            let newBoard = { ...board }
            newBoard.columns = newColumns
            newBoard.columnOrder = newColumns.map((column) => column._id)
            setBoard(newBoard)

            updateBoard(newBoard._id, newBoard).catch((error) => {
                throw new Error(error)
            })
        } else {
            // Edit title column
            newColumns.splice(columnToUpdateIndex, 1, columnToUpdate)
            setColumns(newColumns)

            let newBoard = cloneDeep(board)
            newBoard.columnOrder = newColumns.map((column) => column._id)
            newBoard.columns = newColumns
            setBoard(newBoard)
        }
    }

    return (
        <>
            <BoardBar board={board} />
            <div className='board-content'>
                <Container
                    orientation='horizontal'
                    onDrop={onColumnDrop}
                    dragHandleSelector='.column-drag-handle'
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'columns-drop-preview',
                    }}
                    getChildPayload={(index) => columns[index]}
                >
                    {board.columns &&
                        board.columns.map((column) => (
                            <Draggable key={column._id}>
                                <Column
                                    column={column}
                                    onCardDrop={onCardDrop}
                                    onUpdateColumnState={onUpdateColumnState}
                                />
                            </Draggable>
                        ))}
                </Container>
                <div className='add-new-column-container'>
                    {!openAddInput && (
                        <div className='add-new-column' onClick={toggleOpenAddInput}>
                            <i className='fa fa-plus'></i>
                            Add another list
                        </div>
                    )}
                    {openAddInput && (
                        <div className='enter-new-column'>
                            <form action=''>
                                <input
                                    type='text'
                                    className='input-new-column'
                                    placeholder='Enter list title...'
                                    ref={inputRef}
                                    onChange={onChangeInput}
                                />
                                <div className='add-column-control'>
                                    <input
                                        type='submit'
                                        className='add-column-btn'
                                        value='Add list'
                                        onClick={addNewColumn}
                                    ></input>
                                    <span onClick={toggleOpenAddInput}>
                                        <i className='fa fa-times'></i>
                                    </span>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                <ConfirmModal />
            </div>
        </>
    )
}

export default BoardContent
