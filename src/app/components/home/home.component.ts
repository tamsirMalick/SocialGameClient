import { Component, OnInit } from '@angular/core';
import { AnimeService } from 'src/app/services/anime/anime.service';
import { User } from 'src/app/models/user';
import { Anime } from 'src/app/models/anime';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../resources/fontawesome/css/all.min.css', './home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  animes: Anime[];
  errorMessage: string;
  successMessage: string;

  constructor(private animeService: AnimeService, private router: Router) {
    this.checkUser();
  }

  ngOnInit() {
    this.findAllCharacters();
  }

  findAllCharacters() {
    this.animeService.findAllUserAnimes(this.user.idUser)
      .pipe()
      .subscribe(data => {
        console.log(data);
        this.animes = data;
      }, error => {
        console.log(error);
      });
  }

  shareCharacter(idAnime: number, shared: boolean) {
    if (idAnime === undefined) {
      this.displayMessage('An error has occured while sharing the character', 2);
    }
    this.animeService.shareAnime(idAnime, shared)
      .pipe()
      .subscribe(data => {
        this.displayMessage('Character was succefully updated', 1);
        this.findAllCharacters();
      });
  }

  displayMessage(msg: string, type: number) {
    if (type === 1) {
      this.successMessage = msg;
      setTimeout(() => { this.successMessage = ''; }, 5000);
    } else if (type === 2) {
      this.errorMessage = msg;
      setTimeout(() => { this.errorMessage = ''; }, 5000);
    }
  }

  // filter(keyWord: string) {
  //   if (keyWord === undefined || keyWord.length === 0) {
  //     this.findAllCharacters();
  //     return;
  //   }
  //   this.animeCharacters = this.animeCharacters.filter(character => 
  //     character.category.toLowerCase().includes(keyWord) || character.legend.toLowerCase().includes(keyWord) || 
  //     character.characterName.toLowerCase().includes(keyWord) 
  //   );
  // }

  // removeCharacter(idCharacter: number) {
  //   if(idCharacter === undefined) {
  //     this.displayMessage("An error has occured while removing the character", 2);
  //     return;
  //   }
  //   if (confirm("Do you really want to delete this character?")) {
  //     this.charachterService.deleteCharacter(idCharacter)
  //       .pipe()
  //       .subscribe(data => {
  //         this.findAllCharacters();
  //         this.displayMessage("Character succfully removed", 1);
  //       });
  //   }
  // }
  checkUser() {
    if (localStorage.getItem('currentUser') === undefined || localStorage.getItem('currentUser') === null) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }
}
