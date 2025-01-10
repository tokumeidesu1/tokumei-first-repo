const supiidoDaiaruContainer = document.getElementById('supiido-daiaru-container');
const addDaiaruButton = document.getElementById('add-daiaru-button');

let daiaruItems = [];

function createDaiaruItem(title, url, iconUrl) {
  const item = document.createElement('div');
  item.className = 'daiaru-item fade-in';
  item.draggable = true;
  
  const iconContent = iconUrl === 'twitter-icon' 
    ? '<i class="fa-brands fa-twitter daiaru-icon"></i>'
    : `<img class="daiaru-icon" src="${iconUrl || 'placeholder.svg'}" alt="${title}">`;
  
  item.innerHTML = `
    <div class="daiaru-drag-handle">
      <i class="fas fa-grip-lines"></i>
    </div>
    ${iconContent}
    <span class="daiaru-title">${title}</span>
    <button class="daiaru-menu-button">
      <i class="fas fa-ellipsis-v"></i>
    </button>
    <div class="daiaru-menu">
      <button class="daiaru-menu-item daiaru-edit">
        <i class="fas fa-pen"></i> 編集
      </button>
      <button class="daiaru-menu-item daiaru-delete">
        <i class="fas fa-trash"></i> 削除
      </button>
    </div>
  `;
  
  item.addEventListener('click', (e) => {
    if (!e.target.closest('.daiaru-menu-button') && 
        !e.target.closest('.daiaru-menu') && 
        !e.target.closest('.daiaru-drag-handle')) {
      let finalUrl = url;
      if (!url.startsWith('http')) {
        finalUrl = `https://${url}`;
      }
      window.location.href = finalUrl;
    }
  });
  
  const menuButton = item.querySelector('.daiaru-menu-button');
  const menu = item.querySelector('.daiaru-menu');
  
  menuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('show');
  });
  
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.daiaru-menu') && !e.target.closest('.daiaru-menu-button')) {
      menu.classList.remove('show');
    }
  });
  
  item.querySelector('.daiaru-delete').addEventListener('click', (e) => {
    e.stopPropagation();
    removeDaiaruItem(item);
  });

  item.querySelector('.daiaru-edit').addEventListener('click', (e) => {
    e.stopPropagation();
    const index = Array.from(supiidoDaiaruContainer.children).indexOf(item) - 1;
    const currentItem = daiaruItems[index];
    showAddDaiaruPopup(currentItem.url, currentItem.title, index);
  });

  // ドラッグ&ドロップイベントの設定
  item.addEventListener('dragstart', handleDragStart);
  item.addEventListener('dragend', handleDragEnd);
  item.addEventListener('dragover', handleDragOver);
  item.addEventListener('drop', handleDrop);
  
  return item;
}

function handleDragStart(e) {
  e.target.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
  e.target.classList.remove('dragging');
  updateDaiaruItemsOrder();
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e) {
  e.preventDefault();
  const draggingItem = document.querySelector('.dragging');
  if (draggingItem && e.target.closest('.daiaru-item')) {
    const targetItem = e.target.closest('.daiaru-item');
    if (draggingItem !== targetItem) {
      const items = [...supiidoDaiaruContainer.children];
      const draggingIndex = items.indexOf(draggingItem);
      const targetIndex = items.indexOf(targetItem);
      
      if (draggingIndex < targetIndex) {
        targetItem.parentNode.insertBefore(draggingItem, targetItem.nextSibling);
      } else {
        targetItem.parentNode.insertBefore(draggingItem, targetItem);
      }
    }
  }
}

