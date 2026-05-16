document.addEventListener("DOMContentLoaded", () => {
const pages = {
home: document.getElementById("homeSection"),
reward: document.getElementById("rewardSection"),
market: document.getElementById("marketSection"),
profile: document.getElementById("profileSection")
};

const navButtons = {
home: document.getElementById("homeBtn"),
reward: document.getElementById("rewardBtn"),
market: document.getElementById("marketBtn"),
profile: document.getElementById("profileBtn")
};

function showPage(page){
Object.values(pages).forEach(section => section.classList.remove("active-page"));
pages[page].classList.add("active-page");
Object.values(navButtons).forEach(btn => btn.classList.remove("active-nav"));
navButtons[page].classList.add("active-nav");
window.scrollTo({top:0,behavior:"smooth"});
}

navButtons.home.onclick = () => showPage("home");
navButtons.reward.onclick = () => showPage("reward");
navButtons.market.onclick = () => showPage("market");
navButtons.profile.onclick = () => showPage("profile");

const popup = document.getElementById("popup");
function showPopup(msg){
popup.innerText = msg;
popup.classList.add("show");
setTimeout(() => popup.classList.remove("show"), 2000);
}

document.querySelectorAll(".popup-btn").forEach(button => {
button.addEventListener("click", () => showPopup("Service disponible bientôt"));
});

// Accordion
document.querySelectorAll(".accordion-header").forEach(header => {
header.addEventListener("click", () => {
const item = header.parentElement;
item.classList.toggle("active");
});
});

const rankBadge = document.getElementById("rankBadge");
const levelText = document.getElementById("levelText");
const levelPercent = document.getElementById("levelPercent");
const rankModal = document.getElementById("rankModal");
const closeRank = document.getElementById("closeRank");

let userLevel = 1;
let userXP = 1;
let userId = "BCC9876543";
let mainBalance = 0;
let rewardBalance = 0;
let multiplier = 1;
let isSpinning = false;

function updateRank(){
let rank = "🥉 Bronze";
if(userLevel >= 16 && userLevel <= 30) rank = "🥈 Silver";
else if(userLevel >= 31 && userLevel <= 45) rank = "🥇 Gold";
else if(userLevel >= 50) rank = "💎 Diamond";
rankBadge.innerText = rank;
levelText.innerText = `Niveau ${userLevel}`;
levelPercent.innerText = `${userXP}%`;
}

rankBadge.addEventListener("click", () => rankModal.classList.remove("hidden"));
closeRank.addEventListener("click", () => rankModal.classList.add("hidden"));

document.getElementById("notifBtn").addEventListener("click", () => {
showPopup("Aucune notification");
});

const balanceText = document.getElementById("balanceText");
const cfaText = document.getElementById("cfaText");
const toggleBalance = document.getElementById("toggleBalance");
let visible = true;

toggleBalance.addEventListener("click", () => {
visible =!visible;
if(visible){
balanceText.innerText = mainBalance;
cfaText.innerText = `≈ ${mainBalance * 5} CFA`;
toggleBalance.innerHTML = '<i class="fa-regular fa-eye"></i>';
}else{
balanceText.innerText = "••••";
cfaText.innerText = "••••";
toggleBalance.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
}
});

function updateBalances(){
balanceText.innerText = mainBalance;
cfaText.innerText = `≈ ${mainBalance * 5} CFA`;
document.getElementById("rewardBalanceText").innerText = rewardBalance;
document.getElementById("rewardCfaText").innerText = `≈ ${rewardBalance * 5} CFA`;
}

// Transfert récompenses
document.getElementById("transferRewardBtn").addEventListener("click", () => {
if(rewardBalance > 0){
mainBalance += rewardBalance;
rewardBalance = 0;
updateBalances();
showPopup("Récompenses transférées!");
}else{
showPopup("Aucune récompense à transférer");
}
});

// Roue de la chance
const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const rewards = [0, 2, 10, 15, 20, 50];
let rotation = 0;

spinBtn.addEventListener("click", () => {
if(isSpinning) return;
isSpinning = true;
spinBtn.disabled = true;

const randomIndex = Math.floor(Math.random() * rewards.length);
const degrees = 360 * 5 + (360 - randomIndex * 60) + 30;
rotation += degrees;
wheel.style.transform = `rotate(${rotation}deg)`;

setTimeout(() => {
const win = rewards[randomIndex];
if(win === 0){
showPopup("Dommage, 0 B
