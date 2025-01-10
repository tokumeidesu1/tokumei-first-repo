function initializeDoraguAndoDoroppu() {
  const addButton = document.getElementById('add-daiaru-button');
  
  document.addEventListener('dragover', (e) => {
    e.preventDefault();
    if (e.target.closest('#add-daiaru-button')) {
      e.target.closest('#add-daiaru-button').style.borderStyle = 'solid';
    }
  });

  document.addEventListener('dragleave', (e) => {
    if (e.target.closest('#add-daiaru-button')) {
      e.target.closest('#add-daiaru-button').style.borderStyle = 'dashed';
    }
  });

  document.addEventListener('drop', (e) => {
    e.preventDefault();
    
    const url = e.dataTransfer.getData('text/uri-list') || 
                e.dataTransfer.getData('text/plain');
    
    if (e.target.closest('#add-daiaru-button')) {
      e.target.closest('#add-daiaru-button').style.borderStyle = 'dashed';
      
      if (url && isValidUrl(url)) {
        showAddDaiaruPopup(url);
      }
    }
  });
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

initializeDoraguAndoDoroppu();