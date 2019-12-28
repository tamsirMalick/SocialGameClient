import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSetting } from 'src/app/setting/app.setting';
import { Anime } from 'src/app/models/anime';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<any> {
    return this.http.get(AppSetting.APP_URL + '/animes');
  }

  findAnimeById(idAnime: number): Observable<any> {
    return this.http.get(AppSetting.APP_URL + '/animes/' + idAnime);
  }

  findAllUserAnimes(idUser: number): Observable<any> {
    return this.http.get<[Anime]>(AppSetting.APP_URL + '/animes/share/' + idUser);
  }

  createAnime(anime: Anime): Observable<any> {
    return this.http.post(AppSetting.APP_URL + '/animes/', anime);
  }

  shareAnime(idAnim: number, isShared: boolean): Observable<any> {
    return this.http.get(AppSetting.APP_URL + '/animes/share/' + idAnim + '/' + isShared);
  }
}