function updateDaiaruItemsOrder() {
  const items = Array.from(supiidoDaiaruContainer.children);
  const newDaiaruItems = [];
  
  items.forEach((item, index) => {
    if (index > 0 && !item.id.includes('add-daiaru-button')) {
      const title = item.querySelector('.daiaru-title').textContent;
      const iconElement = item.querySelector('.daiaru-icon');
      const iconUrl = iconElement.tagName === 'IMG' ? iconElement.src : 'twitter-icon';
      const itemIndex = index - 1;
      const originalItem = daiaruItems.find(item => item.title === title);
      
      if (originalItem) {
        newDaiaruItems.push({
          title: originalItem.title,
          url: originalItem.url,
          iconUrl: originalItem.iconUrl
        });
      }
    }
  });
  
  daiaruItems = newDaiaruItems;
  saveDaiaruItems();
}

function addDaiaruItem(title, url, iconUrl, index = -1) {
  if (index >= 0) {
    daiaruItems[index] = { title, url, iconUrl };
    const items = Array.from(supiidoDaiaruContainer.children);
    items[index + 1].remove();
    const newItem = createDaiaruItem(title, url, iconUrl);
    if (items[index + 2]) {
      supiidoDaiaruContainer.insertBefore(newItem, items[index + 2]);
    } else {
      supiidoDaiaruContainer.appendChild(newItem);
    }
  } else {
    const item = createDaiaruItem(title, url, iconUrl);
    supiidoDaiaruContainer.appendChild(item);
    daiaruItems.push({ title, url, iconUrl });
  }
  saveDaiaruItems();
}

function removeDaiaruItem(item) {
  const index = Array.from(supiidoDaiaruContainer.children).indexOf(item);
  if (index > -1) {
    daiaruItems.splice(index - 1, 1);
    item.remove();
    saveDaiaruItems();
  }
}

function showAddDaiaruPopup(prefilledUrl = '', prefilledTitle = '', editIndex = -1) {
  const popupHTML = `
    <div class="popup-content">
      <div class="popup-field">
        <label for="daiaru-title">タイトル:</label>
        <input type="text" id="daiaru-title" class="popup-input" value="${prefilledTitle}">
      </div>
      <div class="popup-field">
        <label for="daiaru-url">URL:</label>
        <input type="url" id="daiaru-url" class="popup-input" value="${prefilledUrl}">
      </div>
      <div class="popup-buttons">
        <button id="popup-cancel" class="popup-button">キャンセル</button>
        <button id="popup-add" class="popup-button popup-button-primary">
          ${editIndex >= 0 ? '更新' : '追加'}
        </button>
      </div>
    </div>
  `;

  const popup = document.createElement('div');
  popup.className = 'popup fade-in';
  popup.innerHTML = popupHTML;
  document.body.appendChild(popup);

  const handleAdd = () => {
    const titleInput = document.getElementById('daiaru-title');
    const urlInput = document.getElementById('daiaru-url');
    const title = titleInput.value.trim();
    const url = urlInput.value.trim();

    if (title && url) {
      getFavicon(url).then(iconUrl => {
        addDaiaruItem(title, url, iconUrl, editIndex);
        popup.remove();
      });
    }
  };

  popup.querySelector('#popup-add').addEventListener('click', handleAdd);
  popup.querySelector('#popup-cancel').addEventListener('click', () => popup.remove());
  
  popup.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') handleAdd();
    if (e.key === 'Escape') popup.remove();
  });

  popup.addEventListener('click', (e) => {
    if (e.target === popup) popup.remove();
  });

  document.getElementById('daiaru-title').focus();
}

addDaiaruButton.draggable = true;
addDaiaruButton.innerHTML = `
  <div class="daiaru-drag-handle">
    <i class="fas fa-grip-lines"></i>
  </div>
  <i class="fas fa-plus svg-icon"></i>
`;

addDaiaruButton.addEventListener('click', () => showAddDaiaruPopup());

addDaiaruButton.addEventListener('dragstart', handleDragStart);
addDaiaruButton.addEventListener('dragend', handleDragEnd);
addDaiaruButton.addEventListener('dragover', handleDragOver);
addDaiaruButton.addEventListener('drop', handleDrop);