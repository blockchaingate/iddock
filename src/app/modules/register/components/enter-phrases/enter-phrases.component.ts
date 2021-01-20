import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enter-phrases',
  templateUrl: './enter-phrases.component.html',
  styleUrls: ['./enter-phrases.component.scss']
})
export class EnterPhrasesComponent implements OnInit {
    word1 = '';
    word2 = '';
    word3 = '';
    word4 = '';
    word5 = '';
    word6 = '';
    word7 = '';
    word8 = '';
    word9 = '';
    word10 = '';
    word11 = '';
    word12 = '';
    clicked = false;

  constructor(private router: Router) { 

  }

  ngOnInit() {
  }

  sanitize(word: string) {
    // convert to lowercase from upper case if any
    // remove any unwated space and/or characters
    const p = String(word).toLowerCase();
    p.replace(/\s+/g, '');
    let q = '';

    for (let i = 0; i < p.length; i++) {
        if (p[i].match(/[a-z]/i)) {
            q += p[i];
        }
    }

    return q;
}

confirm() {
    console.log('word1=', this.word1);
    const mnem = this.sanitize(this.word1) + ' ' + this.sanitize(this.word2) + ' ' + this.sanitize(this.word3) + ' '
        + this.sanitize(this.word4) + ' ' + this.sanitize(this.word5) + ' ' + this.sanitize(this.word6) + ' '
        + this.sanitize(this.word7) + ' ' + this.sanitize(this.word8) + ' ' + this.sanitize(this.word9) + ' '
        + this.sanitize(this.word10) + ' ' + this.sanitize(this.word11) + ' ' + this.sanitize(this.word12);

    console.log('mnem===', mnem);
    console.log('sessionStorage.mnemonic=', sessionStorage.mnemonic);
    if (mnem === sessionStorage.mnemonic) {
        this.router.navigate(['/set-password']);           
    } else {
        this.clicked = true;
    }
}

}
