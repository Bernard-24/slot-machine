# 🎰 Jackpot 777 – Slot Machine Game

A simple, fun **Slot Machine Game** built with **HTML, CSS, and JavaScript**.  
Players can deposit credits, choose lines, set bets, and spin the reels to test their luck!

---

## 🌍 Live Demo
🔗 [Play Now]( https://bernard-24.github.io/slot-machine/)  

---

## 🧩 Features
- 🎯 Choose between **1–3 lines** to play  
- 💵 Adjustable **bet per line**  
- 💰 **Deposit and manage credits**  
- 🌀 Realistic **spinning effect**  
- 🏆 Win multipliers:
  - A A A → ×5  
  - B B B → ×4  
  - C C C → ×3  
  - D D D → ×2  
- 🎨 Clean, glowing slot-machine design

---

## 🧠 How to Play
1. Deposit any amount to start.  
2. Choose the number of **lines** and **bet per line**.  
3. Click **SPIN!** to roll the reels.  
4. Matching symbols = winnings added to your balance.  
5. Cash out anytime!

---

## ⚙️ Built With
- **HTML5** – structure  
- **CSS3** – styling & animations  
- **JavaScript (ES6)** – game logic & interactivity  

---

## 📁 Project Structure










<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Slot Machine Game</title>

    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <div class="slot-machine-frame">
            <button class="sound-toggle" onclick="toggleSound()" id="soundToggle">🔊 Sound ON</button>
            <div class="machine-top"></div>
            <div class="title">🎰 JACKPOT 777 🎰</div>

            <div class="setup-screen active">
                <div class="setup-panel">
                    <div class="input-group coin-slot">
                        <label>💰 INSERT COINS (Deposit Amount):</label>
                        <input type="number" id="depositInput" min="1" step="0.01" placeholder="Enter amount">
                    </div>
                    <button onclick="startGame()">START GAME</button>
                    
                    <div class="symbol-legend">
                        <h3>💎 PAYTABLE 💎</h3>
                        <div class="legend-item">A A A = x5</div>
                        <div class="legend-item">B B B = x4</div>
                        <div class="legend-item">C C C = x3</div>
                        <div class="legend-item">D D D = x2</div>
                    </div>
                </div>
            </div>

            <div class="game-screen">
                <div class="display-panel">
                    <div class="balance-display">CREDITS: $<span id="balance">0.00</span></div>
                </div>

                <div class="reels-container">
                    <div class="reels" id="reels">
                        <div class="reel-window"><div class="reel">🎰</div></div>
                        <div class="reel-window"><div class="reel">🎰</div></div>
                        <div class="reel-window"><div class="reel">🎰</div></div>
                        <div class="reel-window"><div class="reel">🎰</div></div>
                        <div class="reel-window"><div class="reel">🎰</div></div>
                        <div class="reel-window"><div class="reel">🎰</div></div>
                        <div class="reel-window"><div class="reel">🎰</div></div>
                        <div class="reel-window"><div class="reel">🎰</div></div>
                        <div class="reel-window"><div class="reel">🎰</div></div>
                    </div>
                    <div class="line-indicators">
                        <div class="line-indicator" id="line1"></div>
                        <div class="line-indicator" id="line2"></div>
                        <div class="line-indicator" id="line3"></div>
                    </div>
                </div>

                <div class="control-panel">
                    <div class="controls-grid">
                        <div class="input-group">
                            <label>🎯 LINES (1-3):</label>
                            <select id="linesSelect" onchange="updateLineIndicators()">
                                <option value="1">1 Line</option>
                                <option value="2">2 Lines</option>
                                <option value="3">3 Lines</option>
                            </select>
                        </div>

                        <div class="input-group">
                            <label>💵 BET PER LINE:</label>
                            <input type="number" id="betInput" min="0.01" step="0.01" placeholder="Enter bet">
                        </div>
                    </div>

                    <div class="button-container">
                        <button id="spinButton" onclick="spinSlots()">SPIN!</button>
                        <button class="secondary" onclick="resetGame()">CASH OUT</button>
                    </div>

                    <div id="message"></div>
                </div>
            </div>
        </div>
    </div>
<script src="script.js"></script>

</body>

</html>
