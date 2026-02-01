/* ===== Fundal inimioare ===== */
const heartCanvas = document.getElementById('heartCanvas');
const hCtx = heartCanvas.getContext('2d');

function resizeCanvas(){
  const dpr = window.devicePixelRatio || 1;
  heartCanvas.width = window.innerWidth * dpr;
  heartCanvas.height = window.innerHeight * dpr;
  heartCanvas.style.width = window.innerWidth + "px";
  heartCanvas.style.height = window.innerHeight + "px";
  hCtx.setTransform(dpr,0,0,dpr,0,0);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Heart {
  constructor() {
    this.x = Math.random() * heartCanvas.width;
    this.y = Math.random() * -heartCanvas.height;
    this.size = Math.random() * 20 + 10;
    this.speed = Math.random() * 2 + 1;
    this.opacity = Math.random() * 0.3 + 0.1;
  }
  draw() {
    hCtx.fillStyle = `rgba(255, 0, 128, ${this.opacity})`;
    hCtx.beginPath();
    const x = this.x, y = this.y, s = this.size/2;
    hCtx.moveTo(x, y+s);
    hCtx.bezierCurveTo(x,y,x-s,y,x-s,y-s);
    hCtx.bezierCurveTo(x-s,y-2*s,x,y-2*s,x,y-s);
    hCtx.bezierCurveTo(x,y-2*s,x+s,y-2*s,x+s,y-s);
    hCtx.bezierCurveTo(x+s,y,x,y,x,y+s);
    hCtx.fill();
  }
  update() {
    this.y += this.speed;
    if(this.y > heartCanvas.height) this.y = -this.size;
    this.draw();
  }
}

const hearts = [];
for(let i=0;i<50;i++) hearts.push(new Heart());
function animateHearts() { 
  hCtx.clearRect(0,0,heartCanvas.width,heartCanvas.height);
  hearts.forEach(h => h.update());
  requestAnimationFrame(animateHearts);
}
animateHearts();

/* ===== Valentine Screen ===== */
const valentineScreen=document.getElementById('valentineScreen');
const yesBtn=document.getElementById('yesBtn');
const noBtn=document.getElementById('noBtn');
const homeScreen=document.getElementById('homeScreen');

/* ----- BUTON NU ----- */
noBtn.addEventListener('click', () => {
  const currentSize = parseInt(window.getComputedStyle(yesBtn).fontSize);
  yesBtn.style.fontSize = (currentSize + 4) + "px";

  noBtn.style.position = "absolute";
  noBtn.style.top = Math.random()*70+"%";
  noBtn.style.left = Math.random()*75+"%";

  const rect = noBtn.getBoundingClientRect();
  const msg = document.createElement("div");
  msg.textContent = "Upss, nu ai nimerit 😌💖";
  msg.style.position = "fixed";
  msg.style.top = (rect.top - 30 + Math.random()*10) + "px";
  msg.style.left = (rect.left + rect.width/2 + (Math.random()*20-10)) + "px";
  msg.style.fontSize = "1.4em";
  msg.style.fontWeight = "700";
  msg.style.color = "#ff3f70";
  msg.style.textShadow = "0 0 6px white";
  msg.style.opacity = 0;
  msg.style.pointerEvents = "none";
  msg.style.zIndex = 999;
  document.body.appendChild(msg);
  msg.animate([
    {opacity:0, transform:"translate(0,0)"},
    {opacity:1, transform:"translate(0,-15px)"},
    {opacity:0, transform:"translate(0,-35px)"}
  ],{duration:1200,easing:"ease-out"});
  setTimeout(()=>msg.remove(),1200);

  for(let i=0;i<8;i++){
    const heart=document.createElement("div");
    heart.textContent="💖";
    heart.style.position="fixed";
    heart.style.left=(rect.left+rect.width/2+Math.random()*20-10)+"px";
    heart.style.top=(rect.top+rect.height/2+Math.random()*20-10)+"px";
    heart.style.fontSize=(Math.random()*20+10)+"px";
    heart.style.opacity=0.8;
    heart.style.pointerEvents="none";
    heart.style.zIndex=999;
    document.body.appendChild(heart);
    const animX=Math.random()*60-30;
    const animY=Math.random()*-100-20;
    const rot=Math.random()*360;
    heart.animate([
      {transform:`translate(0,0) rotate(0deg)`,opacity:1},
      {transform:`translate(${animX}px,${animY}px) rotate(${rot}deg)`,opacity:0}
    ],{duration:1000,easing:"ease-out"});
    setTimeout(()=>heart.remove(),1000);
  }
});

/* ----- BUTON DA ----- */
yesBtn.addEventListener('click',()=>{
  yesBtn.style.transition='transform 0.2s ease, box-shadow 0.4s ease';
  yesBtn.style.transform='scale(1.2)';
  yesBtn.style.boxShadow='0 0 30px #ff6f91,0 0 60px #ff3f70,0 0 90px #ff6f91';
  setTimeout(()=>{
    yesBtn.style.transform='scale(1)';
    yesBtn.style.boxShadow='0 6px 15px rgba(0,0,0,0.25)';
    valentineScreen.classList.add('hidden');
    homeScreen.classList.remove('hidden');
  },600);

  const rect=yesBtn.getBoundingClientRect();
  for(let i=0;i<10;i++){
    const h=document.createElement('div');
    h.textContent='💖';
    h.style.position='fixed';
    h.style.left=(rect.left+rect.width/2+Math.random()*40-20)+'px';
    h.style.top=(rect.top+rect.height/2+Math.random()*40-20)+'px';
    h.style.fontSize=(Math.random()*25+15)+'px';
    h.style.opacity=0.9;
    h.style.zIndex=999;
    h.style.pointerEvents='none';
    document.body.appendChild(h);
    const animX=(Math.random()*120-60);
    const animY=(Math.random()*-200-50);
    h.animate([{transform:`translate(0,0) rotate(0deg)`,opacity:1},{transform:`translate(${animX}px,${animY}px) rotate(${Math.random()*360}deg)`,opacity:0}],{duration:1200,easing:'ease-out'});
    setTimeout(()=>h.remove(),1200);
  }
});

/* ===== Home Buttons & Navigation ===== */
const timeBtn=document.getElementById('timeBtn');
const loveBtn=document.getElementById('loveBtn');
const quoteBtn=document.getElementById('quoteBtn');
const puzzleBtn=document.getElementById('puzzleBtn');
const timeScreen=document.getElementById('timeScreen');
const loveScreen=document.getElementById('loveScreen');
const quoteScreen=document.getElementById('quoteScreen');
const puzzleScreen=document.getElementById('puzzleScreen');
const backBtns=document.querySelectorAll('.backBtn');

timeBtn.addEventListener('click',()=>showScreen(timeScreen));
loveBtn.addEventListener('click',()=>showScreen(loveScreen));
quoteBtn.addEventListener('click',()=>showScreen(quoteScreen));
puzzleBtn.addEventListener('click',()=>showScreen(puzzleScreen));
backBtns.forEach(btn=>btn.addEventListener('click',()=>{hideAllScreens(); homeScreen.classList.remove('hidden');}));
function showScreen(screen){hideAllScreens(); screen.classList.remove('hidden');}
function hideAllScreens(){document.querySelectorAll('.screen').forEach(s=>s.classList.add('hidden'));}

/* ===== Digital Counter ===== */
const timeCounter=document.getElementById('timeCounter');
function updateTime(){
  const startDate=new Date('2025-06-01T00:00:00');
  const now=new Date();
  let diff=now-startDate;
  const seconds=Math.floor(diff/1000%60);
  const minutes=Math.floor(diff/1000/60%60);
  const hours=Math.floor(diff/1000/60/60%24);
  const daysTotal=Math.floor(diff/1000/60/60/24);
  const years=Math.floor(daysTotal/365);
  const months=Math.floor((daysTotal%365)/30);
  const days=(daysTotal%365)%30;
  const pad=n=>n.toString().padStart(2,'0');
  timeCounter.innerHTML=`${pad(years)}y : ${pad(months)}m : ${pad(days)}d : ${pad(hours)}h : ${pad(minutes)}m : ${pad(seconds)}s`;
}
setInterval(updateTime,1000);

/* ===== Slider vertical cu inimioara ===== */
const sliderContainer = document.getElementById("sliderContainer");
const heartPointer = document.getElementById("heartPointer");
const loveMessageP = document.getElementById("loveMessage");
const totalSteps = 8;
const stepMessages = [
  "Urcă bara mai sus, bubu, te iubesc! ❤️",
  "Te ador puțin 😘",
  "Doar atât? 😏",
  "Hmm… mai mult? 💕",
  "Perfect! 😍",
  "Foarte mult! 💖",
  "Wow! Te iubesc mult! 🥰",
  "Și eu te iubesc etern, Bubu ❤️"
];
const sliderStepsEl = document.getElementById("sliderSteps");
sliderStepsEl.innerHTML = "";
for(let i=0;i<totalSteps;i++){
  const step = document.createElement("div");
  sliderStepsEl.appendChild(step);
}

let currentStep = 0;
updateHeartPosition();
let isDragging = false;

heartPointer.addEventListener("mousedown",()=>{isDragging=true;});
window.addEventListener("mouseup",()=>{isDragging=false;});
window.addEventListener("mousemove",(e)=>{
  if(!isDragging) return;
  const rect = sliderContainer.getBoundingClientRect();
  let y = rect.bottom - e.clientY;
  y = Math.max(0, Math.min(rect.height, y));
  currentStep = Math.round(y / (rect.height/(totalSteps-1)));
  updateHeartPosition();
});

/* Touch support iPhone */
heartPointer.addEventListener("touchstart",()=>{isDragging=true; navigator.vibrate?.(30);});
window.addEventListener("touchend",()=>{isDragging=false;});
window.addEventListener("touchmove",(e)=>{
  if(!isDragging) return;
  const t = e.touches[0];
  const rect = sliderContainer.getBoundingClientRect();
  let y = rect.bottom - t.clientY;
  y = Math.max(0, Math.min(rect.height, y));
  currentStep = Math.round(y / (rect.height/(totalSteps-1)));
  updateHeartPosition();
},{passive:true});

function updateHeartPosition(){
  const containerHeight = sliderContainer.clientHeight;
  const stepHeight = containerHeight / (totalSteps-1);
  heartPointer.style.bottom = `${currentStep*stepHeight}px`;
  loveMessageP.textContent = stepMessages[currentStep];
  if(currentStep <= 2){ loveMessageP.style.fontSize = "1.8em"; }
  else if(currentStep <= 5){ loveMessageP.style.fontSize = "1.6em"; }
  else { loveMessageP.style.fontSize = "1.4em"; }
}

/* ===== Citate ===== */
const quoteMessage=document.getElementById('quoteMessage');
const myQuotes=["Bubu, mă faci cel mai fericit băiat.","Bubu, te iubesc enorm și ești minunată.","Bubu, zâmbetul tău e locul meu preferat.","Bubu, îmi faci fiecare zi mai frumoasă."];
const autoQuotes=["Ești magică, bubu!","Bubu, fiecare moment cu tine contează.","Bubu, ești cea mai frumoasă parte din viața mea.","Bubu, te ador la infinit."];
let allQuotes=myQuotes.concat(autoQuotes);
quoteBtn.addEventListener('click',()=>{
  if(allQuotes.length==0) allQuotes=myQuotes.concat(autoQuotes);
  const index=Math.floor(Math.random()*allQuotes.length);
  const quote=allQuotes.splice(index,1)[0];
  quoteMessage.textContent=quote;
});

/* ===== Puzzle cu noi ===== */
const puzzleCanvas=document.getElementById('puzzleCanvas');
const puzzleMessage=document.getElementById('puzzleMessage');
const puzzleImages=[];
for(let i=1;i<=10;i++){
  const img=new Image();
  img.src=`images/${i}.jpg`;
  puzzleImages.push(img);
}
puzzleBtn.addEventListener('click',()=>drawPuzzle(puzzleImages[Math.floor(Math.random()*puzzleImages.length)]));
function drawPuzzle(img){
  const canvas=puzzleCanvas;
  const ctx=canvas.getContext('2d');
  canvas.width=400; canvas.height=400;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const pieceCount=4;
  const pieceSize=canvas.width/pieceCount;
  for(let y=0;y<pieceCount;y++){
    for(let x=0;x<pieceCount;x++){
      const sx=x*pieceSize;
      const sy=y*pieceSize;
      ctx.drawImage(img,sx,sy,pieceSize,pieceSize,Math.random()*(canvas.width-pieceSize),Math.random()*(canvas.height-pieceSize),pieceSize,pieceSize);
    }
  }
  puzzleMessage.textContent="Noi doi. De fiecare dată, compleți ❤️";
}
