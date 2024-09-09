const items = document.querySelectorAll('[draggable="true"]');
const target = document.getElementById('target');
let apple_count = 1;
let cropYield = 3;
let totalTime = 90;
let isPlanted = false;
let isSendCoint = false;
let growthStage = 1;

function changeAppleQuantity() {
    document.getElementById('apple_count').textContent = apple_count;
}
changeAppleQuantity();

function changeYield(number) {
    document.getElementById('yield').textContent = number;
}
changeYield(cropYield);

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function changeTimer(time) {
    document.getElementById('timer').textContent = time;
}

function startTimer() {
    const timerInterval = setInterval(() => {
        totalTime--;
        changeTimer(formatTime(totalTime));

        if (totalTime <= 0) {
            clearInterval(timerInterval);
        }
    }, 1000); // Update every second
}

items.forEach(item => {
    item.addEventListener('dragstart', dragStart);
});

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

target.addEventListener('dragover', (e) => {
    e.preventDefault();
});

target.addEventListener('drop', (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');

    if (id === 'apple') {
        spawnTree();
    } else if (id === 'water' || id === 'fertilizer') {
        increaseYield();
    }
});

function spawnTree() {
    if (apple_count == 0 || isPlanted) return;

    isPlanted = true;
    startTimer();
    apple_count--;
    changeAppleQuantity();
    const tree = document.createElement('img');
    tree.src = './asset/farm-asset-tree-1.png';
    tree.style.width = '6vw';
    tree.style.height = '10vw';
    tree.style.position = 'absolute';
    tree.style.bottom = '0';
    tree.style.left = '50%';
    tree.style.transform = 'translateX(-50%)';
    target.appendChild(tree);

    const growTree = setInterval(() => {
        growthStage++;
        if (growthStage === 2) {
            tree.src = './asset/farm-asset-tree-2.png';
            tree.style.width = '15vw';
            tree.style.height = '20vw';
        } else if (growthStage === 3) {
            tree.src = './asset/farm-asset-tree-3.png';
            tree.style.width = '30vw';
            tree.style.height = '40vw';
        } else if (growthStage === 4) {
            tree.src = './asset/farm-asset-tree-4.png';
            clearInterval(growTree);
            tree.addEventListener('click', harvestApple);
        }
    }, 30000); // 1 minute 30 seconds
}

function increaseYield() {
    if(growthStage==4 || !isPlanted)
        return

    cropYield += 3;
    changeYield(cropYield);
}

function harvestApple(e) {
    apple_count += cropYield;
    totalTime = 90;
    cropYield = 3
    isPlanted = false;
    changeAppleQuantity();
    changeYield(3);
    document.getElementById("send-btn").style = "background-color: brown; display: inherite;";
    e.target.remove();
    e.target.removeEventListener('click', harvestApple);
    growthStage = 1;
}

function showFormSentTo(){
    if(!isSendCoint){
        document.getElementById("formSentTo").style = "color: white; display: inherite;"
        document.getElementById("send-btn").textContent = "Cancel";
        isSendCoint = true;
    }
    else{
        document.getElementById("formSentTo").style = "color: white; display: none;"
        document.getElementById("send-btn").textContent = "Send NFT";
        isSendCoint = false;
    }
}

async function sendCoin(){
    const address = document.getElementById("sendCoinAddress").value;

    document.getElementById("message_send").textContent = "Transaction successfully"
    document.getElementById("send-btn").style = "display: none;";

    document.getElementById("sendCoinAddress").value = "";
}