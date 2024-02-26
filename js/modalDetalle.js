function createModalContent() {
    var modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.innerHTML = `
        <span class="close">&times;</span>
        <!-- Your existing HTML content -->
        <!-- You can dynamically insert content here -->
    `;
    return modalContent;
}