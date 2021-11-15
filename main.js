function hz_pitch() {
  console.log('enter');
  const audioContext = new window.AudioContext();
  const analyser = audioContext.createAnalyser();

  const constraints = {
      'audio': true
  }
  navigator.mediaDevices.getUserMedia(constraints)
  .then(stream => {
      console.log('Got MediaStream:', stream);
      audioContext.createMediaStreamSource(stream).connect(analyser)
  })
  .catch(error => {
      console.error('Error accessing media devices.', error);
  });
  
  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  // canvas stuff
  var canvasEl2 = document.getElementById("myCanvas");
  const canvasContext = canvasEl2.getContext('2d');
  canvasContext.fillStyle = 'firebrick';

  canvasBox=document.querySelector('#canvasBox'); // get div


  record=setInterval(() => {
    canvasContext.clearRect(0, 0, canvasEl2.width, canvasEl2.height);
    analyser.getByteTimeDomainData(dataArray);
    console.log(dataArray);

    // canvas 2
    var canvasEl = document.createElement("CANVAS");
    let canvasContext2 = canvasEl.getContext('2d');
    canvasContext2.fillStyle = 'firebrick';

    // canvasEl.append('width', '1000px');

    dataArray.forEach((item, i) => {

      canvasContext.fillRect(i, item, 1, 1);
      canvasContext2.fillRect(i, item, 1, 1);

    });
    canvasBox.append(canvasEl);
  }, 100);

}

function print_welcome(){
  document.querySelector('#container').innerHTML=`      <div class="d-flex flex-column min-vh-100 justify-content-center align-items-center">
  <div class="cover-container text-center">
    <main class="px-3">
      <h1>PROJECT.</h1>
      <p class="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem veritatis dolorem aliquam rem nesciunt. 
        Nemo facilis suscipit, voluptatibus earum, nisi harum nobis qui aliquam deleniti quos cum at excepturi assumenda.</p>
      <p class="lead">
        <a id="home_link2" href="#" class="btn btn-lg btn-secondary fw-bold border-white bg-white">Enter</a>
      </p>
    </main>
  </div>
</div>`;
}

function print_sheets(){
  document.querySelector('#container').innerHTML=`<h1>My sheets</h1>
  <div class="container m-2">
  <div class="card" style="width: 18rem;">
      <img src="example-sheet.jpg" class="card-img-top" alt="example-sheet">
      <div class="card-body bg-dark">
        <h5 class="card-title">Sheet 1</h5>
        <p class="card-text">Andreu Micó</p>
        <a href="#" class="btn btn-primary">Play it</a>
      </div>
  </div>
  </div>`;
}

function print_compose(){
  document.querySelector('#container').innerHTML=`<div style='position: absolute'>
  <h1>TESTS</h1>
  <div id="test_div"></div>
  <canvas id="myCanvas" width="1000px" height="100px"></canvas>
  <div id="canvasBox"></div>
  </div>`;
  hz_pitch();
}

