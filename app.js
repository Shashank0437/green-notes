console.log('welcome to project');

var preloader = document.getElementById('loading');
function loadingFunc() {
    preloader.style.display = 'none';
}

showNotes();


function showalert(type, displayMessage) {
    let message = document.getElementById('alertbar');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert" style="z-index:20;position: fixed;padding-bottom: 8px;padding-top: 8px;padding-left: 15px;left: 10px;padding-right: 48px;">
                            <strong>Messge:</strong> ${displayMessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close" style="align-content: center;padding-bottom: 7px;padding-top: 7px;">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>`;
    setTimeout(function () {
        message.innerHTML = ``;
    }, 4000);

}

function deletealert(displayMessage, index) {
    let del_message = document.getElementById('alertbar');
    del_message.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert" style="z-index:20;position: fixed;padding-bottom: 2px;padding-top: 2px;margin-bottom: 0px;left: 10px;padding-right: 48px;">
                            <strong>Messge:</strong> ${displayMessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close" style="align-content: center;padding-bottom: 7px;padding-top: 7px;">
                            <span aria-hidden="true">×</span>
                            </button>&nbsp;
                            <button type="button" class="btn btn-warning" onclick="undoDelete(${index})">Undo Delete</button>
                        </div>`;
    setTimeout(function () {
        del_message.innerHTML = ``;
    }, 4000);
}

function undoDelete(index) {

    //retrieve notes
    notesObj.push(notesObj[notesObj.length - 1]);
    for (let i = notesObj.length - 2; i >= index; i--) {
        notesObj[i + 1] = notesObj[i];
    }
    notesObj[index] = tempArr[0];
    //console.log(notesObj);

    //retrieve title
    titleObj.push(titleObj[titleObj.length - 1]);
    for (let i = titleObj.length - 2; i >= index; i--) {
        titleObj[i + 1] = titleObj[i];
    }
    titleObj[index] = tempArr[1];
    //console.log(titleObj);

    //retreive date
    dateObj.push(dateObj[dateObj.length - 1]);
    for (let i = dateObj.length - 2; i >= index; i--) {
        dateObj[i + 1] = dateObj[i];
    }
    dateObj[index] = tempArr[2];
    //console.log(dateObj);

    //retreive time
    timeObj.push(timeObj[timeObj.length - 1]);
    for (let i = timeObj.length - 2; i >= index; i--) {
        timeObj[i + 1] = timeObj[i];
    }
    timeObj[index] = tempArr[3];
    //console.log(timeObj);

    //retrive fav
    favObj.push(favObj[favObj.length - 1]);
    for (let i = favObj.length - 2; i >= index; i--) {
        favObj[i + 1] = favObj[i];
    }
    favObj[index] = tempArr[4];
    //console.log(favObj);


    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("notesTitle", JSON.stringify(titleObj));
    localStorage.setItem("pdate", JSON.stringify(dateObj));
    localStorage.setItem("ptime", JSON.stringify(timeObj));
    localStorage.setItem("favs", JSON.stringify(favObj));
    showNotes();
    let del_message = document.getElementById('alertbar');
    del_message.innerHTML = ``;
}


// // Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    let notesTitle = localStorage.getItem("notesTitle");
    let pdate = localStorage.getItem("pdate");
    let ptime = localStorage.getItem("ptime");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    if (notesTitle == null) {
        titleObj = [];
    } else {
        titleObj = JSON.parse(notesTitle); //parse coverts string to JvaScript Object
    }

    if (pdate == null) {
        dateObj = [];
    } else {
        dateObj = JSON.parse(pdate); //parse coverts string to JvaScript Object
    }

    if (ptime == null) {
        timeObj = [];
    } else {
        timeObj = JSON.parse(ptime); //parse coverts string to JvaScript Object
    }

    let html = "";
    notesObj.forEach(function (element, index) {


        html += `
            <div class="noteCard my-2 mx-2 card" style="border:4px solid black; border-radius: 10px;">
                    <div class="card-body cbody" style="width: 15rem;" draggable="true">
                        <button id="${index}" onclick="deleteNote(this.id)"  class="btn btn-danger btn-sm delbtn"  style="position: absolute; top:2px; right:2px;">&#X2715;</button>
                        <button id="${index}" onclick="doit(this.id)" type="button" class="btn btn-success fav" style="position: absolute;bottom:2px;right:2px;height:32px;width: 32px;"><h1 id="goodBtn"></h1></button>
                        <br>
                        <h5 class="card-title titlec">${titleObj[index]} </h5>
                        <p class="card-text cd" type="button" onmouseover="modifyit(${index})"> ${element}</p>
                        <h7 class="datebar" style="position:absolute; bottom:25px;">${dateObj[index]}</h7><br>
                        <h7 class="timebar" style="position:absolute; bottom:8px;">${timeObj[index]}</h7>
                    </div>
                </div>`;

    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
    let favBtn = document.getElementsByClassName("fav");
    //console.log(favBtn);

    let favs = localStorage.getItem('favs');
    if (favs == null) {
        favObj = [];
    } else {
        favObj = JSON.parse(favs); //parse coverts string to JvaScript Object
    }
    localStorage.setItem("favs", JSON.stringify(favObj));
    favObj.forEach(function (element, index) {
        if (favObj[index] == 1) {
            //console.log(favBtn[index]);
            //console.log(favBtn[index].innerHTML);
            favBtn[index].innerHTML = `&#11088`;
        }
    })
}

