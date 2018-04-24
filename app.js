function handleShare() { 
  document.getElementById('share').style.display = "block"
}

// window.adCount = 0
function handleRetrun() { 
  // console.log('返回')
  document.getElementById('share').style.display = "none"
  // if(window.adCount) document.getElementById('mask').style.display = "block"
  // window.adCount ++
  // // f()
}

var startNum = 0
function handleStart() { 

    document.getElementById('cancal').addEventListener("click", function() {
      document.getElementById("mask").style.display = "none"
    })
  // console.log('返回')
  // document.getElementById('share').style.display = "none"
  // if(window.adCount) 
  // setTimeout(function() {
    if(startNum > 2 && !(startNum%2)) document.getElementById('mask').style.display = "block"
    startNum++
  // }, 1000)
  // window.adCount ++
  // f()
}
 

   