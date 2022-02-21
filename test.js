
const host = window.location.protocol + "//" + window.location.host;

async function ApiGet(url)
{
    const res = await fetch(url);
    return await res.text();
}

async function PcStarterGet()
{
    return await JSON.parse(ApiGet(host + "/pcStarter"));
}

function PcStarterPost(url, status)
{
    const body = `{"status" : ${status}}`;
    
    return SendApiCall("POST", url, body, false);
}

function test(form)
{
    form.action = "login";
    alert("test");
}


const pcbg = document.getElementById("pcButtonGet");

pcbg.addEventListener("click", async function(){
    const body = await PcStarterGet();
    const status = body["status"];
    if(status == 1)
    {
        pcbg.textContent = 1;
        pcbg.style.backgroundColor = "green";
    }
    else if(status == 0)
    {
        pcbg.textContent = 0;
        pcbg.style.backgroundColor = "red";
    }
    else
        pcbg.textContent = "error";

    alert(response["body"]);
});


async function TestLogin(event)
{
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const obj = Object.fromEntries(formData.entries());
    const res = await fetch(host + "/login", {
        method: "post",
        body: JSON.stringify(obj),
        headers: {"Content-Type":"application/json"}
    });

    if(res.redirected)
    {
        //window.location.assign(res.url);
        PopUp("Hejsan svejasn på dejsan");
        
    }
}

function PopUp(text)
{
    let popUp = document.getElementById("popUp");
    if(popUp != null)
    {
        popUp.classList.remove("popUp");
        popUp.offsetWidth;
        popUp.classList.add("popUp");
        //popUp.style.animation = "popUpAnimation 5s";
        return;
    }

    popUp = document.createElement("div");
    popUp.id = "popUp";
    popUp.classList.add("popUp");
    const popUpText = document.createTextNode(text);
    popUp.appendChild(popUpText);
    document.body.append(popUp);
}

document.getElementById("loginForm").addEventListener("submit", TestLogin);