import { Ui } from "./ui.module.js";

export class Details {
    constructor(id){
        document.getElementById('closeBtn').addEventListener('click', function () {
            document.getElementById('home').classList.remove('d-none')
            document.getElementById('details').classList.add('d-none')
        })
    }

    async getGameDetails(id) {
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
        const options = {
            method: 'GET',
	        headers: {
		        'x-rapidapi-key': 'ebad233781msh0b550f5088e7c95p177c56jsnafd2c0d543e9',
		        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	        }
        };

	const response = await fetch(url, options);
	const result = await response.json();
	new Ui().displayDetails(result)
    }
}