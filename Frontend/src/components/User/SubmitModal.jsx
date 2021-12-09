import React from "react";
import "../../styles/SubmitModal.css";

const SubmitModal = ({ executeAction, closeModal }) => {
    return(
        <div className="submit_modal">
            <div className="modal_window">
                <h2>Delete project?</h2>
                <div className="text_block">
                    <p>Are you sure you want to delete this project?</p>
                    <p>If you delete this project you will also delete all tasks which belongs to this project.</p>
                </div>
                <div className="buttons">
                    <button onClick={executeAction}>Yes</button>
                    <button onClick={closeModal}>No</button>
                </div>
            </div>
            <div onClick={closeModal} className="overlay"></div>
        </div>
    )
}

export default SubmitModal;