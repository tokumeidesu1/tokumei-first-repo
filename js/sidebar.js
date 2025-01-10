window.sidebarState = {
  isOpen: false,
  isPinned: localStorage.getItem('sidebarPinned') === 'true'
};

function createSidebarElements() {
  const sidebar = document.createElement('div');
  sidebar.className = 'sidebar';
  if (window.sidebarState.isPinned) {
    sidebar.classList.add('pinned');
  }
  
  const sidebarContent = `
    <button class="pin-button ${window.sidebarState.isPinned ? 'pinned' : ''}">
      <i class="fas fa-thumbtack"></i>
    </button>
    <div class="sidebar-icons">
      <i class="fas fa-list-check todo-icon sidebar-icon"></i>
      <i class="fas fa-calculator calculator-icon sidebar-icon"></i>
      <i class="fas fa-calendar-days calendar-icon sidebar-icon"></i>
    </div>
  `;
  
  sidebar.innerHTML = sidebarContent;
  
  const trigger = document.createElement('div');
  trigger.className = 'sidebar-trigger';
  
  const clockContainer = document.createElement('div');
  clockContainer.className = 'clock-container';
  clockContainer.id = 'clock';
  
  document.body.appendChild(sidebar);
  document.body.appendChild(trigger);
  document.body.appendChild(clockContainer);
  
  return { sidebar, trigger, clockContainer };
}

function updateClock() {
  const clock = document.getElementById('clock');
  if (clock) {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const { sidebar, trigger, clockContainer } = createSidebarElements();
  const pinButton = sidebar.querySelector('.pin-button');
  
  pinButton.addEventListener('click', () => {
    window.sidebarState.isPinned = !window.sidebarState.isPinned;
    localStorage.setItem('sidebarPinned', window.sidebarState.isPinned);
    
    if (window.sidebarState.isPinned) {
      sidebar.classList.add('pinned');
      pinButton.classList.add('pinned');
    } else {
      sidebar.classList.remove('pinned');
      pinButton.classList.remove('pinned');
    }
  });
  
  trigger.addEventListener('mouseenter', () => {
    if (!window.sidebarState.isPinned) {
      window.sidebarState.isOpen = true;
      sidebar.classList.add('active');
    }
  });
  
  sidebar.addEventListener('mouseleave', () => {
    if (!window.sidebarState.isPinned) {
      window.sidebarState.isOpen = false;
      sidebar.classList.remove('active');
    }
  });
  
  setInterval(updateClock, 1000);
  updateClock();
});