/*DRUMMACHINE*/
function TRAM(tempo,input,symbols){
	this.TEMPO = 0
  this.TEMPOMIN = 10
  this.TEMPOMAX = 600
  this.INPUT = input
  this.SYMBOLS = symbols
  this.POSITION = 0
  this.BUFFER = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
  this.SOUNDS = []
  this.LOOP = false;
  this.init = function(){
    this.INPUT.addEventListener('input',function(){
    	this.refresh()
    }.bind(this))
    for(let symbol in this.SYMBOLS){
      this.SOUNDS.push(new Audio('/sounds/' + symbol + '.mp3'));
    }
    this.LOOP = this.createLoop(tempo)
    document.getElementById('symbols').innerText = this.SYMBOLS.join(' ')
    document.addEventListener('keydown',function(e){
      if(e.keyCode == 38){
        e.preventDefault()
        if(this.TEMPO + 1 <= this.TEMPOMAX){
          this.createLoop(this.TEMPO + 1)
        }

      }
      else if(e.keyCode == 40){
        e.preventDefault()
        if(this.TEMPO - 1 >= this.TEMPOMIN){
          this.createLoop(this.TEMPO - 1)
        }
      }
    }.bind(this))

  }
  this.refresh = function(){
    this.BUFFER = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
    let input = this.INPUT.value.split('\n').map(x => x.split(''));
    for(let line in input){
      if (input[line].length > 16){
        input[line].splice(16)

      }
      for(let symbol in input[line]){
        if(this.SYMBOLS.includes(input[line][symbol])){
          this.BUFFER[Math.floor(16 / input[line].length) * symbol].push(this.SYMBOLS.indexOf(input[line][symbol]))
        }
      }
    }
    input = input.map(x => x.join(''));
    this.INPUT.value = input.join('\n')
  }
  this.createLoop = function(tempo){
    this.TEMPO = tempo
    document.getElementById('bpm').innerText = tempo
    this.POSITION = 0
    if(this.LOOP){
      clearInterval(this.LOOP)
    }
    this.LOOP = setInterval(function () {
      this.play()
      this.POSITION++
    }.bind(this), 15000 / this.TEMPO);
  }
  this.play = function(){
    let position = this.POSITION % 16
    for(let sample in this.BUFFER[position]){
      this.SOUNDS[this.BUFFER[position][sample]].pause()
      this.SOUNDS[this.BUFFER[position][sample]].currentTime = 0;
      this.SOUNDS[this.BUFFER[position][sample]].play()
    }
  }
}

/*RUNTIME*/
window.addEventListener('load',function(){
  const symbols = [".",",",":",";","$","%","§","&","<",">","+","*","~","⁼","|"]
  const input = document.getElementById('input')
  const drummachine = new TRAM(128,input,symbols)
  drummachine.init()
})
