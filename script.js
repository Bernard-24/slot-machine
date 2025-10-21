
        const ROWS = 3;
        const COLS = 3;

        const SYMBOLS_COUNT = {
            A: 2,
            B: 4,
            C: 6,
            D: 8
        };

        const SYMBOL_VALUES = {
            A: 5,
            B: 4,
            C: 3,
            D: 2
        };

        let balance = 0;
        let isSpinning = false;
        let soundEnabled = true;
        let audioContext = null;

        // Initialize audio context on first user interaction
        function initAudio() {
            if (!audioContext) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
        }

        function playSpinSound() {
            if (!soundEnabled || !audioContext) return;
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        }

        function playWinSound() {
            if (!soundEnabled || !audioContext) return;
            
            const notes = [523.25, 587.33, 659.25, 783.99, 880.00];
            const noteDuration = 0.15;
            
            notes.forEach((frequency, index) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
                oscillator.type = 'sine';
                
                const startTime = audioContext.currentTime + (index * noteDuration);
                gainNode.gain.setValueAtTime(0.2, startTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + noteDuration);
                
                oscillator.start(startTime);
                oscillator.stop(startTime + noteDuration);
            });
        }

        function playTickSound() {
            if (!soundEnabled || !audioContext) return;
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.type = 'square';
            
            gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.05);
        }

        function toggleSound() {
            initAudio();
            soundEnabled = !soundEnabled;
            const toggleBtn = document.getElementById('soundToggle');
            toggleBtn.textContent = soundEnabled ? '🔊 Sound ON' : '🔇 Sound OFF';
        }

        function startGame() {
            initAudio();
            const depositInput = document.getElementById('depositInput');
            const depositAmount = parseFloat(depositInput.value);

            if (isNaN(depositAmount) || depositAmount <= 0) {
                alert('Please enter a valid deposit amount!');
                return;
            }

            balance = depositAmount;
            document.getElementById('balance').textContent = balance.toFixed(2);
            document.querySelector('.setup-screen').classList.remove('active');
            document.querySelector('.game-screen').classList.add('active');
            updateLineIndicators();
        }

        function updateLineIndicators() {
            const lines = parseInt(document.getElementById('linesSelect').value);
            for (let i = 1; i <= 3; i++) {
                const indicator = document.getElementById('line' + i);
                if (i <= lines) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            }
        }

        function spin() {
            const symbols = [];
            for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
                for (let i = 0; i < count; i++) {
                    symbols.push(symbol);
                }
            }

            const reels = [];
            for (let i = 0; i < COLS; i++) {
                reels.push([]);
                const reelSymbols = [...symbols];
                for (let j = 0; j < ROWS; j++) {
                    const randomIndex = Math.floor(Math.random() * reelSymbols.length);
                    const selectedSymbol = reelSymbols[randomIndex];
                    reels[i].push(selectedSymbol);
                    reelSymbols.splice(randomIndex, 1);
                }
            }

            return reels;
        }

        function transpose(reels) {
            const rows = [];
            for (let i = 0; i < ROWS; i++) {
                rows.push([]);
                for (let j = 0; j < COLS; j++) {
                    rows[i].push(reels[j][i]);
                }
            }
            return rows;
        }

        function getWinnings(rows, bet, lines) {
            let winnings = 0;

            for (let row = 0; row < lines; row++) {
                const symbols = rows[row];
                let allSame = true;

                for (const symbol of symbols) {
                    if (symbol !== symbols[0]) {
                        allSame = false;
                        break;
                    }
                }

                if (allSame) {
                    winnings += bet * SYMBOL_VALUES[symbols[0]];
                }
            }

            return winnings;
        }

        function displayReels(rows) {
            const reelElements = document.querySelectorAll('.reel');
            let index = 0;
            for (let i = 0; i < ROWS; i++) {
                for (let j = 0; j < COLS; j++) {
                    reelElements[index].textContent = rows[i][j];
                    index++;
                }
            }
        }

        function showMessage(text, type) {
            const messageDiv = document.getElementById('message');
            messageDiv.textContent = text;
            messageDiv.className = 'message ' + type;
        }

        async function spinSlots() {
            if (isSpinning) return;

            const lines = parseInt(document.getElementById('linesSelect').value);
            const bet = parseFloat(document.getElementById('betInput').value);
            const totalBet = bet * lines;

            if (isNaN(bet) || bet <= 0) {
                alert('Please enter a valid bet amount!');
                return;
            }

            if (totalBet > balance) {
                alert('Insufficient balance! Your total bet ($' + totalBet.toFixed(2) + ') exceeds your balance ($' + balance.toFixed(2) + ')');
                return;
            }

            isSpinning = true;
            document.getElementById('spinButton').disabled = true;
            balance -= totalBet;
            document.getElementById('balance').textContent = balance.toFixed(2);
            document.getElementById('message').textContent = '';

            playSpinSound();

            const reelElements = document.querySelectorAll('.reel');
            const symbols = ['A', 'B', 'C', 'D'];
            
            reelElements.forEach(reel => {
                reel.classList.add('spinning');
            });

            let tickCount = 0;
            const spinInterval = setInterval(() => {
                reelElements.forEach(reel => {
                    reel.textContent = symbols[Math.floor(Math.random() * symbols.length)];
                });
                if (tickCount % 2 === 0) {
                    playTickSound();
                }
                tickCount++;
            }, 50);

            await new Promise(resolve => setTimeout(resolve, 1500));
            clearInterval(spinInterval);

            const reels = spin();
            const rows = transpose(reels);
            displayReels(rows);

            reelElements.forEach(reel => reel.classList.remove('spinning'));

            const winnings = getWinnings(rows, bet, lines);
            balance += winnings;
            document.getElementById('balance').textContent = balance.toFixed(2);

            if (winnings > 0) {
                playWinSound();
                showMessage('🎉 WINNER! YOU WON $' + winnings.toFixed(2) + '! 🎉', 'win');
            } else {
                showMessage('No win this time. Try again!', 'lose');
            }

            if (balance <= 0) {
                showMessage('GAME OVER! Out of credits. Cash out to start new game.', 'lose');
                document.getElementById('spinButton').disabled = true;
            } else {
                document.getElementById('spinButton').disabled = false;
            }

            isSpinning = false;
        }

        function resetGame() {
            if (balance > 0) {
                alert('Cashing out $' + balance.toFixed(2) + '. Thanks for playing!');
            }
            balance = 0;
            document.getElementById('depositInput').value = '';
            document.getElementById('betInput').value = '';
            document.getElementById('linesSelect').value = '1';
            document.getElementById('message').textContent = '';
            document.getElementById('spinButton').disabled = false;
            
            const reelElements = document.querySelectorAll('.reel');
            reelElements.forEach(reel => reel.textContent = '🎰');
            
            document.querySelector('.game-screen').classList.remove('active');
            document.querySelector('.setup-screen').classList.add('active');
        }

        // Event Listeners
        document.getElementById('soundToggle').addEventListener('click', toggleSound);
        document.getElementById('startButton').addEventListener('click', startGame);
        document.getElementById('spinButton').addEventListener('click', spinSlots);
        document.getElementById('cashOutButton').addEventListener('click', resetGame);
        document.getElementById('linesSelect').addEventListener('change', updateLineIndicators);
    