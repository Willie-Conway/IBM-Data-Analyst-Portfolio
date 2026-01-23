// Main application state
let currentSection = 'all';
let masteredShortcuts = new Set();
let practiceState = {
    currentQuestion: 0,
    score: 0,
    questionsAnswered: 0,
    startTime: null,
    timer: null
};
let soundEnabled = true;
let currentTimer = null;
let pressedKeys = new Set();
let learningStartTime = Date.now();

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log("Excel Shortcuts Lab - Initializing...");
    init();
});

// Main initialization function
function init() {
    loadProgress();
    setupEventListeners();
    createExcelGrid();
    showSection('all');
    updateStreak();
    loadAchievements();
    updateStats();
    
    // Auto-save progress every 30 seconds
    setInterval(saveProgress, 30000);
    
    console.log("Excel Shortcuts Lab - Ready!");
}

// Setup all event listeners
function setupEventListeners() {
    console.log("Setting up event listeners...");
    
    // Navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            showSection(section);
        });
    });
    
    // Filter tags
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const tagType = this.getAttribute('data-tag');
            filterByTag(tagType);
        });
    });
    
    // Search input
    document.getElementById('searchInput').addEventListener('input', function(e) {
        filterShortcuts(this.value);
    });
    
    // Difficulty selector
    document.getElementById('difficulty').addEventListener('change', function(e) {
        changeDifficulty(this.value);
    });
    
    // Control buttons
    document.getElementById('exportBtn').addEventListener('click', exportProgress);
    document.getElementById('printBtn').addEventListener('click', printCheatSheet);
    document.getElementById('achievementsBtn').addEventListener('click', showAchievements);
    
    // Practice buttons
    document.getElementById('checkAnswerBtn').addEventListener('click', checkAnswer);
    document.getElementById('skipBtn').addEventListener('click', nextQuestion);
    
    // Sound toggle
    document.getElementById('soundToggle').addEventListener('click', toggleSound);
    
    // Keyboard input
    const keyboardInput = document.getElementById('keyboardInput');
    keyboardInput.addEventListener('keydown', handleKeyDown);
    keyboardInput.addEventListener('keyup', handleKeyUp);
    keyboardInput.addEventListener('click', function() {
        this.value = '';
        this.dataset.keys = '';
        document.getElementById('keyboardDisplay').innerHTML = '';
        pressedKeys.clear();
    });
    
    // Excel navigation shortcuts
    document.addEventListener('keydown', handleExcelNavigation);
    
    console.log("Event listeners set up successfully!");
}

// Handle keyboard input for practice
function handleKeyDown(e) {
    e.preventDefault();
    
    const key = e.key.toLowerCase();
    pressedKeys.add(key);
    
    // Don't show modifier keys alone
    if (['control', 'shift', 'alt', 'meta'].includes(key)) {
        return;
    }
    
    // Get modifier keys
    const modifiers = [];
    if (e.ctrlKey) modifiers.push('Ctrl');
    if (e.shiftKey) modifiers.push('Shift');
    if (e.altKey) modifiers.push('Alt');
    
    // Determine the main key to display
    let displayKey = e.key;
    if (displayKey === 'Control') displayKey = 'Ctrl';
    if (displayKey === ' ') displayKey = 'Space';
    if (displayKey === 'ArrowUp') displayKey = '↑';
    if (displayKey === 'ArrowDown') displayKey = '↓';
    if (displayKey === 'ArrowLeft') displayKey = '←';
    if (displayKey === 'ArrowRight') displayKey = '→';
    if (displayKey === ';' || displayKey === ':') displayKey = ';';
    
    // Combine modifiers and main key
    const allKeys = [...modifiers, displayKey];
    
    // Add to keyboard display
    const display = document.getElementById('keyboardDisplay');
    display.innerHTML = '';
    
    allKeys.forEach((key, index) => {
        const keyElement = document.createElement('div');
        keyElement.className = 'key-display';
        keyElement.textContent = key;
        display.appendChild(keyElement);
        
        // Add plus sign between keys
        if (index < allKeys.length - 1) {
            const plusElement = document.createElement('div');
            plusElement.className = 'key-display';
            plusElement.textContent = '+';
            plusElement.style.background = 'transparent';
            plusElement.style.color = '#666';
            display.appendChild(plusElement);
        }
    });
    
    // Store the combination
    this.dataset.keys = allKeys.join(',');
    this.value = allKeys.join(' + ');
}

