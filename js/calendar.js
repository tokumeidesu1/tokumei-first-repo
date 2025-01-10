document.addEventListener('DOMContentLoaded', () => {
  createCalendarModal();
  initializeCalendar();
});

function createCalendarModal() {
  const modal = document.createElement('div');
  modal.className = 'calendar-modal';
  
  modal.innerHTML = `
    <div class="calendar-content">
      <div class="calendar-header">
        <h2 class="calendar-title">カレンダー</h2>
        <button class="calendar-close">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="calendar-container">
        <div class="calendar-nav">
          <button class="calendar-nav-btn prev-month">
            <i class="fas fa-chevron-left"></i>
          </button>
          <h3 class="current-month"></h3>
          <button class="calendar-nav-btn next-month">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
        <div class="calendar-grid">
          <div class="calendar-days">
            <div>日</div>
            <div>月</div>
            <div>火</div>
            <div>水</div>
            <div>木</div>
            <div>金</div>
            <div>土</div>
          </div>
          <div class="calendar-dates"></div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  return modal;
}

function initializeCalendar() {
  const modal = document.querySelector('.calendar-modal');
  const closeButton = modal.querySelector('.calendar-close');
  const prevMonthButton = modal.querySelector('.prev-month');
  const nextMonthButton = modal.querySelector('.next-month');
  let currentDate = new Date();
  
  document.querySelector('.calendar-icon').addEventListener('click', () => {
    modal.classList.add('active');
    renderCalendar(currentDate);
  });
  
  closeButton.addEventListener('click', () => {
    modal.classList.remove('active');
  });
  
  prevMonthButton.addEventListener('click', () => {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });
  
  nextMonthButton.addEventListener('click', () => {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });
}

function renderCalendar(date) {
  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const currentMonthElement = document.querySelector('.current-month');
  const calendarDatesElement = document.querySelector('.calendar-dates');
  
  const year = date.getFullYear();
  const month = date.getMonth();
  
  currentMonthElement.textContent = `${year}年 ${monthNames[month]}`;
  
  calendarDatesElement.innerHTML = '';
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const prevMonthDays = new Date(year, month, 0).getDate();
  
  const firstDayIndex = firstDay.getDay();
  
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-date prev-month';
    dayElement.textContent = prevMonthDays - i;
    calendarDatesElement.appendChild(dayElement);
  }
  
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-date';
    if (
      i === new Date().getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
    ) {
      dayElement.classList.add('today');
    }
    dayElement.textContent = i;
    calendarDatesElement.appendChild(dayElement);
  }
  
  const remainingDays = 42 - (firstDayIndex + lastDay.getDate());
  for (let i = 1; i <= remainingDays; i++) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-date next-month';
    dayElement.textContent = i;
    calendarDatesElement.appendChild(dayElement);
  }
}