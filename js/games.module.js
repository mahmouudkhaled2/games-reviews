import { Ui } from "./ui.module.js";
import { Details } from "./details.module.js";

export class Home 
{
    constructor() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.activeClass(link)
                this.getGamesData(link.dataset.category)
            })
        });

        this.home = document.getElementById('home');
        this.detailsSection = document.getElementById('details');
        this.ui = new Ui();
        this.getGamesData('mmorpg');
    }

    //Change Active Color 
    activeClass(link){
        document.querySelector('.navbar-nav .active').classList.remove('active');
        link.classList.add('active')
    }

    async getGamesData(category) {
        $('.loading').removeClass('d-none')
        $('body').addClass("overflow-hidden")

        const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'ebad233781msh0b550f5088e7c95p177c56jsnafd2c0d543e9',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        const api = await fetch(url, options);
        const result = await api.json();

        this.ui.displayGames(result)
        $('.loading').addClass('d-none')
        $('body').removeClass("overflow-hidden")
        document.querySelectorAll('.item').forEach(item => {
            item.addEventListener('click',() => {
                this.home.classList.add('d-none')
                this.detailsSection.classList.remove('d-none')
                const details = new Details()
                details.getGameDetails(item.dataset.id)
            })
        })
    }
}