function handleKeyUp(e) {
    const key = e.key.toLowerCase();
    pressedKeys.delete(key);
}

// Handle Excel navigation
function handleExcelNavigation(e) {
    if (e.target.id === 'keyboardInput') return;
    
    const activeCell = document.querySelector('.excel-cell.active');
    if (!activeCell) return;
    
    const allCells = Array.from(document.querySelectorAll('.excel-cell'));
    const currentIndex = allCells.indexOf(activeCell);
    let newIndex = currentIndex;
    
    switch(e.key) {
        case 'ArrowUp':
            e.preventDefault();
            newIndex = Math.max(0, currentIndex - 11);
            break;
        case 'ArrowDown':
            e.preventDefault();
            newIndex = Math.min(allCells.length - 1, currentIndex + 11);
            break;
        case 'ArrowLeft':
            e.preventDefault();
            newIndex = Math.max(0, currentIndex - 1);
            break;
        case 'ArrowRight':
            e.preventDefault();
            newIndex = Math.min(allCells.length - 1, currentIndex + 1);
            break;
        case 'F2':
            e.preventDefault();
            if (activeCell.getAttribute('contenteditable') !== 'true') {
                activeCell.setAttribute('contenteditable', 'true');
                activeCell.focus();
                const range = document.createRange();
                range.selectNodeContents(activeCell);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            }
            break;
        case 'Escape':
            if (activeCell.getAttribute('contenteditable') === 'true') {
                activeCell.setAttribute('contenteditable', 'false');
            }
            break;
        case 'Enter':
            if (activeCell.getAttribute('contenteditable') === 'true') {
                activeCell.setAttribute('contenteditable', 'false');
                newIndex = Math.min(allCells.length - 1, currentIndex + 11);
            }
            break;
        case 'b':
            if (e.ctrlKey) {
                e.preventDefault();
                activeCell.style.fontWeight = activeCell.style.fontWeight === 'bold' ? 'normal' : 'bold';
            }
            break;
    }
    
    if (newIndex !== currentIndex) {
        activeCell.classList.remove('active');
        activeCell.setAttribute('contenteditable', 'false');
        allCells[newIndex].classList.add('active');
        
        // Update active cell display
        const cellIndex = allCells.indexOf(allCells[newIndex]);
        const row = Math.floor(cellIndex / 11);
        const col = cellIndex % 11;
        if (row > 0 && col > 0) {
            const colLetter = String.fromCharCode(64 + col);
            document.getElementById('activeCell').textContent = `${colLetter}${row}`;
        }
    }
}

// Show section
function showSection(section) {
    console.log("Showing section:", section);
    currentSection = section;
    
    // Update navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-section') === section) {
            btn.classList.add('active');
        }
    });
    
    const shortcutsContainer = document.getElementById('shortcutsContainer');
    const practiceArea = document.getElementById('practiceArea');
    const achievementsPanel = document.getElementById('achievementsPanel');
    
    if (section === 'practice') {
        shortcutsContainer.style.display = 'none';
        practiceArea.style.display = 'block';
        practiceArea.style.width = '100%';
        practiceArea.style.borderLeft = 'none';
        achievementsPanel.style.display = 'none';
        nextQuestion();
    } else if (section === 'achievements') {
        shortcutsContainer.style.display = 'block';
        practiceArea.style.display = 'none';
        achievementsPanel.style.display = 'block';
        loadAchievements();
    } else {
        shortcutsContainer.style.display = 'block';
        practiceArea.style.display = 'block';
        practiceArea.style.width = '400px';
        practiceArea.style.borderLeft = '1px solid #dee2e6';
        achievementsPanel.style.display = 'none';
        loadShortcuts();
    }
}

