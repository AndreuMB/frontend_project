export { print_stave };
import {
  fromEvent,
  throttleTime
} from "rxjs";
import Vex from 'vexflow';

function print_stave(){

  // container
  let container=document.querySelector('#container');
  container.innerHTML='';

  if ((sessionStorage.getItem("sheet") != "") && (sessionStorage.getItem("sheet") != null)) {
    let url = "https://daw2022-64f58-default-rtdb.europe-west1.firebasedatabase.app/users/";
    console.log(url + sessionStorage.getItem("localId") + "/sheets/"+sessionStorage.getItem("sheet")+".json?auth="+sessionStorage.getItem("idToken"));
    fetch(url + sessionStorage.getItem("localId") + "/sheets/"+sessionStorage.getItem("sheet")+".json?auth="+sessionStorage.getItem("idToken"))
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      container.innerHTML+="<h1>"+data.title+"</h1>";
      print_stave2();
      let btn_save = document.createElement('btn');
      btn_save.innerText="Save";
      btn_save.classList.add("btn", "btn-primary");
      container.append(btn_save);
      sessionStorage.setItem("sheet", "");
      btn_save.addEventListener('click', save_sheet);

    })
  }else{
    print_stave2();
  }
}

function print_stave2(){

  // container
  let container=document.querySelector('#container');

  // div
  let div = document.createElement('div');
  div.id='stave_container';
  container.append(div);
  div.style.backgroundColor='white';


  // COMPLEX VF

  let VF = Vex.Flow;
  let notesStave=[];


  let renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

  // Size our SVG:
  renderer.resize(div.offsetWidth, 700); // space to print notes

  // And get a drawing context:
  let context =renderer.getContext();

  // ini vars
  var notesMeasurex = [];
  let time = 1; // musical time where start
  let y=0; // lines
  let stave = [];
  let group = "";

  // Resize SVG
  // Observable
  const resizeObservable = fromEvent(window, "resize").pipe(throttleTime(100));

  resizeObservable.subscribe((e) => {
    console.log("renderer " + renderer.getContext().width);
    console.log("div width" + div.offsetWidth);
    // Size our SVG:
    renderer.resize(div.offsetWidth, 700); // width space to print notes resize(x,y)
    // console.log("group = " + print_stave_resize(notesStave,context));
    let data = print_stave_resize(notesStave,context,renderer);
    group = data.group;
    staveMeasurex = data.staveMeasurex;
  })

  // window.addEventListener('resize', function(){


  // })

  // measure x

  // set stave position
  var staveMeasurex = new Vex.Flow.Stave(10,0,300);

  staveMeasurex.addClef("treble").addTimeSignature("4/4");
  staveMeasurex.setContext(context).draw(); // print stave


  // let groupStave;
  // groupStave = context.openGroup();


  // create note-buttons
  let notes = 'A,B,C,D,E,F,G'.split(',');
  notes.forEach(note => {
    let btn_stave = document.createElement('a');
    btn_stave.id=note;
    btn_stave.innerText=note;
    btn_stave.classList.add('btn','btn-dark');
    container.append(btn_stave);

    // function print note
    btn_stave.addEventListener('click', function print_note() {
    // context.svg.removeChild(context.svg.lastChild); // not work, print above 
    if (notesMeasurex.length>3) {
        // if (time%5==0) { // 5 = static of times per line
        if (staveMeasurex.width + staveMeasurex.x>div.offsetWidth-300) { // change line
          console.log("enter change line");
          staveMeasurex.y = staveMeasurex.y + 100;
          time=0;
          staveMeasurex = new Vex.Flow.Stave(10, staveMeasurex.y, 300);
          staveMeasurex.addClef("treble");
          console.log("heigth div = " + div.offsetHeight);
          console.log("heigth steave = " + staveMeasurex.y);

          if (staveMeasurex.y>=div.offsetHeight) {
            console.log("resize div");
            renderer.resize(div.offsetWidth, div.offsetHeight+100); // width space to print notes
          }

        }else{
        staveMeasurex = new Vex.Flow.Stave(
            staveMeasurex.width + staveMeasurex.x, // x position
            staveMeasurex.y, // position y
            300 // space between notes
        );
        console.log("staveMeasurex = "+staveMeasurex.x);
        }

        stave.push(notesMeasurex); // save time

        staveMeasurex.setContext(context).draw(); // print stave
        notesMeasurex = []; // empty time
        console.log("enter " + "staveMeasurex.width " + staveMeasurex.width +' staveMeasurex.x '+ staveMeasurex.x);
        console.log("enter ", staveMeasurex.width + staveMeasurex.x);
        time++;
      }else{
        if (group != "") {
          context.svg.removeChild(group);
        }
      }

      notesStave.push(new Vex.Flow.StaveNote({ keys: [""+this.id+"/4"], duration: "q" }));
      notesMeasurex.push(new Vex.Flow.StaveNote({ keys: [""+this.id+"/4"], duration: "q" }));
      // console.log('notesMeasurex ' + notesMeasurex);

      group = context.openGroup();

      Vex.Flow.Formatter.FormatAndDraw(context, staveMeasurex, notesMeasurex); // print notes
      context.closeGroup();
      console.log(stave);
    })

  });

  // Render beams
  // beam1.setContext(context).draw();
  // beam2.setContext(context).draw();
  console.log("stave2= " + stave);
}

