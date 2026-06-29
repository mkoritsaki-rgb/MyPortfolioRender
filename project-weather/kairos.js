const weatherForm = document.querySelector(".weatherForm");//Βρίσκει στο HTML το στοιχείο που έχει class weatherForm (συνήθως μια φόρμα <form>) και το αποθηκεύει στη μεταβλητή weatherForm
const cityInput = document.querySelector(".cityInput");// Βρίσκει το πεδίο εισαγωγής που έχει class cityInput και το αποθηκεύει στη μεταβλητή cityInput
const card = document.querySelector(".card");// Βρίσκει το στοιχείο με class card.
const apiKey = "713d070292f3a64c3d81b3b10fcfbdef";//Αποθηκεύει το API Key του OpenWeatherMap.
weatherForm.addEventListener("submit", async event => { // Προσθέτει έναν "ακροατή γεγονότων" (event listener).Όταν ο χρήστης πατήσει το κουμπί Submit της φόρμας: εκτελείται η συνάρτησητο event περιέχει πληροφορίες για το γεγονός,το async επιτρέπει τη χρήση του await

    event.preventDefault (); // Σταματά την προεπιλεγμένη συμπεριφορά της φόρμας. Χωρίς αυτό: η σελίδα θα ανανεωνόταν, τα δεδομένα θα χάνονταν
    const city= cityInput.value; // Παίρνει το κείμενο που πληκτρολόγησε ο χρήστης στο input.
    if (city) { 
        try{ // Ξεκινά ένα μπλοκ όπου μπορεί να προκύψει κάποιο σφάλμα.
            const weatherData = await getWeatherData(city); // Καλεί τη συνάρτηση getWeatherData() και της δίνει την πόλη.
            displayWeatherInfo(weatherData); // Στέλνει τα δεδομένα στη συνάρτηση displayWeatherInfo() για να εμφανιστούν στην ιστοσελίδα.
        }
        catch(error) { // Αν συμβεί κάποιο σφάλμα μέσα στο try, το πρόγραμμα μεταφέρεται εδώ
            console.error(error); // Εμφανίζει το σφάλμα στην κονσόλα του browser.
            displayError(error); // Εμφανίζει το μήνυμα σφάλματος στον χρήστη μέσα στη σελίδα.
        }
    }
else{
    displayError('Please enter a city');

}
});

async function getWeatherData(city) { // Δημιουργεί μια ασύγχρονη συνάρτηση (async) με όνομα getWeatherData. Δέχεται μία παράμετρο, την city.
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; // Δημιουργεί το URL που θα χρησιμοποιηθεί για το αίτημα προς το API.
    const response = await fetch(apiUrl);// Η fetch() στέλνει αίτημα στο API. Το await περιμένει μέχρι να επιστρέψει απάντηση ο server. Το αποτέλεσμα αποθηκεύεται στη μεταβλητή response.
    if(!response.ok) // Ελέγχει αν το αίτημα πέτυχε. Το ! σημαίνει «όχι».
    throw new Error("Could not fetch weather data!!!") // Δημιουργεί και πετάει (throw) ένα σφάλμα. Το πρόγραμμα μεταφέρεται στο catch
return await response.json(); // Μετατρέπει την απάντηση από JSON σε JavaScript Object.
}

function displayWeatherInfo(data){ // Δημιουργεί συνάρτηση που θα εμφανίζει τα δεδομένα στην ιστοσελίδα.Το data περιέχει όλα τα δεδομένα που ήρθαν από το API

    const {name: city, // Ξεκινά το Destructuring (αποδόμηση) Αυτός είναι ένας σύντομος τρόπος να παίρνουμε τιμές από αντικείμενα.
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;

    card.textContent = ""; // Καθαρίζει το περιεχόμενο της κάρτας.
    card.style.display = "flex"; // Εμφανίζει το στοιχείο card. Του εφαρμόζει CSS

    const cityDisplay = document.createElement("h1");// Δημιουργεί ένα νέο στοιχείο HTML <h1>
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;// Βάζει μέσα στο <h1> το όνομα της πόλης
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);// Καλεί μία συνάρτηση

    cityDisplay.classList.add("cityDisplay"); // Βάζουμε css κλάσεις
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);// Προσθέτει το στοιχείο μέσα στη card 
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){ //Δημιουργεί μια συνάρτηση

    switch(true){ // Ελέγχει συνθήκες/περιπτώσεις καιρού αντί για τιμές
        case (weatherId >= 200 && weatherId < 300):
            return "⛈";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧";
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫";
        case (weatherId === 800):
            return "☀";
        case (weatherId >= 801 && weatherId < 810):
            return "☁";
        default:
            return "❓";
    }
}

function displayError(message){ // Δημιουργεί συνάρτηση που δείχνει λάθη στην οθόνη

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";// Καθαρίζει την κάρτα πριν δείξει το λάθος
    card.style.display = "flex";// Κάνει την κάρτα αόρατη
    card.appendChild(errorDisplay);
}