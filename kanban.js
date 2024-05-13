


const addbtn = document.querySelector('.add-btn');

const removebtn = document.querySelector('.remove-btn');

const modalCont  =  document.querySelector('.modal-cont');

const mainCont =  document.querySelector('.main-content');

const textArea =  document.querySelector('.textArea-cont');



const ticketLockIcon =  document.querySelector('.ticket-lock');


 const allPriorityColors = document.querySelectorAll('.priority-color');

const toolboxColors = document.querySelectorAll('.color');


const ticketsArr = JSON.parse(localStorage.getItem("tickets")) || [];





let modalPriorityColor =  "black";

let addTaskFlag =   false; 

let removeTaskFlag =   false; 

const lockopen = "fa-lock";

const lockclose = "fa-lock-open"; 
const colors = ["lightpink" , "lightgreen" , "lightblue" , "black"]


addbtn.addEventListener('click' , function()
{

    addTaskFlag = !addTaskFlag;

    if(addTaskFlag)
        {

            modalCont.style.display = 'flex';
        }else{

            modalCont.style.display = 'none';


        }


});


removebtn.addEventListener('click' , function()
{

    removeTaskFlag = !removeTaskFlag;

    if(removeTaskFlag)
        {

            alert("Delete Button id Activated")
            removebtn.style.color = "red";
            
        }else{
            removebtn.style.color = "white";
        }


});


toolboxColors.forEach(function(colorElem)
{
    colorElem.addEventListener("click" , function()
{

 console.log("colors clicked" , colorElem);
 const alltickets =  document.querySelectorAll('.ticket-cont');
 const selectedColor = colorElem.classList[0];
 console.log("selectedColor" , selectedColor);
 console.log("alltickets" , alltickets);


 alltickets.forEach(function(ticket)
{
    const ticketcolorband =  ticket.querySelector('.ticket-color');

    console.log("ticketcolorband" , ticketcolorband);
    
    if(ticketcolorband.style.backgroundColor == selectedColor)
        {
            ticket.style.display = "block"; 

            
        }else{
            ticket.style.display = "none"; 
        }


})
 

})




})

function createTicket(ticketid , ticketTask , tickcolor )
{
    const ticketCont =  document.createElement('div');
    ticketCont.setAttribute("class" , "ticketCont");
    ticketCont.innerHTML = `
        <div class="ticket-cont">
            <div class="ticket-color" style="background-color: ${tickcolor};"></div>
            <div class="ticket-id">${ticketid}</div>
            <div class="task-area">${ticketTask}</div>
            <div class="ticket-lock">
                <i class="fa-solid fa-lock"></i>
            </div>
        </div>`;
    
    mainCont.appendChild(ticketCont);
    handelremoval(ticketCont);
    handlelock(ticketCont);
    handlelock(ticketCont);
    handlecolor(ticketCont);
}


modalCont.addEventListener("keydown", function(e) {

   
    const key = e.key;
    console.log(key);
   if(key == "Shift")
    { 
    const taskcontent =  textArea.value;
    const ticketid = Math.random().toString(36).substring(2, 8);
   
        createTicket(ticketid , taskcontent , modalPriorityColor );

        modalCont.style.display = "none";


        textArea.value = "";
        addTaskFlag =  false;

        ticketsArr.push({ticketid , taskcontent ,  ticketColor : modalPriorityColor});
        updatelocalstorage();

      
    }



});



allPriorityColors.forEach(function(colorElem) {
   
    colorElem.addEventListener("click", function() {
      

     allPriorityColors.forEach(function(priorityElem)
    {
          
        priorityElem.classList.remove('active');



    }
    )


    colorElem.classList.add("active")
    
    modalPriorityColor =  colorElem.classList[0];
   
 


    });
});






function handlelock(ticket )
{



    const ticketLockElem =  ticket.querySelector(
    ".ticket-lock"
    ); 
    
    const ticketLockIcon =  ticketLockElem.children[0];
    const ticketTaskArea = ticket.querySelector(".task-area");

    const id =  ticket.querySelector(".ticket-id").innerText;
    
    console.log("handlelock id " ,  id );

    ticketLockIcon.addEventListener("click" , function()
{
   const ticketidx = getTicketIdx(id);


 if(ticketLockIcon.classList.contains(lockclose))
    {
        ticketLockIcon.classList.remove(lockclose);
        ticketLockIcon.classList.add(lockopen);
        ticketTaskArea.setAttribute("contenteditable" , "false");
      
        

    }else{

        ticketLockIcon.classList.remove(lockopen);
        ticketLockIcon.classList.add(lockclose);
        ticketTaskArea.setAttribute("contenteditable" , "true");
      

    }

    ticketsArr[ticketidx].taskcontent = ticketTaskArea.innerText;
    updatelocalstorage();


})




}


function handelremoval(ticket)
{
    
    ticket.addEventListener("click" , function()
{
 
    if(!removeTaskFlag)
        {
            return;
        }else{

            ticket.remove();
        }





})




    
}

function handlecolor(ticket)
{

    console.log("color : " );

    const ticketColroBrand = ticket.querySelector(".ticket-color");
    ticketColroBrand.addEventListener("click" , function()
{
    const id =  ticket.querySelector(".ticket-id").innerText;

    console.log("first id "  , id);
    const ticketIdx = getTicketIdx(id);

 let currentColor = ticketColroBrand.style.background;

 let currentColorIdx =  colors.findIndex( function(color)
{
 
    return currentColor == color;



})
currentColorIdx++;

const newcurrentColorIdx = currentColorIdx % colors.length;



console.log("color : " , currentColorIdx);

const newticketcolor = colors[newcurrentColorIdx];

ticketColroBrand.style.background =  newticketcolor;

console.log(ticketIdx);
ticketsArr[ticketIdx].ticketColor = newticketcolor;



updatelocalstorage();


})
 



}


function init()
{
 
 if(localStorage.getItem("tickets"))
    {
        ticketsArr.forEach(function(e)
            {

          createTicket(e.ticketid , e.taskcontent ,e.ticketColor );  


            }
        )
    }



}

init()


function getTicketIdx(id)
{
 
    const ticketIdx = ticketsArr.findIndex(function(ticket)
        {

            console.log(ticket.ticketid );
           return ticket.ticketid  == id;



        }
    )
  

    console.log(ticketIdx);

    return ticketIdx;
 

}


function updatelocalstorage()
{


  
    localStorage.setItem( "tickets", JSON.stringify(ticketsArr));

}