var clicks = new Array(10000000).fill(0);
let favs = localStorage.getItem('favs');
if (favs == null) {
    favObj = [];
} else {
    favObj = JSON.parse(favs); //parse coverts string to JvaScript Object
}
localStorage.setItem("favs", JSON.stringify(favObj));


function doit(index) {
    clicks[index] += 1;
    let favBtn = document.getElementsByClassName("fav");

    if (favObj[index] == null) {
        favObj[index] = 1;
        favBtn[index].innerHTML = `&#11088`;
    }
    else {
        favObj[index] = null;
        favBtn[index].innerHTML = ``;
    }
    localStorage.setItem("favs", JSON.stringify(favObj));
}

let tempArr = new Array(4);
// Function to delete a note
function deleteNote(index) {
    // console.log("I am deleting", index);

    let notes = localStorage.getItem("notes");
    let notesTitle = localStorage.getItem("notesTitle");
    let pdate = localStorage.getItem("pdate");
    let ptime = localStorage.getItem("ptime");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    if (notesTitle == null) {
        titleObj = [];
    } else {
        titleObj = JSON.parse(notesTitle);
    }

    if (pdate == null) {
        dateObj = [];
    } else {
        dateObj = JSON.parse(pdate); //parse coverts string to JvaScript Object
    }

    if (ptime == null) {
        timeObj = [];
    } else {
        timeObj = JSON.parse(ptime); //parse coverts string to JvaScript Object
    }
    deletealert('The note with title ' + '"' + titleObj[index] + '"' + ' has been deleted', index);

    // notesObj.forEach(function(element,index){
    //     if(favObj[index]!=1)
    //        favObj[index]=null;
    // })

    tempArr[0] = notesObj[index];
    tempArr[1] = titleObj[index];
    tempArr[2] = dateObj[index];
    tempArr[3] = timeObj[index];
    tempArr[4] = favObj[index];

    //console.log(tempArr);


    notesObj.splice(index, 1);
    titleObj.splice(index, 1);
    dateObj.splice(index, 1);
    timeObj.splice(index, 1);
    favObj.splice(index, 1);

    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("notesTitle", JSON.stringify(titleObj));
    localStorage.setItem("pdate", JSON.stringify(dateObj));
    localStorage.setItem("ptime", JSON.stringify(timeObj));
    localStorage.setItem("favs", JSON.stringify(favObj));
    showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    let inputVal2 = search.value;

    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal) || cardTxt.includes(inputVal2)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        //console.log(cardTxt);
    })
})

