let steps = 0
let stepAdvance = Math.random() * 0.1 + 0.005
let grain = Math.random() * 0.1 + 0.01
let symbolSelection = ['-','.','$','+','!']
let symbols = []
let content = []
let playerRunning = false
let audio = false
let fft = new p5.FFT();

window.addEventListener('load',function(){
  let scrubber = document.getElementById("scrubber")
  scrubber.value = 0
  scrubber.addEventListener("change", function(){
    audio.currentTime = scrubber.value;
  },scrubber,audio);
  audio = new Audio('audio/audio.mp3');
  audio.addEventListener("loadedmetadata", function(){
    scrubber.setAttribute('max', audio.duration);
  },scrubber,audio);
  audio.addEventListener("timeupdate", function(){
    scrubber.value = audio.currentTime;
  },scrubber,audio);
})

function play(element){
  if(audio){
    playerRunning = !playerRunning
    playerRunning ? element.classList.add('running') : element.classList.remove('running')
    playerRunning ? audio.play() : audio.pause()
  }
}

function setup(){
  for(let i = 0; i < 2; i++){
    let s = Math.floor(Math.random() * symbolSelection.length);
    symbols.push(symbolSelection[s])
    symbolSelection.splice(s, 1)
  }
  noiseSeed(new Date().value)
  frameRate(10);
  let contentContainer = document.getElementById('content')
  content = [].slice.call(contentContainer.getElementsByTagName('li'))
  contentContainer.remove()
}

function draw(){
  let container = document.getElementById('container')
  let output = ''
  let x = window.innerWidth / 3
  let y = window.innerHeight / 8
  for(let _y = 0; _y < y; _y++){
    let line = ""
    if(_y > 2 && _y - 3 < content.length){
      for(let _x = 0; _x < 3; _x++){
        let n = noise(_x*grain,_y*grain,steps);
        line += symbols[Math.floor(n * symbols.length)]
      }
      line += content[_y - 3].innerText.length > 0 ? content[_y - 3].innerHTML : ""
      for(let _x = (2 +  content[_y - 3].innerText.length); _x < x; _x++){
        let n = noise(_x*grain,_y*grain,steps);
        line += symbols[Math.floor(n * symbols.length)]
      }
    }
    else{
      for(let _x = 0; _x < x; _x++){
        let n = noise(_x*grain,_y*grain,steps);
        line += symbols[Math.floor(n * symbols.length)]
      }
    }
    output += line + "<br>"
  }
  steps += stepAdvance
  container.innerHTML = output
}
