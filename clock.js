// Initialize hour marks and numbers
function initializeClockUI() {
    const hourMarksGroup = document.getElementById('hourMarks');
    const hourNumbersGroup = document.getElementById('hourNumbers');

    // Create hour marks
    for (let i = 0; i < 12; i++) {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 175 + Math.sin(angle) * 150;
        const y1 = 175 - Math.cos(angle) * 150;
        const x2 = 175 + Math.sin(angle) * 160;
        const y2 = 175 - Math.cos(angle) * 160;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', 'rgba(0,0,0,0.25)');
        line.setAttribute('stroke-width', '2');
        hourMarksGroup.appendChild(line);
    }

    // Create hour numbers
    for (let i = 0; i < 12; i++) {
        const num = i === 0 ? 12 : i;
        const angle = (i * 30 * Math.PI) / 180;
        const x = 175 + Math.sin(angle) * 130;
        const y = 175 - Math.cos(angle) * 130;

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('class', 'hour-number');
        text.setAttribute('font-size', '14');
        text.textContent = num;
        hourNumbersGroup.appendChild(text);
    }
}

// Update clock hands and digital display
function updateClock() {
    const now = new Date();
    const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

    const hours = istTime.getHours();
    const minutes = istTime.getMinutes();
    const seconds = istTime.getSeconds();
    const milliseconds = istTime.getMilliseconds();

    // Calculate exact degrees including milliseconds for smooth second hand
    const secondDeg = seconds * 6 + (milliseconds / 1000) * 6;
    const minuteDeg = minutes * 6 + (seconds / 60) * 6;
    const hourDeg = (hours % 12) * 30 + (minutes / 60) * 30;

    // Update analog clock hands
    const hourHand = document.getElementById('hour');
    const minuteHand = document.getElementById('minute');
    const secondHand = document.getElementById('second');

    hourHand.style.transform = `rotate(${hourDeg}deg)`;
    hourHand.style.transformOrigin = '175px 175px';
    hourHand.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    minuteHand.style.transformOrigin = '175px 175px';
    minuteHand.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    secondHand.style.transform = `rotate(${secondDeg}deg)`;
    secondHand.style.transformOrigin = '175px 175px';
    secondHand.style.transition = 'transform 0.1s linear';

    // Update digital display
    const displayHours = String(hours).padStart(2, '0');
    const displayMinutes = String(minutes).padStart(2, '0');
    const displaySeconds = String(seconds).padStart(2, '0');

    document.getElementById('hours').textContent = displayHours;
    document.getElementById('minutes').textContent = displayMinutes;
    document.getElementById('seconds').textContent = displaySeconds;

    // Update AM/PM
    document.getElementById('ampm').textContent = hours >= 12 ? 'PM' : 'AM';

    // Update stat cards
    document.getElementById('statHours').textContent = displayHours;
    document.getElementById('statMinutes').textContent = displayMinutes;
    document.getElementById('statSeconds').textContent = displaySeconds;

    // Update date
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    document.getElementById('dateDisplay').textContent = `${months[istTime.getMonth()]} ${istTime.getDate()}`;
}

// Animation loop for smooth updates
function animationLoop() {
    updateClock();
    requestAnimationFrame(animationLoop);
}

// Initialize and start the clock
document.addEventListener('DOMContentLoaded', () => {
    initializeClockUI();
    updateClock();
    animationLoop();

    // Keyboard shortcut for settings (can be extended)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'h' || e.key === 'H') {
            console.log('Settings toggle (H key pressed)');
        }
    });
});