let divElem = document.getElementsByClassName('cd');

function modifyit(index) {

    //console.log(divElem[index]);
    divElem[index].addEventListener('dblclick', function () {

        let noTextAreas = document.getElementsByClassName('textarea').length;
        if (noTextAreas == 0) {
            let html1 = divElem[index].innerHTML;
            divElem[index].innerHTML = `<textarea class="textarea"; id="textarea" rows="6" style="margin:8px; width:93%">${html1}</textarea>`;
        }
        let textarea = document.getElementById('textarea');
        textarea.addEventListener('blur', function () {
            divElem[index].innerHTML = textarea.value;

            notesObj[index] = textarea.value;
            localStorage.setItem("notes", JSON.stringify(notesObj));
        })
    });

}


let audio = document.getElementById('audio');
let addTextNote = document.getElementById('addTextNote');
let addtextcom = document.getElementById('addtextcom');
let makeNote = document.getElementById('makeNote');
let addImage = document.getElementById('addImage');
//console.log(audio, addTextNote);

audio.addEventListener('click', function () {
    addtextcom.innerHTML = ``;
    addtextcom.innerHTML = `Speech to Text Recognition`;
    makeNote.innerHTML = ``;
    makeNote.innerHTML = `<div class="form-group">
                           <textarea id="textbox" rows="6" class="form-control"></textarea>
                           </div>
                            <div class="form-group">
                            <button id="startbtn" class="btn btn-success btn-block" style="height: 40px;width: 48%;display:inline-block;margin: 0px 5px;"> <img src="mic.png" style="height:30px; widht:30px;"> &nbsp;Start Speech Synthesis</button>
                            <button id="stopbtn" class="btn btn-danger btn-block" style="height: 40px;display:inline-block; width: 48%;margin: 0px 5px;"> <img src="mic2.png" style="height:20px; width:20px;"> &nbsp;Stop
                            </button>
                                <p id="instructions">Press the Start Speech Synthesis Button</p>
                            </div>`;
    perform();
    // console.log('audio');
});

addTextNote.addEventListener('click', function () {
    addtextcom.innerHTML = ``;
    addtextcom.innerHTML = `Add text to the note`;
    makeNote.innerHTML = ``;
    makeNote.innerHTML = `<textarea class="form-control1" id="addTxt" rows="6"></textarea>`;
    //console.log('text');
});

addImage.addEventListener('click', function () {
    addtextcom.innerHTML = ``;
    addtextcom.innerHTML = `Add Image file`;
    makeNote.innerHTML = ``;
    makeNote.innerHTML = `<input type="file" id="pic" name="pic" accept="image/png ,image/jpeg">
                          <button type="button" class="btn btn-warning extTxt" id="extTxt" style="padding-bottom: 4px;margin-bottom: 5px;">Extract Text</button>
                          &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;  Capture through webcam
                          <button type="button" onclick="startWebcam()" class="btn btn-success" id="extTxt" style="padding-bottom: 4px;margin-bottom: 5px;margin-left: 9px;">Start Webcam</button>
                          <button type="button" onclick="stopWebcam();" class="btn btn-danger" id="extTxt" style="padding-bottom: 4px;margin-bottom: 5px;">Stop Webcam</button>
                          <button type="button" onclick="snapshot();" class="btn btn-warning" id="extTxt" style="padding-bottom: 4px;margin-bottom: 5px;">Take Snapshot</button>
                          <div id="mybar" >Progress:</div>
                          <textarea class="form-control1" id="OCRbox" rows="8"></textarea>`;

    let extTxt = document.getElementById('extTxt');
    let OCRbox = document.querySelector('#OCRbox');
    let mybar = document.querySelector('#mybar');
    mybar.style.width = 0 + '%';

    extTxt.addEventListener('click', function () {
        console.log(OCRbox);
        OCRbox.value = ``;

        let myfile = document.querySelector('input[type="file"]');
        console.log(myfile.files);
        if (myfile.files && myfile.files[0]) {
            newurl = URL.createObjectURL(myfile.files[0]);
            console.log(newurl);
        }

        Tesseract.recognize(
            newurl,
            'eng',
            {
                logger: m => {
                    console.log(m.progress);
                    mybar.style.width = m.progress * 100 + '%';
                }
            }
        ).then(({ data: { text } }) => {
            OCRbox.value = text;
            console.log(text);
        })
    })

});

