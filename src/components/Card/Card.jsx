import React from 'react'
import './Card.scss'

import { updateCard } from 'actions/callApi/callApi'

const Card = ({ card, handleUpdateCardOrder }) => {
    const handleDeleteCard = () => {
        const newCard = {
            ...card,
            _destroy: true,
        }

        handleUpdateCardOrder(newCard._id)
        updateCard(newCard._id, newCard)
    }

    return (
        <>
            <div className='card-item'>
                {card.cover && (
                    <img
                        draggable='false'
                        className='card-cover'
                        src={card.cover}
                        alt='cute <3'
                    ></img>
                )}
                {card.title}
                <div className='delete-card__btn' onClick={handleDeleteCard}>
                    <i className='fa fa-close' />
                </div>
            </div>
        </>
    )
}

export default Card