// Load shortcuts based on filter
function loadShortcuts() {
    const grid = document.getElementById('shortcutsGrid');
    grid.innerHTML = '';
    
    let filteredShortcuts = currentSection === 'all' 
        ? shortcuts 
        : shortcuts.filter(s => s.category === currentSection);
    
    // Apply search filter if any
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm) {
        filteredShortcuts = filteredShortcuts.filter(shortcut => 
            shortcut.task.toLowerCase().includes(searchTerm) ||
            shortcut.description.toLowerCase().includes(searchTerm) ||
            shortcut.keys.join('').toLowerCase().includes(searchTerm)
        );
    }
    
    document.getElementById('total-shortcuts').textContent = `${filteredShortcuts.length}+`;
    
    filteredShortcuts.forEach(shortcut => {
        const card = document.createElement('div');
        card.className = `shortcut-card ${shortcut.category}`;
        card.addEventListener('click', () => markAsMastered(shortcut));
        
        const isMastered = masteredShortcuts.has(JSON.stringify(shortcut));
        if (isMastered) {
            card.style.background = '#f8fff9';
            card.style.borderStyle = 'dashed';
        }
        
        let keysHtml = '';
        shortcut.keys.forEach((key, index) => {
            keysHtml += `<div class="key">${key}</div>`;
            if (index < shortcut.keys.length - 1) {
                keysHtml += `<div class="key plus">+</div>`;
            }
        });
        
        card.innerHTML = `
            <div class="shortcut-category">${shortcut.category.toUpperCase()}</div>
            <div class="shortcut-keys">${keysHtml}</div>
            <div class="shortcut-task">${shortcut.task}</div>
            <div class="shortcut-description">${shortcut.description}</div>
            ${isMastered ? '<div style="margin-top: 10px; color: #27ae60; font-size: 12px;"><i class="fas fa-check-circle"></i> Mastered</div>' : ''}
        `;
        
        grid.appendChild(card);
    });
}

// Mark shortcut as mastered
function markAsMastered(shortcut) {
    const shortcutKey = JSON.stringify(shortcut);
    if (masteredShortcuts.has(shortcutKey)) {
        masteredShortcuts.delete(shortcutKey);
    } else {
        masteredShortcuts.add(shortcutKey);
        checkAchievements();
    }
    
    loadShortcuts();
    updateStats();
    saveProgress();
}

// Filter shortcuts by search
function filterShortcuts(searchTerm) {
    loadShortcuts();
}

// Filter by tag
function filterByTag(tag) {
    document.querySelectorAll('.filter-tag').forEach(t => {
        t.classList.remove('active');
    });
    event.target.classList.add('active');
    
    let filtered;
    switch(tag) {
        case 'frequent':
            filtered = shortcuts.filter(s => 
                ['Ctrl + C', 'Ctrl + V', 'Ctrl + S', 'Ctrl + Z', 'Ctrl + X', 'Ctrl + B'].includes(s.keys.join(' + '))
            );
            break;
        case 'new':
            filtered = shortcuts.filter(s => !masteredShortcuts.has(JSON.stringify(s)));
            break;
        case 'mastered':
            filtered = shortcuts.filter(s => masteredShortcuts.has(JSON.stringify(s)));
            break;
        default:
            filtered = shortcuts;
    }
    
    const grid = document.getElementById('shortcutsGrid');
    grid.innerHTML = '';
    
    filtered.forEach(shortcut => {
        const card = document.createElement('div');
        card.className = `shortcut-card ${shortcut.category}`;
        card.addEventListener('click', () => markAsMastered(shortcut));
        
        const isMastered = masteredShortcuts.has(JSON.stringify(shortcut));
        if (isMastered) {
            card.style.background = '#f8fff9';
            card.style.borderStyle = 'dashed';
        }
        
        let keysHtml = '';
        shortcut.keys.forEach((key, index) => {
            keysHtml += `<div class="key">${key}</div>`;
            if (index < shortcut.keys.length - 1) {
                keysHtml += `<div class="key plus">+</div>`;
            }
        });
        
        card.innerHTML = `
            <div class="shortcut-category">${shortcut.category.toUpperCase()}</div>
            <div class="shortcut-keys">${keysHtml}</div>
            <div class="shortcut-task">${shortcut.task}</div>
            <div class="shortcut-description">${shortcut.description}</div>
            ${isMastered ? '<div style="margin-top: 10px; color: #27ae60; font-size: 12px;"><i class="fas fa-check-circle"></i> Mastered</div>' : ''}
        `;
        
        grid.appendChild(card);
    });
}

