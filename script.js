// ==========================================
// কনফিগারেশন
// ==========================================
const displayCurrent = document.getElementById('currDisplay');
const displayPrev = document.getElementById('prevDisplay');
const modeToggle = document.getElementById('modeToggle');
const buttons = document.querySelectorAll('button');

let currentOperand = '';
let previousOperand = '';
let operation = undefined;
let isWordMode = false;

// ম্যাপস
const enToBn = n => n.toString().replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);
const bnToEn = n => n.toString().replace(/[০-৯]/g, d => "০১২৩৪৫৬৭৮৯".indexOf(d));

const btnLabelsWord = {
    '7': 'সাত', '8': 'আট', '9': 'নয়',
    '4': 'চার', '5': 'পাঁচ', '6': 'ছয়',
    '1': 'এক', '2': 'দুই', '3': 'তিন',
    '0': 'শূন্য', '.': 'দশমিক',
    '+': 'যোগ', '-': 'বিয়োগ', '*': 'গুণ', '/': 'ভাগ', '%': 'শতকরা',
    'AC': 'মুছুন', 'DEL': 'সরান', '=': 'সমান'
};

const btnLabelsNormal = {
    '7': '৭', '8': '৮', '9': '৯',
    '4': '৪', '5': '৫', '6': '৬',
    '1': '১', '2': '২', '3': '৩',
    '0': '০', '.': '.',
    '+': '+', '-': '-', '*': '×', '/': '÷', '%': '%',
    'AC': 'AC', 'DEL': '⌫', '=': '='
};

// ০-৯৯ পর্যন্ত নির্দিষ্ট নামের তালিকা
const word0to99 = [
    'শূন্য', 'এক', 'দুই', 'তিন', 'চার', 'পাঁচ', 'ছয়', 'সাত', 'আট', 'নয়',
    'দশ', 'এগারো', 'বারো', 'তেরো', 'চৌদ্দ', 'পনেরো', 'ষোল', 'সতেরো', 'আঠারো', 'ঊনিশ',
    'বিশ', 'একুশ', 'বাইশ', 'তেইশ', 'চব্বিশ', 'পঁচিশ', 'ছাব্বিশ', 'সাতাশ', 'আঠাশ', 'ঊনত্রিশ',
    'ত্রিশ', 'একত্রিশ', 'বত্রিশ', 'তেত্রিশ', 'চৌত্রিশ', 'পঁয়ত্রিশ', 'ছত্রিশ', 'সাঁইত্রিশ', 'আটত্রিশ', 'ঊনচল্লিশ',
    'চল্লিশ', 'একচল্লিশ', 'বিয়াল্লিশ', 'তেতাল্লিশ', 'চুয়াল্লিশ', 'পঁয়তাল্লিশ', 'ছেচল্লিশ', 'সাতচল্লিশ', 'আটচল্লিশ', 'ঊনপঞ্চাশ',
    'পঞ্চাশ', 'একপঞ্চাশ', 'বায়ান্ন', 'তিপ্পান্ন', 'চুয়ান্ন', 'পঞ্চান্ন', 'ছাপ্পান্ন', 'সাতান্ন', 'আটান্ন', 'ঊনষাট',
    'ষাট', 'একষট্টি', 'বাষট্টি', 'তেষট্টি', 'চৌষট্টি', 'পঁয়ষট্টি', 'ছেষট্টি', 'সাতষট্টি', 'আটষট্টি', 'ঊনসত্তর',
    'সত্তর', 'একাত্তর', 'বাহাত্তর', 'তিয়াত্তর', 'চুয়াত্তর', 'পঁচাত্তর', 'ছিয়াত্তর', 'সাতাত্তর', 'আটাত্তর', 'ঊনআশি',
    'আশি', 'একাশি', 'বিরাশি', 'তিরাশি', 'চুরাশি', 'পঁচাশি', 'ছিয়াশি', 'সাতাশি', 'আটাশি', 'ঊননব্বই',
    'নব্বই', 'একানব্বই', 'বিরানব্বই', ' তিরানব্বই', 'চুরানব্বই', 'পঁচানব্বই', 'ছিয়ানব্বই', 'সাতানব্বই', 'আটানব্বই', 'নিরানব্বই'
];

// ডিজিট টু ওয়ার্ড (দশমিকের পরের জন্য)
const digitToWordMap = {
    '0': 'শূন্য', '1': 'এক', '2': 'দুই', '3': 'তিন', '4': 'চার',
    '5': 'পাঁচ', '6': 'ছয়', '7': 'সাত', '8': 'আট', '9': 'নয়'
};

// ==========================================
// এডভান্সড লজিক: বড় সংখ্যা ও দশমিক
// ==========================================

