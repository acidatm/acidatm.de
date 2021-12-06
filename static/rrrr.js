window.addEventListener("load",function(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let color = urlParams.get('color')
  let x = urlParams.get('x')
  let y = urlParams.get('y')
  if(color && x && y){
    localStorage.setItem('rrrr', "?color=" + color + "&x=" + x  + "&y=" + y)
  }
  let b = document.createElement("div")
  b.innerText = "< Zurück zum Vierten Raum"
  b.id = "rrrrButton"
  b.addEventListener("click",function(){
    let p = localStorage.getItem("rrrr")
    window.location.href = "https://vierterraum.herokuapp.com" + (p ? p : "")
  })
  let c = document.createElement("div")
  c.id = "rrrrCurtain"
  document.head.insertAdjacentHTML("beforeend", `<style>#rrrrCurtain{position: fixed;top: 50%;left: 50%;transform: translate(-50%,-50%);width: 0%;height: 0%;outline: 10000px solid black;z-index: 1000000;transition: all 1s ease-in-out;pointer-events: none;user-select: none;}.rrrr-open #rrrrCurtain{width: 100%;height: 100%;}#rrrrButton{z-index:999999;position:fixed;top:0;left:0;background:black;color:white;font-family:monospace;font-size:12px;line-height:1em;padding:0.5em;}</style>`)
  document.body.appendChild(c)
  document.body.appendChild(b)
  setTimeout(function () {
    document.body.classList.add("rrrr-open")
  }, 500)
})
