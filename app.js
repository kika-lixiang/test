 

var startNum = 0
function handleRestart() { 

    document.getElementById('cancal').addEventListener("click", function(e) {
      document.getElementById("mask").style.display = "none" 
    }) 
    if(startNum > 1) document.getElementById('mask').style.display = "block"
    startNum++ 
}
 
function handleReward() { 
 
    setTimeout(function() {
      document.getElementById('mask').style.display = "block"
    }, 2500)

}


 
 

   