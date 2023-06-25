
let theFormInput = document.getElementById("formInput");
let errorMessage = document.getElementById("errorMessage");
let theResult = document.getElementById("result");
let theAudio = document.getElementById("audio");
let thePhonetic = document.getElementById("phonetic");
let thePartOfSpeech = document.getElementById("partOfSpeech");
let theMeaning = document.getElementById("meaning");
let theSynonym = document.getElementById("synonym");
let theSource = document.getElementById("source");
// let playButton = document.getElementsByClassName("play-icon");
let playButton = document.getElementById("play-icon");


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
            theAudio.src = result[0].phonetics[1].audio;
            // theAudio.play();
            // theAudio.href = result[0].phonetics[1].audio;
            // theAudio.innerHTML = "Play";

            console.log("Dictionary API result is: " , result);                
            
            
            console.log("Word: " + result[0].word);
            theResult.innerHTML = result[0].word;    

            console.log("Audio: " + result[0].phonetics[1].audio);
            // theAudio.innerHTML  = result[0].phonetics[1].audio;

            console.log("Phonetic: " + result[0].phonetic);
            thePhonetic.innerHTML = result[0].phonetic;

            console.log("Part of speech: " + result[0].meanings[0].partOfSpeech);
            thePartOfSpeech.innerHTML = result[0].meanings[0].partOfSpeech;

            console.log("The meaning: " + result[0].meanings[0].definitions[0].definition ); 
            theMeaning.innerHTML = result[0].meanings[0].definitions[0].definition;
            
            console.log("Synonym: " + result[0].meanings[0].synonyms);
            theSynonym.innerHTML = result[0].meanings[0].synonyms;
    
            console.log("The source: " + result[0].sourceUrls[0]);
            theSource.innerHTML = result[0].sourceUrls[0];
            
        }

    }  
     catch (error) {
            if (error) throw error;
            console.log("Dictionary API error ", error);
      
    }
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
 * Change the font family from user selection
 * @param {*} input 
 */

function fontStyle(input) {
    
    console.log(input);
    document.getElementById("content").style.fontFamily = input.value;

}

/**
 * Change the font size from user selection
 * @param {*} input 
 */

function fontSize(input) {
    
    console.log(input);
    document.getElementById("content").style.fontSize = input.value;

}

