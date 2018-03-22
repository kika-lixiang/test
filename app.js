function handleShare() { 
  document.getElementById('share').style.display = "block"
}

// window.adCount = 0
function handleRetrun() { 
  // console.log('返回')
  // document.getElementById('share').style.display = "none"
  // if(window.adCount) document.getElementById('mask').style.display = "block"
  // window.adCount ++
  // // f()
}
function handleDie() { 
  console.log('返回')
  document.getElementById('share').style.display = "none"
  // if(window.adCount) 
  setTimeout(function() {
    document.getElementById('mask').style.display = "block"
  }, 1000)
  // window.adCount ++
  // f()
}

function handleSupport() { 
  document.getElementById('mask').style.display = "block" 
  // f()
}