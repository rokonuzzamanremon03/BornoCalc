# 🧮 BornoCalc (বর্ণক্যালক)

**BornoCalc** is an intelligent Bengali Calculator web application designed with a sleek **Neumorphic UI**. It goes beyond standard calculations by introducing a unique **"Word Mode" (কথায়)** feature that translates numerical results into grammatically correct Bengali sentences instantly.

> *Calculations that speak your language.*

![BornoCalc Demo](screenshot.png)
*(Note: Upload a screenshot of your calculator named 'screenshot.png' to the repository to see the image here)*

## ✨ Key Features

### 🗣️ Smart Word Mode (কথায় রূপান্তর)
- **Real-time Conversion:** Instantly converts inputs and results from numbers to Bengali text (e.g., `12.5` → `বারো দশমিক পাঁচ`).
- **Large Number Support:** Accurately handles large figures using the South Asian numbering system (**Lakh**, **Crore**).
- **Decimal Precision:** Smartly reads out digits after the decimal point.

### 🎨 Modern UI/UX
- **Neumorphism Design:** Soft, realistic, and tactile button effects that feel like pressing real physical buttons.
- **Ultra-Smooth Response:** Optimized for zero-lag touch response on mobile devices (`touch-action: manipulation`).
- **Dynamic Interface:** Buttons change their labels from digits (৭, ৮, ৯) to words (সাত, আট, নয়) when switching modes.

## 🛠️ Tech Stack

- **HTML5:** Semantic structure and layout.
- **CSS3:** Advanced styling using CSS Variables, Grid Layout, and Neumorphic shadows.
- **JavaScript (ES6+):** - DOM Manipulation for interactive UI.
  - Recursive algorithms for Number-to-Word conversion.
  - Floating-point arithmetic correction.

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone [https://github.com/rokonuzzamanremon03/BornoCalc.git](https://github.com/rokonuzzamanremon03/BornoCalc.git)
2. Navigate to the project folder:
			```bash
			cd BornoCalc
3. Open index.html in your favorite browser.

## 🧠 How It Works (The Logic)

BornoCalc uses a custom JavaScript mapping system to handle Bengali numbers.

- **0-99:** Mapped directly to their unique Bengali names.
- **100+:** Uses a recursive function to break down numbers into Shoto (Hundred), Hajar (Thousand), Lokkho (Lakh), and Koti (Crore).
- **Decimals:** - Splits the number at the decimal point and processes the integer and fractional parts separately for accurate linguistic representation.
	
## ​📱 Mobile Responsiveness
​The application is fully responsive and prevents double-tap zooming, ensuring an "App-like" feel on smartphones.

## ​👨‍💻 Author
**​Rokon Uz Zaman Remon** Aspiring Future Tech & AI Enthusiast.

---
*Created with ❤️ for Bengali users.*