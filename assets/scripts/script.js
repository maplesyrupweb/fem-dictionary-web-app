
let theFormInput = document.getElementById("formInput");
let errorMessage = document.getElementById("errorMessage");
let theResult = document.getElementById("result");
// let theAudio = document.getElementById("audio");
let thePhonetic = document.getElementById("phonetic");
let thePartOfSpeech = document.getElementById("partOfSpeech");
let theMeaning = document.getElementById("meaning");
let theSynonym = document.getElementById("synonym");
let theSource = document.getElementById("source");
let playButton = document.getElementById("play-icon");
let hrResult = document.getElementById("hr-result");
let hrSource = document.getElementById("hr-source");
let meaningTitle = document.getElementById("meaningHeading");
let synonymTitle = document.getElementById("synonymHeading");
let sourceTitle = document.getElementById("sourceHeading");

const keywordPlayButton = document.querySelector("[data-keyword__play]");


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
         
            console.log("calling fillDefinitions");
            fillDefinitions(result);
        }

    }  
     catch (error) {
            if (error) throw error;
            console.log("Dictionary API error ", error);
      
    }
}

function fillKeyword(data) {

    console.log("*** Inside the fillkeyword function ***")
     
    const termEl = document.querySelector("[data-keyword__term]");
    termEl.innerText = data.word;
  
    const pronunciationEl = document.querySelector(
      "[data-keyword__pronunciation]"
    );
    pronunciationEl.innerText = data.phonetic || "";
  
  
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
 * Event listener for the play button
 */

keywordPlayButton.addEventListener("click", (evt) => {
    const audioEl = document.querySelector("[data-keyword__audio]");
    audioEl.play();
});


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

function fillDefinitions(data) {
    const definitions = document.querySelector("[data-definitions]");
    // clear contents if any
    definitions.innerText = "";
  
    for (const result of data) {
      for (const partOfSpeech of result.meanings) {
        element("h2")
          .text(partOfSpeech.partOfSpeech)
          .class("definition__part-of-speech")
          .class("heading--2")
          .addTo(definitions);
        element("h3")
          .text("Meaning")
          .class("definition__meaning-label")
          .class("heading--3")
          .addTo(definitions);
        const ulEl = element("ul")
          .class("definition__meaning-list")
          .addTo(definitions);
  
        for (const defn of partOfSpeech.definitions) {
          const liEl = element("li").addTo(ulEl);
          const defnTextEl = element("p")
            .text(defn.definition)
            .class("definition__text")
            .class("text--1")
            .addTo(liEl);
          if (defn.example) {
            element("p")
              .text(defn.example)
              .class("definition__example")
              .class("text--1")
              .addTo(liEl);
          }
  
          if (defn.synonyms.length) {
            element("h4")
              .text("Synonyms")
              .class("definition__synonym-label")
              .addTo(liEl);
            const defnSynUlEl = element("ul")
              .class("definition__synonym-list")
              .addTo(liEl);
            for (const syn of defn.synonyms) {
              const liEl = element("li")
                .class("definition__synonym")
                .addTo(defnSynUlEl);
              element("a")
                .text(syn)
                .attribute(
                  "href",
                  location.origin +
                    location.pathname +
                    "#" +
                    encodeURIComponent(syn)
                )
                .addTo(liEl);
            }
          }
          if (defn.antonyms.length) {
            element("h4")
              .text("Antonyms")
              .class("definition__antonym-label")
              .addTo(liEl);
            const defnAntUlEl = element("ul")
              .class("definition__antonym-list")
              .addTo(liEl);
            for (const ant of defn.antonyms) {
              const liEl = element("li").class("definition__antonym").addTo(liEl);
              element("a")
                .text(ant)
                .attribute(
                  "href",
                  location.origin +
                    location.pathname +
                    "#" +
                    encodeURIComponent(ant)
                )
                .addTo(liEl);
            }
          }
        }
        if (partOfSpeech.synonyms.length) {
          const div = element("div").addTo(definitions);
          element("h3")
            .text("Synonyms")
            .class("definition__synonym-label")
            .class("heading--3")
            .addTo(div);
          const synUlEl = element("ul")
            .class("definition__synonym-list")
            .addTo(div);
  
          for (const syn of partOfSpeech.synonyms) {
            const liEl = element("li")
              .class("definition__synonym")
              .addTo(synUlEl);
            element("a")
              .text(syn)
              .attribute(
                "href",
                location.origin +
                  location.pathname +
                  "#" +
                  encodeURIComponent(syn)
              )
              .addTo(liEl);
          }
        }
        if (partOfSpeech.antonyms.length) {
          const div = element("div").addTo(definitions);
          element("h3")
            .text("Antonyms")
            .class("definition__antonym-label")
            .class("heading--3")
            .addTo(div);
          const antUlEl = element("ul")
            .class("definition__antonym-list")
            .addTo(div);
  
          for (const ant of partOfSpeech.antonyms) {
            const liEl = element("li")
              .class("definition__antonym")
              .addTo(antUlEl);
            element("a")
              .text(ant)
              .attribute(
                "href",
                location.origin +
                  location.pathname +
                  "#" +
                  encodeURIComponent(ant)
              )
              .addTo(liEl);
          }
        }
      }
      element("h4")
        .text("Source")
        .class("definition__source-label")
        .addTo(definitions);
      const defnSourceList = element("ul")
        .class("definition__source-list")
        .addTo(definitions);
      for (const url of result.sourceUrls) {
        const sourceItem = element("li")
          .class("definition__source-url")
          .addTo(defnSourceList);
        const ahref = element("a")
          .attribute("href", url)
          .attribute("target", "_blank")
          .addTo(sourceItem);
        element("span").text(url).addTo(ahref);
        element("img")
          .class("icon")
          .class("icon-new-window")
          
          .attribute("aria-hidden", "true")
          .addTo(ahref);
      }
    }
  }