function perform() {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    var recognition = new SpeechRecognition();

    var textbox = $("#textbox");
    var instructions = $("#instructions");

    var content = '';
    recognition.continuous = true;

    let startbtn = document.getElementById('startbtn');
    let stopbtn = document.getElementById('stopbtn');
    // console.log(startbtn);


    recognition.onstart = function () {
        instructions.text("Voice Recognition is ON")
    }

    recognition.onspeechend = function () {
        instructions.text("No Activity")
    }

    recognition.onerror = function () {
        instructions.text("Try Again")
    }

    recognition.onresult = function (event) {
        var current = event.resultIndex;

        var transcript = event.results[current][0].transcript;
        instructions.text("No Activity");
        content += transcript;
        textbox.val(content);

    }


    $("#startbtn").click(function (event) {
        //console.log('button fired');
        console.log(content)
        if (content.length) {
            content += '';
        }
        recognition.start();
    })

    $("#stopbtn").click(function (event) {
        //console.log('button fired');

        if (content.length) {
            content = textbox.value;
        }
        recognition.stop();
    })
}

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function () {
    let addTxt = document.getElementById("addTxt");
    let addT = document.getElementById("addT");
    let textbox = document.getElementById("textbox");
    let OCRbox = document.querySelector('#OCRbox');
    //console.log(textbox.value);
    let notes = localStorage.getItem("notes");
    let pdate = localStorage.getItem("pdate");
    let ptime = localStorage.getItem("ptime");
    let notesTitle = localStorage.getItem("notesTitle");


    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes); //parse coverts string to JvaScript Object
    }

    if (notesTitle == null) {
        titleObj = [];
    } else {
        titleObj = JSON.parse(notesTitle); //parse coverts string to JvaScript Object
    }

    if (pdate == null) {
        dateObj = [];
    } else {
        dateObj = JSON.parse(pdate); //parse coverts string to JvaScript Object
    }

    if (ptime == null) {
        timeObj = [];
    } else {
        timeObj = JSON.parse(ptime); //parse coverts string to JvaScript Object
    }

    const monName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let today = new Date();
    let d, y, m, t;
    d = today.getDate();
    m = monName[today.getMonth()];
    y = today.getFullYear();
    t = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })


    if (addTxt != null) {

        if (addT.value && addTxt.value) {

            showalert('success', 'Your text note has been successfully added');
            notesObj.push(addTxt.value);
            titleObj.push(addT.value);
            dateObj.push(d + "-" + m + "-" + y);
            timeObj.push(t);
            localStorage.setItem("notes", JSON.stringify(notesObj));
            localStorage.setItem("notesTitle", JSON.stringify(titleObj));
            localStorage.setItem("pdate", JSON.stringify(dateObj));
            localStorage.setItem("ptime", JSON.stringify(timeObj));

            addTxt.value = "";
            addT.value = "";
            //console.log(titleObj);
            showNotes();
        }
        else {
            if (!addT.value)
                showalert('danger', 'Sorry you cannot add this note. Please add the title !');
            else {
                showalert('danger', 'Sorry you cannot add this note. Please add text to this !');
            }
        }
    }
    else {

        if (OCRbox.value && addT.value) {
            showalert('success', 'Your image to text note has been successfully added');
            notesObj.push(OCRbox.value);
            titleObj.push(addT.value);
            dateObj.push(d + "-" + m + "-" + y);
            timeObj.push(t);
            localStorage.setItem("notes", JSON.stringify(notesObj));
            localStorage.setItem("notesTitle", JSON.stringify(titleObj));
            localStorage.setItem("pdate", JSON.stringify(dateObj));
            localStorage.setItem("ptime", JSON.stringify(timeObj));
            makeNote.innerHTML = `<input type="file" id="pic" name="pic" accept="image/png ,image/jpeg">
                                <button type="button" class="btn btn-warning extTxt" id="extTxt" style="padding-bottom: 4px;margin-bottom: 5px;">Extract Text</button>
                                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;  Capture through webcam
                                <button type="button" onclick="startWebcam()" class="btn btn-success" id="extTxt" style="padding-bottom: 4px;margin-bottom: 5px;margin-left: 9px;">Start Webcam</button>
                                <button type="button" onclick="stopWebcam();" class="btn btn-danger" id="extTxt" style="padding-bottom: 4px;margin-bottom: 5px;">Stop Webcam</button>
                                <button type="button" onclick="snapshot();" class="btn btn-warning" id="extTxt" style="padding-bottom: 4px;margin-bottom: 5px;">Take Snapshot</button>
                                <div id="mybar" >Progress:</div>
                                <textarea class="form-control1" id="OCRbox" rows="6"></textarea>`;
            OCRbox.value = "";
            addT.value = "";
            //console.log(titleObj);
            showNotes();
        } else {
            if (textbox.value && addT.value) {
                showalert('success', 'Your audio to text note has been successfully added');
                notesObj.push(textbox.value);
                titleObj.push(addT.value);
                dateObj.push(d + "-" + m + "-" + y);
                timeObj.push(t);
                localStorage.setItem("notes", JSON.stringify(notesObj));
                localStorage.setItem("notesTitle", JSON.stringify(titleObj));
                localStorage.setItem("pdate", JSON.stringify(dateObj));
                localStorage.setItem("ptime", JSON.stringify(timeObj));
                textbox.value = "";
                addT.value = "";
                //console.log(titleObj);
                showNotes();
            }
            else {
                if (!addT.value)
                    showalert('danger', 'Sorry you cannot add this note. Please add the title !');
                else {
                    showalert('danger', 'Sorry you cannot add this note. Please add text to this !');
                }
            }
        }

    }
});

