const typingForm = document.querySelector(".typing-form");
const chatList = document.querySelector(".chat-list");

let userMessage = null;

// API configuration
const API_KEY = "AIzaSyBE9xH8ZiEG4d40YB6FWu1rm9PHjTCHfGs";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=GEMINI_API_KEY`;

// create a new message element and return it
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
}

//Fetch response from the API Based on user message
const generateAPIResponse = async () => {
    //Send a POST request to the API with the user,s message
  try {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            contents: [{
               role: "user",
               parts: [{text: userMessage }]
            }]
        })
    });


   const data = await response.json();

   console.log(data);
  } catch (error){
     console.log(error);
  }
}


// show a loading animation while waiting for the API response 

const showLoadingAnimation = () => {
    const html = `<div class="message-content">
              <img src="images/gemini.webp" alt="Grmini image" class="avatar">
              <p class="text"></p>
              <div class="loading-indicator">
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
              </div> 
            </div>
            <span class="icon material-symbols-rounded">
                content_copy
                </span>`;

   const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
   chatList.appendChild(incomingMessageDiv);

  generateAPIResponse();
}

//Handle sending outgoing chat messages
const handleOutgoingChat = () => {
    userMessage = typingForm.querySelector(".typing-input").value.trim();
    if(!userMessage) return; //Exit if there is no message

    const html = `<div class="message-content">
           <img src="images/Untitled design.png" alt="user image" class="avatar">
           <p class="text"></p> 
         </div>`;

   const outgoingMessageDiv = createMessageElement(html, "outgoing");
   outgoingMessageDiv.querySelector(".text").innerText = userMessage;
   chatList.appendChild(outgoingMessageDiv);

   typingForm.reset(); //clear input field
   setTimeout(showLoadingAnimation, 500); //show Loading Animation after a delay
}

// prevent default from submission and handle outgoing chat
typingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  handleOutgoingChat();
});