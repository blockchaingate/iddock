import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../models/language';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  languages: Language[] = [
    { value: 'en', viewValue: 'English' },
    { value: 'sc', viewValue: '简体中文' },
    { value: 'tc', viewValue: '繁體中文' }
  ];

  selectedLan = this.languages[0];

  constructor(private _tranServ: TranslateService) { }

  ngOnInit() {
    this.setLan();
  }

  setLan() {
    const storedLan = localStorage.getItem('_lan');
    if (storedLan) {
      if(storedLan === 'en') {
        this.selectedLan = this.languages[0];
      } else if (storedLan === 'sc') {
        this.selectedLan = this.languages[1];
      } else if(storedLan === 'tc') {
        this.selectedLan = this.languages[2];
      }
    } else {
      let userLang = navigator.language;
      userLang = userLang.substr(0, 2);
      if (userLang === 'CN' || userLang === 'cn' || userLang === 'zh') {
        this.selectedLan = this.languages[1];
        localStorage.setItem('_lan', 'sc')
      }
    }
    this._tranServ.use(this.selectedLan.value);
  }

}
