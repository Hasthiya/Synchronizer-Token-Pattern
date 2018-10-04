function getTokenFunction() {

        var xhr = new XMLHttpRequest();

        var Url = "http://localhost:3000/users/getToken";

        xhr.open('POST', Url, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        console.log(getCookie("sessionId"));
        
        xhr.send(JSON.stringify({"sessionId" : getCookie("sessionId") }));
        xhr.onreadystatechange = processRequest;

        function processRequest(e) {

            if (xhr.readyState == 4 && xhr.status == 200) {
                // alert(xhr.responseText.headers.Host);
                var response1 = JSON.parse(xhr.responseText);
                console.log("response " + response1.success);
                if(response1.success){
                    console.log("token " + response1.token);
                    createField(response1.token);
                } else {
                    alert(response1.msg);
                }

            }
        }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function createField(token) {

    var x = document.createElement("INPUT");

    x.setAttribute("hidden", "text");
    x.setAttribute("id", "token");
    x.setAttribute("value", token);

    console.log("create Field fired " + token)

    document.body.appendChild(x);
}

function sendData() {

    var xhr = new XMLHttpRequest();
    var Url = "http://localhost:3000/users/postToken";

    xhr.open('POST', Url, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    var token = document.getElementById("token").value;

    xhr.send(JSON.stringify({"sessionId" : getCookie("sessionId"),"token" : token }));
    xhr.onreadystatechange = processRequest;
    function processRequest(e) {

        if (xhr.readyState == 4 && xhr.status == 200) {
             // alert(xhr.responseText.headers.Host);
             var response1 = JSON.parse(xhr.responseText);
             if(response1.success){
                alert("Token varified by backend");
             } else {
                 alert(response1.msg);
             }
        }
    }
}