notesObj.forEach(function (element, index) {
    if (favObj[index] != 1)
        favObj[index] = null;
})

const TypeWriter = function (txtElement, words, wait = 2000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

//Type Method
TypeWriter.prototype.type = function () {
    //current index
    const current = this.wordIndex % this.words.length;
    //get full word
    const fullTxt = this.words[current];

    //check if deleting
    if (this.isDeleting) {
        //Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        //add a char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    //Insert TXT into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //TypeSpeed
    let typeSpeed = 100;
    if (this.isDeleting) {
        typeSpeed /= 2;
    }
    document.getElementById('cursor').style.animation = "";
    document.getElementById('cursor').style.animationDuration = "";
    document.getElementById('cursor').style.animationIterationCount = "";

    //If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
        document.getElementById('cursor').style.animation = "blinks";
        document.getElementById('cursor').style.animationDuration = "0.5s";
        document.getElementById('cursor').style.animationIterationCount = "infinite";
        //make pause at end
        typeSpeed = this.wait;

        //Set delete to true
        this.isDeleting = true;

    } else if (this.isDeleting && this.txt === '') {
        document.getElementById('cursor').style.animation = "";
        document.getElementById('cursor').style.animationDuration = "";
        document.getElementById('cursor').style.animationIterationCount = "";
        this.isDeleting = false;
        this.wordIndex++;
        //Pause before typing new word
        typeSpeed = 250;
    }

    //console.log(fulltxt);
    setTimeout(() => {
        this.type();
    }, typeSpeed);
}

//Init On DOM load
document.addEventListener('DOMContentLoaded', init);

//InitApp
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //init TypeWriter
    new TypeWriter(txtElement, words, wait);
}

