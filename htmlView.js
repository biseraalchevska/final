function renderWelcomeMessage() {
    return "Welcome Back";
}

function renderLocation(city, country) {
    return `<br>Your current location is: ${city}, ${country}`;
}

function renderBirdObservations(commonNamesAndDetails) {
    let html = '<br><br>Most common bird observations in your area - with images and sounds:<br>';
    commonNamesAndDetails.forEach((observation, index) => {
        html += `
            <div>
                Observation ${index + 1}: Common Name: ${observation.commonName}, 
                Image: <img src="${observation.imageUrl}" style="width: 200px; height: 200px;">
                Sound: <audio controls><source src="${observation.birdCallUrl}" type="audio/mpeg"></audio>
                <span id="counter${index + 1}">Counter: 0</span>
                <button onclick="incrementCounter(${index + 1})">Increment</button>
                <button onclick="decrementCounter(${index + 1})">Decrement</button>
            </div><br>`;
    });
    return html;
}

function renderCommentForm(counters) { // Accept counters as an argument
    return `
        <br><br>
        <form id="commentForm" action="/submitComment" method="POST">
            <label for="comment">Add your comment:</label><br>
            <textarea id="comment" name="comment" rows="4" cols="50"></textarea><br>
            <input type="submit" value="Submit">
        </form>
        <div id="confirmationModal" style="display: none;">
            <h2>Confirm Comment Submission</h2>
            <p>Today's log:</p>
            <ul>
                ${Object.keys(counters).map(commonName => `<li>${counters[commonName]} ${commonName} birds</li>`).join('')}
            </ul>
            <p>Comment:</p>
            <textarea id="commentPreview" readonly rows="4" cols="50"></textarea><br>
            <button onclick="submitComment()">Confirm</button>
            <button onclick="closeModal()">Cancel</button>
        </div>`;
}

module.exports = { 
    renderWelcomeMessage, 
    renderLocation, 
    renderBirdObservations, 
    renderCommentForm 
};
