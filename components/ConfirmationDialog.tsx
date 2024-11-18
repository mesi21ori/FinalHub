// components/ConfirmationDialog.tsx
import React from 'react';
import styles from './ConfirmationDialog.module.css';

interface ConfirmationDialogProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.dialog}>
                <h3>Are you sure you want to delete this content?</h3>
                <div className={styles.buttons}>
                    <button onClick={onConfirm} className={styles.confirmButton}>Yes, Delete</button>
                    <button onClick={onCancel} className={styles.cancelButton}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;
