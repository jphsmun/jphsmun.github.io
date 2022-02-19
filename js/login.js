var objPeople = [
	{ // Object @ 0 index
		username: "Princeps",
		password: "Augustus"
	},
	{
		username: "princeps",
		password: "augustus"
	},
		{
		username: "princeps",
		password: "Augustus"
	},
		{
		username: "Princeps",
		password: "augustus"
	}
	
]

function getInfo() {
	var username = document.getElementById('username').value
	var password = document.getElementById('password').value

	for(var i = 0; i < objPeople.length; i++) {
		// check is user input matches username and password of a current index of the objPeople array
		if(username == objPeople[i].username && password == objPeople[i].password) {
			window.location.replace("https://dashboard.jphsmun.com");			// stop the function if this is found to be true
			return
		}
	}
	window.alert("incorrect username or password")
}
