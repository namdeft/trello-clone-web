import React from 'react'
import './AppBar.scss'

import userImg from '../../assets/img/deft2.webp'
import logoImg from '../../assets/img/alpacalogo.jpeg'

const AppBar = () => {
    return (
        <div className='app-bar'>
            <div className='app-bar__information'>
                <div className='app-bar__item'>
                    <i className='fa fa-th' />
                </div>
                <a href='/' className='app-bar__logo' style={{ marginRight: '4px' }}>
                    <img src={logoImg} alt='' /> DEFT.
                </a>
                <div className='app-bar__item'>
                    <i className='fa fa-columns' style={{ marginRight: '4px' }} /> Board
                </div>
                <div className='app-bar__search'>
                    <input type='text' placeholder='Searching...' />
                    <i className='fa fa-search' style={{ marginRight: '8px' }} />
                </div>
            </div>
            <div className='app-bar__user'>
                <div className='app-bar__item'>
                    <i className='fa fa-plus-square-o' />
                </div>
                <div className='app-bar__item'>
                    <i className='fa fa-info-circle' />
                </div>
                <div className='app-bar__item'>
                    <i className='fa fa-bell-o' />
                </div>
                <div className='user-img'>
                    <img src={userImg} alt='user-image' />
                </div>
            </div>
        </div>
    )
}

export default AppBar
