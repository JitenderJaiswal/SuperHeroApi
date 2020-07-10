let tasks = [];
const tasksList = document.getElementById('list');

function addTaskToDOM (task) {
	if(task){
	const li = document.createElement('li');
 
   li.innerHTML =`<div class="card" style="width: 18rem;border:1px solid black;">
                   <img src="${task.image.url}" class="card-img-top" alt="...">
                  <div class="card-body">
                   <h1 class="card-title">  ${task.name} </h1>
                   <p class="card-text"><h5>Group-affiliation : </h5>${task.connections['group-affiliation']}</p>
	               <p class="card-text"><h5>Relatives : </h5>${task.connections.relatives}</p>
                   </div>
                   <ul class="list-group list-group-flush">
                   <li class="list-group-item" style="background:#05ffb0;"><h4>Powerstats</h4></li>
                   <li class="list-group-item"><h6>Combat : ${task.powerstats.combat}</h6>
	                            <h6>Durability : ${task.powerstats.durability}</h6>
                                <h6>Durability : ${task.powerstats.durability}</h6>
	                            <h6>Intelligence : ${task.powerstats.intelligence}</h6>
	                            <h6>Power : ${task.powerstats.power}</h6>
                                <h6>Speed : ${task.powerstats.speed}</h6>
                                <h6>Strength : ${task.powerstats.strength}</h6>
								</li>
                   </ul>
                   <ul class="list-group list-group-flush">
                   <li class="list-group-item" style="background:#05ffb0;"><h4>Biography</h4></li>
                   <li class="list-group-item"><h6>Full-name :</h6>${task.biography["full-name"]}</li>
	               <li class="list-group-item"><h6>Place-of-birth :</h6>${task.biography["place-of-birth"]}</li>
                   <li class="list-group-item"><h6>Alignment :</h6>${task.biography.alignment}</li>
                   <li class="list-group-item"><h6>First-appearance :</h6>${task.biography["first-appearance"]}</li>
	               <li class="list-group-item"><h6>Alter-egos :</h6>${task.biography["alter-egos"]}</li>
                   <li class="list-group-item"><h6>Publisher :</h6>${task.biography.publisher}</li>
				   </ul>
                   <a href="index.html" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Home</a>
                   </div>`;			 
	tasksList.appendChild(li);
	}
}

function renderList (id) {
    tasksList.innerHTML ='';
    addTaskToDOM(id);
 }
 
function getsessionstorage(){
	 let id=JSON.parse(sessionStorage.getItem("id"));
	        renderList(id);
}
getsessionstorage();
