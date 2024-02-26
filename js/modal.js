// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById('myBtn');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
    document.body.classList.add("modal-active"); // Prevent scrolling on body
    setTimeout(() => { // Timeout for the CSS transition
      modal.style.opacity = "1";
      modal.querySelector('.modal-content').style.opacity = "1";
      modal.querySelector('.modal-content').style.transform = "scale(1)";
    }, 10);
}

// When the user clicks on <span> (x), or outside the modal, close it
function closeModal() {
    modal.style.opacity = "0";
    modal.querySelector('.modal-content').style.opacity = "0";
    modal.querySelector('.modal-content').style.transform = "scale(0.7)";
    setTimeout(() => { // Timeout for the CSS transition
      modal.style.display = "none";
      document.body.classList.remove("modal-active"); // Re-enable scrolling on body
    }, 300);
}

span.onclick = closeModal;

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}