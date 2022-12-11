var started = false;
var ready = false;
var early = false;
var ended = false;
var start, end;
var time;
var ms;

document.getElementById("reactionTime").style.display = "none";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function reset() {
  var click = document.getElementById("click");
  if (ended == true) {
    started = false;
    ready = false;
    ended = false;
    click.style.backgroundColor = "#dbd9d9";
    click.style.backgroundImage = "none";
    document.getElementById("reactionTime").style.display = "none";
  }
}

async function Ready() {
  var click = document.getElementById("click");
  ms = Math.ceil(Math.random() * 2000 + 1000);
  await sleep(ms);
  if (early == false) {
    click.style.backgroundColor = '#33e629';
    ready = true;
    document.getElementById("reactionTime").style.display = "none";
    start = performance.now();
  }
}

function start_test() {
  var click = document.getElementById("click");
  if (started == false) {
    document.getElementById("reactionTime").style.display = "block";
    document.getElementById("reactionTime").style.fontSize = "2rem";
    document.getElementById("reactionTime").innerHTML = "Click when the colour has changed to green.";
    click.style.backgroundColor = '#d61a13';
    /*click.style.backgroundImage = "url('images/cat.png')";*/
    click.style.backgroundSize = "100% 100%";
    started = true;
    ready = false;
    Ready();
  }
}

async function status() {
  end = performance.now();
  var click = document.getElementById("click");
  click.style.backgroundSize = "100% 100%";
  if (ready == false && ended == false && started == true && early == false) {
    click.style.backgroundImage = null;
    document.getElementById("reactionTime").style.display = "block";
    document.getElementById("reactionTime").style.fontSize = "2rem";
    document.getElementById("reactionTime").innerHTML = "Too early! Please wait for the image to change.";
    early = true;
    await sleep(ms);
    document.getElementById("reactionTime").innerHTML = "Click when the colour has changed to green.";
    /*click.style.backgroundImage = "url('images/cat.png')";*/
    early = false;
    Ready();
  } else if (ready == true && ended == false) {
    ended = true;
    click.style.backgroundImage = null;
    time = Math.round(end - start);

    click.style.backgroundColor = '#13d644';
    click.style.backgroundImage = "url('images/sushi.png')";
    document.getElementById("reactionTime").style.display = "block";
    document.getElementById("reactionTime").innerHTML = time + " ms";
  }
}
