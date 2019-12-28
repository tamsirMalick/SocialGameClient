import { Component, OnInit } from '@angular/core';
import { AnimeService } from 'src/app/services/anime/anime.service';
import { User } from 'src/app/models/user';
import { Anime } from 'src/app/models/anime';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  animes: Anime[];

  constructor(private animeService: AnimeService, private router: Router) { 
    this.checkUser();
  }

  ngOnInit() {
    this.animeService.findAllUserAnimes(this.user.idUser).subscribe(
      data => {
        this.animes = data;
        console.log(this.animes);
      },
      error => console.log(error)
    );
  }

  checkUser() {
    if (localStorage.getItem('currentUser') === undefined || localStorage.getItem('currentUser') === null) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }
}