// পূর্ণসংখ্যা কথায় রূপান্তর (Recursive Logic for > 100)
function convertIntegerToBangla(n) {
    n = parseInt(n);
    if (n === 0) return '';
    if (n < 100) return word0to99[n];

    if (n < 1000) { // শত
        return word0to99[Math.floor(n / 100)] + 'শ ' + convertIntegerToBangla(n % 100);
    }
    if (n < 100000) { // হাজার
        return convertIntegerToBangla(Math.floor(n / 1000)) + ' হাজার ' + convertIntegerToBangla(n % 1000);
    }
    if (n < 10000000) { // লক্ষ
        return convertIntegerToBangla(Math.floor(n / 100000)) + ' লক্ষ ' + convertIntegerToBangla(n % 100000);
    }
    // কোটি (Crore)
    return convertIntegerToBangla(Math.floor(n / 10000000)) + ' কোটি ' + convertIntegerToBangla(n % 10000000);
}

// মেইন কনভার্টার ফাংশন (দশমিক হ্যান্ডলিং সহ)
function getBanglaWord(numStr) {
    if (!numStr || numStr === '.') return '';
    
    // যদি সংখ্যা শুধু ০ হয়
    if (parseFloat(numStr) === 0 && !numStr.includes('.')) return 'শূন্য';

    const parts = numStr.toString().split('.');
    let integerPart = parts[0];
    let decimalPart = parts[1];

    // পূর্ণসংখ্যার অংশ
    let result = '';
    if (integerPart !== '') {
        let intVal = parseInt(integerPart);
        if (intVal === 0) result = 'শূন্য';
        else result = convertIntegerToBangla(intVal);
    }

    // দশমিকের অংশ
    if (parts.length > 1) {
        result += ' দশমিক';
        // দশমিকের পরে ডিজিটগুলো আলাদা আলাদা বলা হয়
        for (let char of decimalPart) {
            result += ' ' + (digitToWordMap[char] || '');
        }
    }

    return result.trim();
}

// ==========================================
// UI আপডেট
// ==========================================
function updateUI() {
    // বাটন আপডেট
    buttons.forEach(btn => {
        const key = btn.dataset.key;
        if (isWordMode) {
            btn.innerText = btnLabelsWord[key];
            btn.classList.add('btn-word');
        } else {
            btn.innerText = btnLabelsNormal[key];
            btn.classList.remove('btn-word');
        }
    });

    // ডিসপ্লে আপডেট
    let displayCurrText = '';
    let displayPrevText = '';

    if (isWordMode) {
        // কারেন্ট ইনপুট
        if(currentOperand === '') displayCurrText = 'শূন্য';
        else displayCurrText = getBanglaWord(currentOperand);

        // প্রিভিয়াস অপারেশন
        if (operation != null) {
            displayPrevText = `${getBanglaWord(previousOperand)} ${btnLabelsWord[operation]}`;
        }
        displayCurrent.classList.add('word-mode');
    } else {
        displayCurrText = currentOperand === '' ? '০' : enToBn(currentOperand);
        if (operation != null) {
            displayPrevText = `${enToBn(previousOperand)} ${btnLabelsNormal[operation]}`;
        }
        displayCurrent.classList.remove('word-mode');
    }

    displayCurrent.innerText = displayCurrText;
    displayPrev.innerText = displayPrevText;
}

// ==========================================
// ক্যালকুলেশন লজিক
// ==========================================
function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number;
    updateUI();
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') compute();
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateUI();
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+': computation = prev + current; break;
        case '-': computation = prev - current; break;
        case '*': computation = prev * current; break;
        case '/': computation = prev / current; break;
        case '%': computation = prev % current; break;
        default: return;
    }

    // রেজাল্ট হ্যান্ডলিং
    computation = Math.round(computation * 100000000) / 100000000;
    
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    updateUI();
}

function clearCalc() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
    updateUI();
}

function deleteDigit() {
    currentOperand = currentOperand.toString().slice(0, -1);
    updateUI();
}

// ==========================================
// ইভেন্ট লিসেনার
// ==========================================
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        button.blur(); // ফোকাস সরানো
        
        const key = button.dataset.key;
        if(key >= '0' && key <= '9' || key === '.') {
            appendNumber(key);
        } else if (['+', '-', '*', '/', '%'].includes(key)) {
            chooseOperation(key);
        } else if (key === '=') {
            compute();
        } else if (key === 'AC') {
            clearCalc();
        } else if (key === 'DEL') {
            deleteDigit();
        }
    });
});

modeToggle.addEventListener('change', () => {
    isWordMode = modeToggle.checked;
    updateUI();
});

// ইনিশিয়াল কল
updateUI();