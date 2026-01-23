// Excel shortcuts data
const shortcuts = [
    // Navigation Shortcuts
    { task: "Close workbook", keys: ["Ctrl", "W"], category: "navigation", description: "Close the current workbook" },
    { task: "Open workbook", keys: ["Ctrl", "O"], category: "navigation", description: "Open an existing workbook" },
    { task: "Save workbook", keys: ["Ctrl", "S"], category: "navigation", description: "Save the current workbook" },
    { task: "Move up one cell", keys: ["↑"], category: "navigation", description: "Move selection upward" },
    { task: "Move down one cell", keys: ["↓"], category: "navigation", description: "Move selection downward" },
    { task: "Move left one cell", keys: ["←"], category: "navigation", description: "Move selection left" },
    { task: "Move right one cell", keys: ["→"], category: "navigation", description: "Move selection right" },
    { task: "Move to last cell", keys: ["Ctrl", "End"], category: "navigation", description: "Go to last cell with data" },
    { task: "Move to beginning", keys: ["Ctrl", "Home"], category: "navigation", description: "Go to cell A1" },
    { task: "Next worksheet", keys: ["Ctrl", "Page Down"], category: "navigation", description: "Switch to next sheet" },
    { task: "Previous worksheet", keys: ["Ctrl", "Page Up"], category: "navigation", description: "Switch to previous sheet" },
    
    // Editing Shortcuts
    { task: "Copy", keys: ["Ctrl", "C"], category: "editing", description: "Copy selected cells" },
    { task: "Cut", keys: ["Ctrl", "X"], category: "editing", description: "Cut selected cells" },
    { task: "Paste", keys: ["Ctrl", "V"], category: "editing", description: "Paste copied/cut cells" },
    { task: "Undo", keys: ["Ctrl", "Z"], category: "editing", description: "Undo last action" },
    { task: "Delete cell contents", keys: ["Delete"], category: "editing", description: "Clear cell contents" },
    { task: "Edit active cell", keys: ["F2"], category: "editing", description: "Edit cell with cursor at end" },
    { task: "Enter current time", keys: ["Ctrl", "Shift", ":"], category: "editing", description: "Insert current time" },
    { task: "Enter current date", keys: ["Ctrl", ";"], category: "editing", description: "Insert current date" },
    
    // Formatting Shortcuts
    { task: "Bold", keys: ["Ctrl", "B"], category: "formatting", description: "Apply or remove bold formatting" },
    { task: "Open context menu", keys: ["Shift", "F10"], category: "formatting", description: "Open right-click context menu" },
    { task: "Expand/collapse ribbon", keys: ["Ctrl", "F1"], category: "formatting", description: "Show or hide ribbon" },
    
    // Selection Shortcuts
    { task: "Move to edge of data", keys: ["Ctrl", "Arrow Key"], category: "selection", description: "Jump to edge of data region" },
    { task: "Extend selection to last cell", keys: ["Ctrl", "Shift", "End"], category: "selection", description: "Select all cells to last used" },
    { task: "Move one screen down", keys: ["Page Down"], category: "selection", description: "Scroll down one screen" },
    { task: "Move one screen up", keys: ["Page Up"], category: "selection", description: "Scroll up one screen" },
    { task: "Move one screen right", keys: ["Alt", "Page Down"], category: "selection", description: "Scroll right one screen" },
    { task: "Move one screen left", keys: ["Alt", "Page Up"], category: "selection", description: "Scroll left one screen" }
];

// Practice questions
const practiceQuestions = [
    {
        question: "What shortcut saves a workbook?",
        answer: ["Control", "S"],
        category: "navigation"
    },
    {
        question: "How do you copy selected cells?",
        answer: ["Control", "C"],
        category: "editing"
    },
    {
        question: "What shortcut makes text bold?",
        answer: ["Control", "B"],
        category: "formatting"
    },
    {
        question: "How do you undo the last action?",
        answer: ["Control", "Z"],
        category: "editing"
    },
    {
        question: "What shortcut pastes copied cells?",
        answer: ["Control", "V"],
        category: "editing"
    },
    {
        question: "How do you move to the last cell with data?",
        answer: ["Control", "End"],
        category: "navigation"
    },
    {
        question: "What shortcut cuts selected cells?",
        answer: ["Control", "X"],
        category: "editing"
    },
    {
        question: "How do you move to cell A1?",
        answer: ["Control", "Home"],
        category: "navigation"
    }
];

// Achievements
const achievements = [
    { id: 'first_mastered', name: 'First Step', desc: 'Master your first shortcut', target: 1, icon: '👣' },
    { id: 'quick_learner', name: 'Quick Learner', desc: 'Master 5 shortcuts', target: 5, icon: '🚀' },
    { id: 'expert', name: 'Shortcut Expert', desc: 'Master 15 shortcuts', target: 15, icon: '🎓' },
    { id: 'perfect_score', name: 'Perfect Score', desc: 'Get 100% on practice test', target: 100, icon: '🏆' },
    { id: 'speed_demon', name: 'Speed Demon', desc: 'Complete practice in under 2 minutes', target: 120, icon: '⚡' },
    { id: 'consistency', name: 'Consistency King', desc: '3-day practice streak', target: 3, icon: '🔥' }
];