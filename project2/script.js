document.querySelector("#changeImageButton").onclick = () => {
    const hero = document.querySelector("#hero");
    
    // Ελέγχουμε αν η τρέχουσα εικόνα περιέχει το 'logo2.jpg'
    if (hero.style.backgroundImage.includes("logo2.jpg")) {
        hero.style.backgroundImage = "url('logo.jpg')"; // Επιστροφή στην αρχική
    } else {
        hero.style.backgroundImage = "url('logo2.jpg')"; // Αλλαγή στη δεύτερη
    }
};


//Αντί να γράφουμε κάθε φορά όλο αυτό:
//document.querySelector("#hero").style.backgroundImage Κάνουμε το εξής:

//Λέμε στη JavaScript: «Βρες το στοιχείο με το id #hero στο HTML και βάλε το μέσα στο κουτί με το όνομα hero».

//JavaScript
//const hero = document.querySelector("#hero");
//Μετά, χρησιμοποιούμε απλά το όνομα hero για να αλλάξουμε το στυλ του:

//JavaScript
//hero.style.backgroundImage = "...";