// Create Excel grid simulation
function createExcelGrid() {
    const grid = document.getElementById('excelGrid');
    grid.innerHTML = '';
    
    // Create cells - 11 rows x 11 columns
    for (let row = 0; row < 11; row++) {
        for (let col = 0; col < 11; col++) {
            const cell = document.createElement('div');
            cell.className = 'excel-cell';
            cell.setAttribute('data-row', row);
            cell.setAttribute('data-col', col);
            
            if (row === 0 && col === 0) {
                // Empty top-left corner
                cell.textContent = '';
                cell.style.background = '#f8f9fa';
            } else if (row === 0) {
                // Column headers (A, B, C...)
                cell.className += ' header';
                cell.textContent = String.fromCharCode(64 + col);
            } else if (col === 0) {
                // Row headers (1, 2, 3...)
                cell.className += ' header';
                cell.textContent = row;
            } else {
                // Data cells
                if (row === 1 && col === 1) {
                    cell.className += ' active';
                    cell.textContent = 'Sales Data';
                } else if (row === 2 && col === 1) {
                    cell.textContent = '10000';
                    cell.setAttribute('data-value', '10000');
                } else if (row === 3 && col === 1) {
                    cell.textContent = '15000';
                    cell.setAttribute('data-value', '15000');
                } else if (row === 4 && col === 1) {
                    cell.textContent = '=SUM(B2:B3)';
                    cell.setAttribute('data-formula', '=SUM(B2:B3)');
                } else if (row === 1 && col === 3) {
                    cell.textContent = 'Click F2 to edit';
                    cell.style.color = '#666';
                    cell.style.fontSize = '11px';
                }
            }
            
            // Add click handler for cell selection
            cell.addEventListener('click', function() {
                document.querySelectorAll('.excel-cell').forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                
                // Update active cell display
                if (row > 0 && col > 0) {
                    const colLetter = String.fromCharCode(64 + col);
                    document.getElementById('activeCell').textContent = `${colLetter}${row}`;
                }
            });
            
            // Add formula evaluation on blur
            cell.addEventListener('blur', function() {
                const content = this.textContent;
                if (content.startsWith('=')) {
                    try {
                        const result = evaluateFormula(content.slice(1));
                        this.textContent = result;
                        this.removeAttribute('data-formula');
                        this.setAttribute('data-value', result);
                    } catch (e) {
                        this.textContent = '#ERROR!';
                    }
                }
            });
            
            grid.appendChild(cell);
        }
    }
}

// Evaluate Excel formulas
function evaluateFormula(formula) {
    formula = formula.toUpperCase();
    
    // SUM function
    if (formula.includes('SUM(')) {
        const range = formula.match(/SUM\(([^)]+)\)/)[1];
        if (range.includes(':')) {
            const [start, end] = range.split(':');
            let total = 0;
            
            // Simple range evaluation for demo
            if (start === 'B2' && end === 'B3') {
                const cell1 = document.querySelector('[data-row="2"][data-col="1"]');
                const cell2 = document.querySelector('[data-row="3"][data-col="1"]');
                total = parseInt(cell1.getAttribute('data-value') || '0') + 
                        parseInt(cell2.getAttribute('data-value') || '0');
            }
            return total.toLocaleString();
        }
    }
    
    // Simple arithmetic
    if (formula.includes('+')) {
        const parts = formula.split('+');
        return parts.reduce((sum, part) => sum + parseFloat(part.trim() || 0), 0);
    }
    
    return formula;
}

// Practice functions
function nextQuestion() {
    if (practiceState.currentQuestion >= practiceQuestions.length) {
        practiceState.currentQuestion = 0;
        practiceState.score = 0;
        practiceState.questionsAnswered = 0;
    }
    
    const question = practiceQuestions[practiceState.currentQuestion];
    document.getElementById('exerciseQuestion').textContent = question.question;
    
    // Clear previous input
    document.getElementById('keyboardInput').value = '';
    document.getElementById('keyboardInput').dataset.keys = '';
    document.getElementById('keyboardDisplay').innerHTML = '';
    document.getElementById('feedback').style.display = 'none';
    
    // Update hint
    document.getElementById('hint').innerHTML = 
        `💡 Press <span style="font-weight: 600;">${question.answer.join(' + ')}</span> on your keyboard`;
    
    // Update progress
    updateProgress();
}

