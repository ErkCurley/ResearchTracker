firebase.firestore().enablePersistence()
.catch(function(err) {
    if (err.code == 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
    } else if (err.code == 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
    }
});
var db = firebase.firestore();
var articles = db.collection('articles')


function fillInterface(){
    document.getElementById('container').innerHTML = 
    `
    <label>Title: </label><input type="text" name="title" id="title"><br>
    <label>Authors: </label><input type="text" name="authors" id="authors"><br>
    <label>Summary: </label><textarea name="summary" rows="10" cols="30" id="summary"></textarea><br>
    <input type="button" value="Submit" name="submit" id="submit" onclick="submitValues()">
        
        
    <table id="table_id" class="display">
        <thead>
        </thead>
        <tbody>
        </tbody>
    </table>
    `
}






function submitValues() {

    if(firebase.auth().currentUser == undefined){
        console.log(firebase.auth())
        return
    }

    var authors = document.getElementById("authors").value
    var title = document.getElementById("title").value
    var summary = document.getElementById("summary").value

    

    db.collection("articles").add({
        title: title,
        authors: authors,
        summary: summary,
        file: "N/A",
        journal: "N/A",
        pages: "N/A",
        refrences: "N/A",
        year: "N/A"
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

$(document).ready( function () {
    data = []
    articles.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            data[doc.id] = doc.data();
        });
        console.log(data);
    });

    $('#table_id').DataTable({
        paging: false,
        scrollY: 400,
        "columns":[
            {"data":"title"},
            {"data":"authors"},
            {"data":"year"},
            {"data":"journal"}
        ],
        "data": data
    });
} );