function print_stave(){

  // container
  let container=document.querySelector('#container');
  container.innerHTML='';

  // div
  let div = document.createElement('div');
  div.id='boo';
  container.append(div);
  div.style.backgroundColor='white';

  //BASIC VF

  // VF = Vex.Flow;

  // // Create an SVG renderer and attach it to the DIV element named "boo".
  // // var div = document.getElementById("boo")
  // var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
  
  // // Configure the rendering context.
  // renderer.resize(500, 500);
  // var context = renderer.getContext();
  // context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
  
  // // Create a stave of width 400 at position 10, 40 on the canvas.
  // var stave = new VF.Stave(10, 40, 400);
  
  // // Add a clef and time signature.
  // stave.addClef("treble").addTimeSignature("4/4");
  
  // // Connect it to the rendering context and draw!
  // stave.setContext(context).draw();

  // Create an SVG renderer and attach it to the DIV element named "boo".


  // EASY VF

  // var vf = new Vex.Flow.Factory({renderer: {elementId: 'boo'}});
  // var score = vf.EasyScore();
  // var system = vf.System();

  // system.addStave({
  //   voices: [
  //     score.voice(score.notes('C#5/q, B4, A4, G#4', {stem: 'up'})),
  //     score.voice(score.notes('C#4/h, C#4', {stem: 'down'}))
  //   ]
  // }).addClef('treble').addTimeSignature('4/4');
  
  
  // vf.draw();


  // COMPLEX VF
  
  let VF = Vex.Flow;

  
  var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

  // Size our SVG:
  renderer.resize(10000, 700); // space to print notes

  // And get a drawing context:
  var context = renderer.getContext();



  // measure 1
  var staveMeasure1 = new Vex.Flow.Stave(10, 0, 300);
  staveMeasure1.addClef("treble").setContext(context).draw();

  var notesMeasure1 = [
    new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),
    new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "q" }),
    new Vex.Flow.StaveNote({ keys: ["e/4"], duration: "q" }),
    new Vex.Flow.StaveNote({ keys: ["f/4"], duration: "q" }),
  ];

  // Helper function to justify and draw a 4/4 voice
  Vex.Flow.Formatter.FormatAndDraw(context, staveMeasure1, notesMeasure1);



  // measure 2 - juxtaposing second measure next to first measure
  var staveMeasure2 = new Vex.Flow.Stave(
    staveMeasure1.width + staveMeasure1.x,
    0,
    300
  );
  staveMeasure2.setContext(context).draw();

  var notesMeasure2_1 = [
    new Vex.Flow.StaveNote({ keys: ["C/4"], duration: "8" }),
    new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "8" }),
    new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "8" }),
    new Vex.Flow.StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "8" }),
  ];

  var notesMeasure2_2 = [
    new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "8" }),
    new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "8" }),
    new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "8" }),
    new Vex.Flow.StaveNote({ keys: ["c/4", "e/4", "g/4"], duration: "8" }),
  ];


  // create the beams for 8th notes in 2nd measure
  var beam1 = new Vex.Flow.Beam(notesMeasure2_1);
  var beam2 = new Vex.Flow.Beam(notesMeasure2_2);

  var notesMeasure2 = notesMeasure2_1.concat(notesMeasure2_2);

  Vex.Flow.Formatter.FormatAndDraw(context, staveMeasure2, notesMeasure2);

  // measure x

  var staveMeasurex = new Vex.Flow.Stave(
    staveMeasure2.width + staveMeasure2.x, // x position
    0, // position y
    300 // space between notes
  );

  // create note-buttons

  var notesMeasurex = [];

  let notes = 'A,B,C,D,E,F,G'.split(',');
  notes.forEach(note => {
    let btn_stave = document.createElement('a');
    btn_stave.id=note;
    btn_stave.innerText=note;
    btn_stave.classList.add('btn','btn-dark');
    container.append(btn_stave);
    let group;

    // function print note
    btn_stave.addEventListener('click', function () {
      // context.svg.removeChild(context.svg.lastChild); // not work, print above 

      if (notesMeasurex.length>3) {
        staveMeasurex = new Vex.Flow.Stave(
          staveMeasure2.width*2 + staveMeasure2.x, // x position
          0, // position y
          300 // space between notes
        );
        notesMeasurex = [];
        console.log("enter ", staveMeasure2.width + staveMeasure2.x);
      }else{
        if (typeof group !== 'undefined') {
          context.svg.removeChild(group);
        }
      }

      notesMeasurex.push(new Vex.Flow.StaveNote({ keys: [""+this.id+"/4"], duration: "q" }));

      group = context.openGroup();

      staveMeasurex.setContext(context).draw(); // print stave
      Vex.Flow.Formatter.FormatAndDraw(context, staveMeasurex, notesMeasurex); // print notes
      context.closeGroup();

        
    })
    
  });

    // Render beams
    beam1.setContext(context).draw();
    beam2.setContext(context).draw();
  
}



document.addEventListener('DOMContentLoaded', function(){
  // print_welcome();
  record="";
  document.querySelector('#container').addEventListener('DOMNodeRemoved', ()=> clearInterval(record))
  document.querySelector('#welcome_link').addEventListener('click', print_welcome);
  document.querySelector('#sheets_link').addEventListener('click', print_sheets);
  document.querySelector('#compose_link').addEventListener('click', print_stave);
  document.querySelector('#test_link').addEventListener('click', print_compose);

  // document.querySelector('#home_link2').addEventListener('click', print_home);

});