function checkAnswer() {
    const input = document.getElementById('keyboardInput');
    const enteredKeys = input.dataset.keys ? input.dataset.keys.split(',') : [];
    const question = practiceQuestions[practiceState.currentQuestion];
    
    // Normalize keys for comparison
    const normalizedEntered = enteredKeys.map(k => {
        let key = k.toLowerCase().trim();
        if (key === 'ctrl') return 'control';
        if (key === ':') return ';';
        return key;
    });
    
    const normalizedAnswer = question.answer.map(k => k.toLowerCase().trim());
    
    // Check if arrays match (order matters)
    let isCorrect = true;
    if (normalizedEntered.length !== normalizedAnswer.length) {
        isCorrect = false;
    } else {
        for (let i = 0; i < normalizedEntered.length; i++) {
            if (normalizedEntered[i] !== normalizedAnswer[i]) {
                isCorrect = false;
                break;
            }
        }
    }
    
    // Show feedback
    const feedback = document.getElementById('feedback');
    if (isCorrect) {
        feedback.className = 'feedback correct';
        feedback.innerHTML = `✅ Correct! <strong>${question.answer.join(' + ')}</strong> ${question.question.toLowerCase()}`;
        practiceState.score++;
        
        // Mark corresponding shortcut as mastered
        const matchingShortcut = shortcuts.find(s => 
            s.keys.length === question.answer.length &&
            s.keys.every((key, i) => {
                const normalizedKey = key.toLowerCase() === 'ctrl' ? 'control' : key.toLowerCase();
                const normalizedAnswerKey = question.answer[i].toLowerCase();
                return normalizedKey === normalizedAnswerKey;
            })
        );
        
        if (matchingShortcut) {
            const shortcutKey = JSON.stringify(matchingShortcut);
            if (!masteredShortcuts.has(shortcutKey)) {
                masteredShortcuts.add(shortcutKey);
                showNotification(`🎉 New shortcut mastered: ${matchingShortcut.task}`);
            }
        }
        
        checkAchievements();
    } else {
        feedback.className = 'feedback incorrect';
        feedback.innerHTML = `❌ Incorrect. The correct answer is <strong>${question.answer.join(' + ')}</strong>`;
    }
    
    feedback.style.display = 'block';
    practiceState.questionsAnswered++;
    practiceState.currentQuestion++;
    
    // Update stats
    updateStats();
    updateProgress();
    saveProgress();
    
    // Auto-advance after delay
    setTimeout(() => {
        if (practiceState.currentQuestion < practiceQuestions.length) {
            nextQuestion();
        } else {
            // Show completion message
            feedback.className = 'feedback correct';
            const totalTime = Math.floor((Date.now() - practiceState.startTime) / 1000);
            feedback.innerHTML = `🎉 Practice Complete! Final Score: ${practiceState.score}/${practiceQuestions.length} (Time: ${totalTime}s)`;
            
            // Check for speed demon achievement
            if (totalTime < 120) {
                unlockAchievement('speed_demon');
            }
            
            // Check for perfect score
            if (practiceState.score === practiceQuestions.length) {
                unlockAchievement('perfect_score');
            }
        }
    }, 2000);
}

function changeDifficulty(level) {
    const allQuestions = [...practiceQuestions];
    switch(level) {
        case 'beginner':
            practiceQuestions = allQuestions.filter(q => 
                ['Control + S', 'Control + C', 'Control + V', 'Control + Z', 'Control + X'].includes(q.answer.join(' + '))
            );
            break;
        case 'advanced':
            practiceQuestions = allQuestions;
            startTimer(120);
            break;
        default:
            practiceQuestions = allQuestions;
    }
    practiceState.currentQuestion = 0;
    practiceState.score = 0;
    practiceState.questionsAnswered = 0;
    practiceState.startTime = Date.now();
    nextQuestion();
}

