// ゲームの状態管理
let clickCount = 0;
let lightCount = 0;

// DOM要素の取得
const gameButton = document.getElementById('gameButton');
const clickCountElement = document.getElementById('clickCount');
const lightCountElement = document.getElementById('lightCount');

// ボタンクリック時の処理
gameButton.addEventListener('click', function() {
    // クリック回数を増やす
    clickCount++;
    clickCountElement.textContent = clickCount;

    // 10%の確率で光る（10回に1回）
    const shouldLight = Math.random() < 0.1;

    if (shouldLight) {
        // 光った回数を増やす
        lightCount++;
        lightCountElement.textContent = lightCount;

        // ランダムに赤か青を選ぶ
        const isRed = Math.random() < 0.5;
        const lightClass = isRed ? 'light-red' : 'light-blue';

        // ボタンを光らせる
        gameButton.classList.add(lightClass);
        gameButton.textContent = isRed ? '赤！' : '青！';

        // 1秒後に元に戻す
        setTimeout(() => {
            gameButton.classList.remove(lightClass);
            gameButton.textContent = '押してね！';
        }, 1000);
    }
});
