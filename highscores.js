var scores = JSON.parse(localStorage.getItem("High Scores"));
var scorelist = document.createElement("ul")

for (var i = 0; i < scores.length; i++){
var scoreinput = document.createElement("li")
scoreinput.textContent = scores[i].initials + ":" + scores[i].score
scorelist.appendChild(scoreinput)
}

document.body.appendChild(scorelist)