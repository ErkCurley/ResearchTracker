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