function startTimer(seconds) {
    // Clear existing timer
    if (currentTimer) {
        clearInterval(currentTimer);
        const existingTimer = document.getElementById('timer');
        if (existingTimer) existingTimer.remove();
    }
    
    const timer = document.createElement('div');
    timer.id = 'timer';
    timer.textContent = `Time: ${Math.floor(seconds/60)}:${(seconds%60).toString().padStart(2,'0')}`;
    document.querySelector('.practice-card').appendChild(timer);
    
    let timeLeft = seconds;
    currentTimer = setInterval(() => {
        timeLeft--;
        timer.textContent = `Time: ${Math.floor(timeLeft/60)}:${(timeLeft%60).toString().padStart(2,'0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(currentTimer);
            showNotification("⏰ Time's up! Your score: " + practiceState.score);
            timer.style.background = '#ff4444';
        } else if (timeLeft <= 30) {
            timer.style.background = '#ff9800';
        }
    }, 1000);
}

function updateProgress() {
    const progress = (practiceState.questionsAnswered / practiceQuestions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `Progress: ${Math.round(progress)}%`;
    document.getElementById('score').textContent = `Score: ${practiceState.score}/${practiceState.questionsAnswered}`;
}

// Stats and progress
function updateStats() {
    document.getElementById('mastered').textContent = masteredShortcuts.size;
}

function updateStreak() {
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem('excelShortcutsLastDate');
    let streak = parseInt(localStorage.getItem('excelShortcutsStreak') || '0');
    
    if (lastDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastDate === yesterday.toDateString()) {
            streak++;
        } else if (lastDate && lastDate !== today) {
            streak = 1;
        }
        
        localStorage.setItem('excelShortcutsLastDate', today);
        localStorage.setItem('excelShortcutsStreak', streak.toString());
    }
    
    document.getElementById('streak').textContent = streak;
    
    // Check streak achievement
    if (streak >= 3) {
        unlockAchievement('consistency');
    }
}

// Achievements functions
function checkAchievements() {
    if (masteredShortcuts.size >= 1) {
        unlockAchievement('first_mastered');
    }
    if (masteredShortcuts.size >= 5) {
        unlockAchievement('quick_learner');
    }
    if (masteredShortcuts.size >= 15) {
        unlockAchievement('expert');
    }
}

function unlockAchievement(achievementId) {
    const achievement = achievements.find(a => a.id === achievementId);
    if (!achievement) return;
    
    const unlocked = JSON.parse(localStorage.getItem('unlockedAchievements') || '[]');
    if (!unlocked.includes(achievementId)) {
        unlocked.push(achievementId);
        localStorage.setItem('unlockedAchievements', JSON.stringify(unlocked));
        showNotification(`🏆 Achievement Unlocked: ${achievement.name}`);
        loadAchievements();
    }
}

function loadAchievements() {
    const unlocked = JSON.parse(localStorage.getItem('unlockedAchievements') || '[]');
    const list = document.getElementById('achievementsList');
    list.innerHTML = '';
    
    achievements.forEach(achievement => {
        const isUnlocked = unlocked.includes(achievement.id);
        const achievementEl = document.createElement('div');
        achievementEl.className = `achievement ${isUnlocked ? 'unlocked' : ''}`;
        achievementEl.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div>
                <div style="font-weight: 600;">${achievement.name}</div>
                <div style="font-size: 12px; color: #666;">${achievement.desc}</div>
                ${isUnlocked ? '<div style="font-size: 11px; color: #27ae60; margin-top: 5px;"><i class="fas fa-check"></i> Unlocked</div>' : ''}
            </div>
        `;
        list.appendChild(achievementEl);
    });
}

function showAchievements() {
    const shortcutsContainer = document.getElementById('shortcutsContainer');
    const practiceArea = document.getElementById('practiceArea');
    const achievementsPanel = document.getElementById('achievementsPanel');
    
    shortcutsContainer.style.display = 'block';
    practiceArea.style.display = 'none';
    achievementsPanel.style.display = 'block';
    
    loadAchievements();
}

// Progress persistence
function saveProgress() {
    const progress = {
        mastered: Array.from(masteredShortcuts),
        stats: {
            lastPractice: new Date().toISOString(),
            totalTime: parseInt(localStorage.getItem('totalLearningTime') || '0'),
            streak: parseInt(localStorage.getItem('excelShortcutsStreak') || '0')
        }
    };
    localStorage.setItem('excelShortcutsProgress', JSON.stringify(progress));
}

