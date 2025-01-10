document.addEventListener('DOMContentLoaded', function() {
  initializeComponents();
});

function initializeComponents() {
  const kensakuInput = document.getElementById('kensaku-input');
  if (kensakuInput) {
    kensakuInput.focus();
  }
}