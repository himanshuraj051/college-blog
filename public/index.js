console.log("Hii")


const onChanged = () => {
    const req = new XMLHttpRequest;
    req.onreadystatechange = async function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText, "res")
            let msg = await JSON.parse(this.responseText);
            console.log(msg)
            document.getElementById("demo").innerHTML = msg.message;
        }
    };
    req.open("GET", "http://localhost:3001/blog/upvote", true);
    req.send();
}