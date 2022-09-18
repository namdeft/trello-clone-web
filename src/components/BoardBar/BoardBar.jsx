import React, { useEffect, useState } from 'react'
import './BoardBar.scss'

import { fetchBoards, updateBoard } from 'actions/callApi/callApi'

import friendLogo from 'assets/img/dieuling.jpeg'
import friendLogo1 from 'assets/img/dieuling2.jpeg'
import friendLogo2 from 'assets/img/cutie.jpeg'

const BoardBar = ({ board }) => {
    const [inputBoardTitle, setInputBoardTitle] = useState('')

    useEffect(() => {
        const boardId = '631369e11c31e5be66b7b458'

        fetchBoards(boardId).then((board) => setInputBoardTitle(board.title))
    }, [])

    const handleChangeBoardTitle = (e) => {
        setInputBoardTitle(e.target.value)
    }

    const handleOnClickBoardTitle = (e) => {
        e.target.select()
    }

    const handleBlueBoardTitle = () => {
        let newBoard = {
            ...board,
            title: inputBoardTitle,
        }
        if (board.title !== inputBoardTitle && inputBoardTitle.length > 0) {
            updateBoard(newBoard._id, newBoard).then((updatedBoard) =>
                setInputBoardTitle(updatedBoard.title)
            )
        }

        if (inputBoardTitle.length === 0) {
            setInputBoardTitle(board.title)
        }
    }

    const handleOnKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.target.blur()
        }
    }

    return (
        <div className='board-bar'>
            <div className='board-bar__info'>
                <div className='board-name'>
                    <input
                        type='text'
                        value={inputBoardTitle}
                        onChange={handleChangeBoardTitle}
                        onClick={handleOnClickBoardTitle}
                        onBlur={handleBlueBoardTitle}
                        onKeyDown={handleOnKeyDown}
                        onMouseDown={(e) => e.preventDefault()}
                        contentEditable='true'
                        spellCheck='false'
                    />
                </div>
                <div className='divider'></div>
                <div className='item workspace'>Workspace visible</div>
                <div className='divider'></div>
                <div className='friends-avatar'>
                    <img src={friendLogo} alt='' />
                    <img src={friendLogo1} alt='' />
                    <img src={friendLogo2} alt='' />
                </div>
                <div className='item more-friends'>+3</div>
                <div className='item invite'>Invite</div>
            </div>
            <div className='board-bar__actions'>
                <div className='item menu'>
                    <i className='fa fa-ellipsis-h mr-2' style={{ marginRight: '4px' }} /> Show menu
                </div>
            </div>
        </div>
    )
}

export default BoardBar
