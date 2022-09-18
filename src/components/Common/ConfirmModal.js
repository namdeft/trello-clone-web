import React from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from 'utilities/constants'

function ConfirmModal({ showModal, confirmModal, title, content }) {
    return (
        <Modal
            show={showModal}
            onHide={() => confirmModal(MODAL_ACTION_CLOSE)}
            backdrop='static'
            keyboard='false'
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{content}</Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={() => confirmModal(MODAL_ACTION_CLOSE)}>
                    Close
                </Button>
                <Button variant='primary' onClick={() => confirmModal(MODAL_ACTION_CONFIRM)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmModal
