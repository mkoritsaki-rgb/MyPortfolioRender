function addToCart(name, price) // συνάρτηση με δύο παραμέτρους 
{
    fetch("add_to_cart.php", //εντολή που στέλνει τα δεδομένα σε server (PHP)
    {
        method: "POST",
        headers: // πληροφορίες για το request(αίτημα) Λέμε στον server ότι τα δεδομένα που στέλνω είναι σαν φόρμα HTML
        {
            "Content-Type":"application/x-www-form-urlencoded"// Οδηγία που λέει: τι μορφή έχουν τα δεδομένα που στέλνω; appication σημαίνει ότι αφορά δεδομένα, www είναι το web, form η φόρμα HTML urlencoded τα δεδομένα κωδικοποιούνται σαν URL
        },
        body:
        "name=" + encodeURIComponent(name) + // Μετατρέπει το κείμενο σε ασφαλή μορφή URL
        "&price=" + price
    })
    .then(res => res.text()) // Όταν έρθει απάντηση από PHP res-response από server res.text()το κάνω απλό κείμενο
    .then(data => // Παίρνει το αποτέλεσμα της PHP και το εμφανίζει
    {
        alert(data);
    });
}