function loadProgress() {
    const saved = localStorage.getItem('excelShortcutsProgress');
    if (saved) {
        try {
            const progress = JSON.parse(saved);
            masteredShortcuts = new Set(progress.mastered);
            updateStats();
        } catch (e) {
            console.log("Error loading progress:", e);
        }
    }
}

// Export & Print functions
function exportProgress() {
    const data = {
        masteredCount: masteredShortcuts.size,
        mastered: Array.from(masteredShortcuts).map(s => JSON.parse(s)),
        totalTime: localStorage.getItem('totalLearningTime') || '0',
        streak: localStorage.getItem('excelShortcutsStreak') || '0',
        date: new Date().toISOString(),
        progress: `${masteredShortcuts.size}/${shortcuts.length}`
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `excel-shortcuts-progress-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Progress exported successfully!');
}

function printCheatSheet() {
    const printWindow = window.open('', '_blank');
    const mastered = Array.from(masteredShortcuts).map(s => JSON.parse(s));
    
    const htmlContent = `
        <html>
        <head>
            <title>Excel Shortcuts Cheat Sheet</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 40px;
                    max-width: 800px;
                    margin: 0 auto;
                }
                h1 { color: #217346; }
                .header {
                    background: #217346;
                    color: white;
                    padding: 20px;
                    border-radius: 10px;
                    margin-bottom: 30px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                }
                th {
                    background: #f8f9fa;
                    padding: 12px;
                    text-align: left;
                    border-bottom: 2px solid #ddd;
                }
                td {
                    padding: 12px;
                    border-bottom: 1px solid #eee;
                }
                .mastered { background: #f8fff9; }
                .key {
                    background: #2c3e50;
                    color: white;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-family: monospace;
                    display: inline-block;
                    margin: 2px;
                }
                .progress {
                    margin: 30px 0;
                    padding: 20px;
                    background: #f8f9fa;
                    border-radius: 8px;
                }
                @media print {
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>My Excel Shortcuts Cheat Sheet</h1>
                <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
            </div>
            
            <div class="progress">
                <h3>Progress Summary</h3>
                <p>Mastered: <strong>${masteredShortcuts.size}/${shortcuts.length}</strong> shortcuts</p>
                <p>Day Streak: <strong>${localStorage.getItem('excelShortcutsStreak') || '0'}</strong> days</p>
                <p>Total Learning Time: <strong>${Math.floor((parseInt(localStorage.getItem('totalLearningTime') || '0')) / 60)}</strong> minutes</p>
            </div>
            
            <h2>All Shortcuts</h2>
            <table>
                <tr>
                    <th>Shortcut</th>
                    <th>Action</th>
                    <th>Description</th>
                    <th>Status</th>
                </tr>
                ${shortcuts.map(s => {
                    const isMastered = masteredShortcuts.has(JSON.stringify(s));
                    return `
                        <tr class="${isMastered ? 'mastered' : ''}">
                            <td>${s.keys.map(k => `<span class="key">${k}</span>`).join(' + ')}</td>
                            <td><strong>${s.task}</strong></td>
                            <td>${s.description}</td>
                            <td>${isMastered ? '✅ Mastered' : '📚 Learning'}</td>
                        </tr>
                    `;
                }).join('')}
            </table>
            
            <div class="no-print" style="margin-top: 40px; text-align: center; color: #666;">
                <p>Generated by Excel Keyboard Shortcuts Interactive Lab</p>
                <button onclick="window.print()" style="padding: 10px 20px; background: #217346; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    🖨️ Print This Cheat Sheet
                </button>
            </div>
            
            <script>
                window.onload = function() {
                    window.print();
                };
            </script>
        </body>
        </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
}

// Notification system
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Audio functions
function toggleSound() {
    soundEnabled = !soundEnabled;
    const toggle = document.getElementById('soundToggle');
    toggle.textContent = soundEnabled ? '🔊' : '🔈';
    showNotification(soundEnabled ? 'Sound enabled' : 'Sound disabled');
}

// Initialize tracking for learning time
setInterval(() => {
    const timeSpent = Math.floor((Date.now() - learningStartTime) / 1000);
    localStorage.setItem('totalLearningTime', 
        (parseInt(localStorage.getItem('totalLearningTime') || '0') + 1).toString());
}, 1000);