function print_stave_resize(stave, context,renderer){
  let div = document.querySelector('#stave_container');

  console.log(context.svg.children);
  Array.from(context.svg.children).map(x=>x.remove());

  // set stave position
  var staveMeasurex = new Vex.Flow.Stave(10,0,300);

  staveMeasurex.addClef("treble").addTimeSignature("4/4");
  staveMeasurex.setContext(context).draw(); // print stave

  let notesMeasurex = [];
  let group = "";

  let time = 1; // musical time where start
  let y=0; // lines
  console.log("stave",stave);
  stave.forEach(note => {
    // console.log("note ", note);

    if (notesMeasurex.length>3) {
      if (staveMeasurex.width + staveMeasurex.x>div.offsetWidth-300) { // change line
        y = y + 100;
        time=0;
        staveMeasurex = new Vex.Flow.Stave(10, y, 300);
        staveMeasurex.addClef("treble");
      
        if (staveMeasurex.y>=div.offsetHeight) {
          console.log("resize div");
          renderer.resize(div.offsetWidth, div.offsetHeight+100); // width space to print notes
        }
      }else{
        staveMeasurex = new Vex.Flow.Stave(
          staveMeasurex.width + staveMeasurex.x, // x position
          y, // position y
          300 // space between notes
        );
        console.log("staveMeasurex = "+staveMeasurex.x);
      }

      // stave.push(notesMeasurex); // save time

      staveMeasurex.setContext(context).draw(); // print stave
      notesMeasurex = []; // empty time

      time++;
    }else{
      if (group != "") {
        context.svg.removeChild(group);
      }
    }

    notesMeasurex.push(note);


    group = context.openGroup();
    // console.log("group inside1 " + group);
    
    Vex.Flow.Formatter.FormatAndDraw(context, staveMeasurex, notesMeasurex); // print notes
    context.closeGroup();

    // return context;
  });

  // notesMeasurex.push(new Vex.Flow.StaveNote({ keys: ["D/4"], duration: "q" }));
  // Vex.Flow.Formatter.FormatAndDraw(context, staveMeasurex, notesMeasurex); // print notes

  console.log("stavemeasure inside2 " + staveMeasurex);

  // context.svg.removeChild(group);



  let data = { "staveMeasurex" : staveMeasurex, "group" : group };

  return data;
    
}

function save_sheet(){
  console.log("click");
}