//--------------------
// GET USER MEDIA CODE
//--------------------
navigator.getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

var video;
var webcamStream;

function startWebcam() {
    makeNote.innerHTML = `<input type="file" id="pic" name="pic" accept="image/png ,image/jpeg">
                          <button type="button" class="btn btn-warning extTxt" id="extTxt" style="padding-bottom: 4px;margin-bottom: 5px;">Extract Text</button>
                          &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;  Capture through webcam
                          <button type="button" onclick="startWebcam()" class="btn btn-success" id="extTxt" style="padding-bottom: 4px;margin-bottom: 5px;margin-left: 9px;">Start Webcam</button>
                          <button type="button" onclick="stopWebcam();" class="btn btn-danger" id="extTxt" style="padding-bottom: 4px;margin-bottom: 5px;">Stop Webcam</button>
                          <button type="button" onclick="snapshot();" class="btn btn-warning" id="extTxt" style="padding-bottom: 4px;margin-bottom: 5px;">Take Snapshot</button>
                          <video onclick="snapshot(this);" width=400 height=400 id="video" controls autoplay></video>
                          <canvas  id="myCanvas" width="400" height="350"></canvas> 
                          <div id="mybar" >Progress:</div>
                          <textarea class="form-control1" id="OCRbox" rows="8"></textarea>`;


    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext('2d');

    if (navigator.getUserMedia) {
        navigator.getUserMedia(
            // constraints
            {
                video: true,
                audio: false
            },

            // successCallback

            function (localMediaStream) {
                video = document.querySelector('video');
                video.srcObject = localMediaStream;
                webcamStream = localMediaStream;

            },

            // errorCallback
            function (err) {
                console.log("The following error occured: " + err);
            }
        );
    } else {
        console.log("getUserMedia not supported");
    }
}

function stopWebcam() {
    webcamStream.getVideoTracks()[0].stop();
    makeNote.innerHTML = `<input type="file" id="pic" name="pic" accept="image/png ,image/jpeg">
                          <button type="button" class="btn btn-warning extTxt" id="extTxt" style="padding-bottom: 4px;margin-bottom: 5px;">Extract Text</button>
                          &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;  Capture through webcam
                          <button type="button" onclick="startWebcam()" class="btn btn-success" id="extTxt" style="padding-bottom: 4px;margin-bottom: 5px;margin-left: 9px;">Start Webcam</button>
                          <button type="button" onclick="stopWebcam();" class="btn btn-danger" id="extTxt" style="padding-bottom: 4px;margin-bottom: 5px;">Stop Webcam</button>
                          <button type="button" onclick="snapshot();" class="btn btn-warning" id="extTxt" style="padding-bottom: 4px;margin-bottom: 5px;">Take Snapshot</button>
                          <div id="mybar" >Progress:</div>
                          <textarea class="form-control1" id="OCRbox" rows="8"></textarea>`;
}
//---------------------
// TAKE A SNAPSHOT CODE
//---------------------
var canvas, ctx;

function snapshot() {

    if (webcamStream.getVideoTracks()[0]!=undefined) {
        webcamStream.getVideoTracks()[0].stop();
        // Draws current image from the video element into the canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        newurl = canvas.toDataURL("image/png");

        Tesseract.recognize(
            newurl,
            'eng',
            {
                logger: m => {
                    console.log(m.progress);
                    mybar.style.width = m.progress * 100 + '%';
                }
            }
        ).then(({ data: { text } }) => {
            OCRbox.value = text;
            console.log(text);
        })
    }


}