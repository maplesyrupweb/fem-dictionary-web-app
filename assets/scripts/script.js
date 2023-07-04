
let theFormInput = document.getElementById("formInput");
let errorMessage = document.getElementById("errorMessage");
let theResult = document.getElementById("result");
// let theAudio = document.getElementById("audio");
let thePhonetic = document.getElementById("phonetic");
let thePartOfSpeech = document.getElementById("partOfSpeech");
let theMeaning = document.getElementById("meaning");
let theSynonym = document.getElementById("synonym");
let theSource = document.getElementById("source");
// let playButton = document.getElementsByClassName("play-icon");
let playButton = document.getElementById("play-icon");
let hrResult = document.getElementById("hr-result");
let hrSource = document.getElementById("hr-source");
let meaningTitle = document.getElementById("meaningHeading");
let synonymTitle = document.getElementById("synonymHeading");
let sourceTitle = document.getElementById("sourceHeading");



function  processForm() {

    errorMessage.innerHTML = "";

    if ((theFormInput.value.length == null) ||  (theFormInput.value.length == "")) {
        console.log ("Form input error")
        errorMessage.innerHTML = "Can't be empty";
        theFormInput.style.border = "1px solid red";
    }
    else 
    {
        theFormInput.style.border = "none";
        let tempFormInput = formInput.value;
        console.log("Form input is: " + tempFormInput);
        getWord(tempFormInput);
        theFormInput.value = "";
    }

    
}


async function getWord(wordInput)
{
    playButton.classList.remove("icon-play");
    loadSpinner();    
    const apiURL =  "https://api.dictionaryapi.dev/api/v2/entries/en/" + wordInput;
    
    console.log(apiURL);

    try {
        const response = await fetch(apiURL, {cache: "no-cache"});
        const result = await response.json();
    
        if (response.status !== 200) {
            hideSpinner();
            console.log("Nothing to see here.");
        }


        else if (response.ok) {
            hideSpinner();
            playButton.classList.add("icon-play");
            // theAudio.src = result[0].phonetics[1].audio;
            hrResult.classList.add("show");
            console.log("Dictionary API result is: " , result);                
            
            
            console.log("Word: " + result[0].word);
            theResult.innerHTML = result[0].word;    

            // console.log("Audio: " + result[0].phonetics[1].audio);
            // theAudio.innerHTML  = result[0].phonetics[1].audio;

            fillKeyword(result[0]);
            console.log("Phonetic: " + result[0].phonetic);
            thePhonetic.innerHTML = result[0].phonetic;

            console.log("Part of speech: " + result[0].meanings[0].partOfSpeech);
            thePartOfSpeech.innerHTML = result[0].meanings[0].partOfSpeech;

            meaningTitle.classList.add("show");
            console.log("The meaning: " + result[0].meanings[0].definitions[0].definition );
            theMeaning.classList.add("show-li");
            theMeaning.innerHTML = result[0].meanings[0].definitions[0].definition;
            
            synonymTitle.classList.add("show");
            console.log("Synonym: " + result[0].meanings[0].synonyms);
            // theSynonym.classList.add("show-li");
            theSynonym.innerHTML = result[0].meanings[0].synonyms;
    
            hrSource.classList.add("show");
            sourceTitle.classList.add("show");
            console.log("The source: " + result[0].sourceUrls[0]);
            theSource.innerHTML = result[0].sourceUrls[0];
            
        }

    }  
     catch (error) {
            if (error) throw error;
            console.log("Dictionary API error ", error);
      
    }
}

function fillKeyword(data) {

    console.log("*** Inside the fillkeyword function ***")
    // data-keyword, data-pronunciation, data-audio
    // const termEl = document.querySelector("[data-keyword__term]");
    // termEl.innerText = data.word;
  
    // const pronunciationEl = document.querySelector(
    //   "[data-keyword__pronunciation]"
    // );
    // pronunciationEl.innerText = data.phonetic || "";
  
  
    // *************************************************************
  
    // return first non-empty audio tag
    let audioUrl = data.phonetics.find((e) => {
        console.log("*** e.audio is " + e.audio);
      return e.audio;
    });
    const audioEl = document.querySelector("[data-keyword__audio]");
    audioEl?.setAttribute("src", audioUrl?.audio);
  }
  

/**
 * Hide the spinner
 */

function hideSpinner() {
    document.getElementById('spinner')
            .style.display = 'none';
} 

/**
 * Show the spinner
 */

function loadSpinner() {
    document.getElementById('spinner')
            .style.display = '';
}

/**
 * Change the font family from user selection and store in localStorage
 * @param {*} input 
 */

function fontStyle(input) {
    
    var select = document.getElementById("input");
    select.style.fontFamily = input.value;
    localStorage.setItem("font-family", input.value);
    document.getElementById("content").style.fontFamily = input.value;

}

/**
 * Get the font family from local localStorage
 */

function getFontFamily() {

    var select = document.getElementById("input");
    select.value = localStorage.getItem("font-family");
    select.style.fontFamily = select.value;
}


/**
 * Change the font size from user selection and store in localStorage
 * @param {*} input 
 */

function fontSize(input) {
    
    var select = document.getElementById("input2");
    select.style.fontSize = input.value;
    localStorage.setItem("font-size", input.value);
    document.getElementById("content").style.fontSize = input.value;
}

/**
 * Get the font size from local localStorage
 */

function getFontSize() {

    var select = document.getElementById("input2");
    select.value = localStorage.getItem("font-size");
    select.style.fontSize = select.value;
}

window.onload = getFontSize();getFontFamily();
