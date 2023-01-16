import React, { useEffect, useRef, useState } from 'react'
import './Column.scss'

import Card from '../Card/Card'
import ConfirmModal from '../Common/ConfirmModal'

import { createNewCard, updateColumn } from '../../actions/callApi/callApi'
import { mapOrder } from '../../utilities/sort'
import { MODAL_ACTION_CONFIRM } from '../../utilities/constants'

import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown } from 'react-bootstrap'
import Textarea from 'react-expanding-textarea'
import { cloneDeep } from 'lodash'

const Column = ({ column, onCardDrop, onUpdateColumnState }) => {
    const cards = mapOrder(column.cards, column.cardOrder, '_id')

    const [showModal, setShowModal] = useState(false)
    const [inputTitle, setInputTitle] = useState(column.title)
    const [cardTitle, setCardTitle] = useState('')
    const [openCardForm, setOpenCardForm] = useState(false)
    const textareaRef = useRef(null)

    useEffect(() => {
        if (textareaRef && textareaRef.current) {
            textareaRef.current.focus()
            textareaRef.current.select()
        }
    }, [openCardForm])

    const toggleShowModal = () => {
        setShowModal(!showModal)
    }

    const toggleOpenCardForm = () => {
        setOpenCardForm(!openCardForm)
    }

    const confirmModal = (type) => {
        if (type === MODAL_ACTION_CONFIRM) {
            const newColumn = {
                ...column,
                _destroy: true,
            }
            updateColumn(newColumn._id, newColumn).then((updatedcolumn) => {
                onUpdateColumnState(updatedcolumn)
            })
        }

        toggleShowModal()
    }

    const handleOnBlurTitle = () => {
        const newColumn = {
            ...column,
            title: inputTitle,
        }

        if (column.title !== inputTitle) {
            updateColumn(newColumn._id, newColumn).catch((error) => {
                throw new Error(error)
            })
        }
    }

    const handleUpdateCardOrder = (id) => {
        let newCards = [...cards]

        const cardIndexToUpdate = newCards.findIndex((card) => card._id === id)

        let newColumn = { ...column }

        newCards.splice(cardIndexToUpdate, 1)
        newColumn.cards = newCards
        newColumn.cardOrder = newCards.map((card) => card._id)

        onUpdateColumnState(newColumn)

        console.log(newColumn)

        // updateColumn(newColumn._id, newColumn).then((updatedColumn) => {
        //     console.log(updatedColumn)
        // })
    }

    const handleOnClickTitle = (e) => {
        e.target.select()
    }

    const handleOnChangeTitle = (e) => {
        setInputTitle(e.target.value)
    }

    const handleOnChangeCardTitle = (e) => {
        setCardTitle(e.target.value)
    }

    const handleOnKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.target.blur()
        }
    }

    const handleOnKeyDownCard = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addNewCard()
        }
    }

    const addNewCard = () => {
        if (!cardTitle) {
            textareaRef.current.focus()
            return
        }

        const newCardToAdd = {
            boardId: column.boardId,
            columnId: column._id,
            title: cardTitle.trim(),
        }

        createNewCard(newCardToAdd).then((card) => {
            let newColumn = cloneDeep(column)
            newColumn.cards.push(card)
            newColumn.cardOrder.push(card._id)

            onUpdateColumnState(newColumn)
            setCardTitle('')
            toggleOpenCardForm()
        })
    }

    return (
        <>
            <div className='column'>
                <div className='column-content'>
                    <header className='column-drag-handle'>
                        <div className='column-title'>
                            <input
                                type='text'
                                className='editable-title'
                                placeholder='Enter list title...'
                                value={inputTitle}
                                onClick={handleOnClickTitle}
                                onChange={handleOnChangeTitle}
                                onBlur={handleOnBlurTitle}
                                onKeyDown={handleOnKeyDown}
                                onMouseDown={(e) => e.preventDefault()}
                                spellCheck='false'
                            />
                        </div>
                        <div className='column-dropdown-actions'>
                            <Dropdown>
                                <Dropdown.Toggle
                                    id='dropdown-basic'
                                    size='sm'
                                    className='dropdown-btn'
                                ></Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>Add card...</Dropdown.Item>
                                    <Dropdown.Item>Move list...</Dropdown.Item>
                                    <Dropdown.Item>Copy list...</Dropdown.Item>
                                    <Dropdown.Item onClick={toggleShowModal}>
                                        Delete column...
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </header>
                    <div className='card-list'>
                        <Container
                            groupName='column'
                            onDrop={(dropResult) => onCardDrop(column._id, dropResult)}
                            getChildPayload={(index) => cards[index]}
                            dragClass='card-ghost'
                            dropClass='card-ghost-drop'
                            dropPlaceholder={{
                                animationDuration: 150,
                                showOnTop: true,
                                className: 'cards-drop-preview',
                            }}
                            dropPlaceholderAnimationDuration={200}
                        >
                            {cards &&
                                cards.map((card) => (
                                    <Draggable key={card._id}>
                                        <Card
                                            card={card}
                                            handleUpdateCardOrder={handleUpdateCardOrder}
                                        />
                                    </Draggable>
                                ))}
                        </Container>
                        {openCardForm && (
                            <div className='enter-new-card'>
                                <Textarea
                                    type='input'
                                    className='textarea-new-card'
                                    placeholder='Enter card content...'
                                    // maxLength='3000'
                                    ref={textareaRef}
                                    onChange={handleOnChangeCardTitle}
                                    onKeyDown={handleOnKeyDownCard}
                                    spellCheck='false'
                                />
                                <div className='add-card-control'>
                                    <input
                                        type='submit'
                                        className='add-card-btn'
                                        value='Add card'
                                        onClick={addNewCard}
                                    ></input>
                                    <span onClick={toggleOpenCardForm}>
                                        <i className='fa fa-times'></i>
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                    <footer>
                        {!openCardForm && (
                            <div className='footer-container' onClick={toggleOpenCardForm}>
                                <i className='fa fa-plus' />
                                Add a card
                            </div>
                        )}
                    </footer>
                </div>
                <ConfirmModal
                    showModal={showModal}
                    confirmModal={confirmModal}
                    title='Remove Column!'
                    content={`Are you sure want to delete '${column.title}'.`}
                />
            </div>
        </>
    )
}

export default Column
