function openModal(modal) {
    modal.classList.add('popup_is-opened');
    modal.addEventListener('mousedown', handleCloseByOverlay);
    document.addEventListener('keydown', handleCloseByEscape);
};

function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    modal.removeEventListener('mousedown', handleCloseByOverlay);
    document.removeEventListener('keydown', handleCloseByEscape);
};

function handleCloseByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.target);
    }
};

function handleCloseByEscape(evt) {
    if (evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
};

export { openModal, closeModal };

