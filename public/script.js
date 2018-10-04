window.onload = function () {

    document.getElementById("login").onclick = function fun() {

        var data = {};
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var sessionId = Math.floor((Math.random() * 10000000) + 1);
        
        var Url = "http://localhost:3000/users/authenticate";

        var xhr = new XMLHttpRequest();
        xhr.open('POST', Url, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.send(JSON.stringify({"username": username, "password" : password, "sessionId" : sessionId }));

        xhr.onreadystatechange = processRequest;

        function processRequest(e) {

            if (xhr.readyState == 4 && xhr.status == 200) {
                // alert(xhr.responseText.headers.Host);
                var response1 = JSON.parse(xhr.responseText);
                console.log("response " + response1.msg);
                if(response1.success){
                    document.cookie = "sessionId="+sessionId;
                    console.log(document.cookie);
                    var url= "http://localhost:3000/home";
                    window.location = url;
                } else {
                    alert(response1.msg);
                }

            }
        }
    }
}