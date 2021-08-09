let row=document.getElementById('cust');



row.addEventListener('click',function(){
    document.getElementById('mid').innerHTML='';
    addavatar();
    
});
//creating each profiles for customers
function addavatar(){
    let middle=document.getElementById('mid')

    fetch("http://127.0.0.1:5000/").then(function(response){
        return response.json();
    })
    .then(function (myjson){
        data=JSON.stringify(myjson)
        data=JSON.parse(data);
        
    let inside=document.createElement('div')
    inside.classList.add('row')
    document.getElementById("mains").appendChild(inside)

    for(var i=1;i<=10;i++){

    let card=document.createElement("div");
    card.classList.add('card')
    card.classList.add('card.hover')
    card.classList.add('container')
    
    inside.appendChild(card)

    
    
    let images=document.createElement("img");
    images.src="img/avatar2.png"
    images.classList.add('img')
    card.appendChild(images);
    

    let content=document.createElement("div");
    content.classList.add("container");
    card.appendChild(content);

    let name=document.createElement('h2')
    let val=document.createTextNode(data[i][0])
    name.appendChild(val)

    content.appendChild(name)

    let email=document.createElement("p")
    let text=document.createTextNode(data[i][1]);
    email.appendChild(text);

    content.appendChild(email);

    let view=document.createElement('button')
    let buttontext=document.createTextNode("view")
    view.classList.add("view")
    view.appendChild(buttontext)
    view.id=''+i
    view.addEventListener("click",function(event){
        clicked(event.target.id);
    })
    content.appendChild(view)



    
    
   
    }
    middle.appendChild(inside)
    }
    )
}
//fetching the details of particular customer
function clicked(info){
    let data
    console.log(info)
    fetch("http://127.0.0.1:5000/each",{

        method:"POST",

        body:JSON.stringify({'sno':info}),
        
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

}).then(function(response){
        return response.json();

    }).then(function (myjson){
        console.log(myjson);
        data=JSON.stringify(myjson)
        data=JSON.parse(data);
    let midpart=document.getElementById('mid')
    let names=data[info][0]
    midpart.innerHTML='';
//table creation
 var customers = new Array();
 customers.push(["Description","Details"])
 customers.push(["Name",data[info][0]])
 customers.push(["Email",data[info][1]])
 customers.push(["balance",data[info][2]])

 var table = document.createElement("TABLE");
 table.border = "1";
 var columnCount = customers[0].length;

 var row = table.insertRow(-1);
        for (var i = 0; i < columnCount; i++) {
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = customers[0][i];
            row.appendChild(headerCell);
        }

        for (var i = 1; i < customers.length; i++) {
            row = table.insertRow(-1);
            for (var j = 0; j < columnCount; j++) {
                var cell = row.insertCell(-1);
                cell.innerHTML = customers[i][j];
            }
        }
        
    table.classList.add("table")
    midpart.appendChild(table)

    let transfer=document.createElement('button');
    
        let transfertext=document.createTextNode("click to transfer")
        transfer.classList.add("buttons")
        transfer.addEventListener("click",function(){
            transferring(data[info][0],data[info][1])
        })
        transfer.appendChild(transfertext)
    
    midpart.appendChild(transfer)
    })
}
//Transfering the amount 
function transferring(from,b){
    console.log("successful",from)
    document.getElementById('mid').innerHTML='';

    let midpart=document.getElementById('mid')


    let box=document.createElement("div");
    box.classList.add('box')

let h1=document.createElement("h1");
let h1text=document.createTextNode("Transfer")
h1.appendChild(h1text)
box.appendChild(h1)

let froms=document.createElement("h4");
let fromtext=document.createTextNode("from")
froms.appendChild(fromtext)
box.appendChild(froms)

let name=document.createElement("h2");
let nametext=document.createTextNode(from)
name.appendChild(nametext)
box.appendChild(name)

let to=document.createElement("h4");
let totext=document.createTextNode("to")
to.appendChild(totext)
box.appendChild(to)

let select = document.createElement("select");
select.id='opt'
let toname;
fetch("http://127.0.0.1:5000/").then(function(response){
        return response.json();
    })
    .then(function (myjson){
        data=JSON.stringify(myjson)
        data=JSON.parse(data);


        for(let j=1;j<=10;j++){

            if(data[j][0]!=from){
            let option=document.createElement("option");
            option.value=data[j][0]

            option.text = data[j][0].charAt(0).toUpperCase() + data[j][0].slice(1);
            select.appendChild(option)}
        }
        select.addEventListener('change',function(){
            console.log(select.value,"hello")
            toname=select.value
            
        })
        
    })


    box.appendChild(select)

    let amount=document.createElement("h4");
    let amounttext=document.createTextNode("Enter the amount")
    amount.appendChild(amounttext)
    box.appendChild(amount)


   
    let textarea=document.createElement("textarea");
    textarea.id="amount"
    box.appendChild(textarea)

    let confirm=document.createElement("button");
    let confirmtext=document.createTextNode("Confirm")
    confirm.addEventListener("click",function(){
        window.alert("Transaction Successfull")
    })
    confirm.appendChild(confirmtext)

    confirm.addEventListener("click",function(){
        console.log(document.getElementById("amount").value)

        update(document.getElementById("amount").value,from,toname)
    })
    box.appendChild(confirm)
    midpart.appendChild(box)
}

function update(amount,from,toname){
    console.log("to",toname)
    fetch("http://127.0.0.1:5000/update",{
        method: "POST",
        body: JSON.stringify({'amount':amount,'from':from,'to':toname}),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

}
function myfunction(){
    location.href="http://127.0.0.1:5500/main.html";
}
