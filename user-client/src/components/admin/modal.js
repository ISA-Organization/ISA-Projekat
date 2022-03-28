import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'react-bootstrap'

// modal dobija objekat props koji sadrzi {modal: modal; onClose: onClose}
const Modal = ({ modal, onClose }) => {
    // ukoliko modal nje TRUE, ne vraca nista
    if (!modal) {
        return null
    }

    // vraca ukoliko je modal true. createPoratl "vadi" iz normalnog DOM-a i gura ga na element sa id#modal koji sam napravio u public/index.html
    return ReactDOM.createPortal(
        <div className="modal-container">
            <div className="modal-boris">
                <Button class="btn button-primary" onClick={onClose}>close</Button> some text
            </div>
        </div>,
        document.getElementById('modal')
    )
}

export default Modal
