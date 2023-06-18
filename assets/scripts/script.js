
let theFormInput = document.getElementById("formInput");
let theResult = document.getElementById("result");

function  processForm() {

    let tempFormInput = formInput.value;
    console.log("Form input is: " + tempFormInput);
    getWord(tempFormInput);
}


async function getWord(wordInput)
{
        
    const apiURL =  "https://api.dictionaryapi.dev/api/v2/entries/en/" + wordInput;
    console.log(apiURL);

    try {
        const response = await fetch(apiURL, {cache: "no-cache"});
        const result = await response.json();
    
        if (response.ok) {
            
            console.log("Dictionary API result is: " , result);                
            theResult.innerHTML = result[0].word;    
        }

    }  
     catch (error) {
            if (error) throw error;
            console.log("Dictionary API error ", error);
      
    }
}

