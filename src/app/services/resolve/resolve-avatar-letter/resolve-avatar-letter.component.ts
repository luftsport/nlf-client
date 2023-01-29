import { Component, OnInit, Input } from '@angular/core';
import { ApiOptionsInterface } from 'app/api/api.interface';
import { ApiCacheService } from 'app/api/api-cache.service';
import { LungoPersonsService } from 'app/api/lungo-persons.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'nlf-resolve-avatar-letter',
  templateUrl: './resolve-avatar-letter.component.html',
  styleUrls: ['./resolve-avatar-letter.component.css']
})
export class NlfResolveAvatarLetterComponent implements OnInit {

  @Input() person_id: number;
  @Input() person_name: string;
  @Input() classes = "avatar-img rounded-circle";

  full_name: string;

  dataReady = false;

  svg_avatar: string;

  constructor(
    private lungoUserService: LungoPersonsService,
    private apiCache: ApiCacheService,
    public domSanitizer: DomSanitizer) { }

  ngOnInit() {
    console.log('Person for avatar letter', this.person_id);

    if (!!this.person_id && this.person_id > 0 && !this.person_name) {
      console.log('Person first if');
      const options: ApiOptionsInterface = {
        query: { projection: { full_name: 1, first_name: 1 } }
      };

      const lungoPerson = this.apiCache.get(['get-lungo-person', this.person_id, options.query],
        this.lungoUserService.getUser(this.person_id, options));

      lungoPerson.subscribe(
        data => {
          this.full_name = data.full_name;
          this.svg_avatar = this.getLetterAvatar();
          this.dataReady = true
        },
        err => {
          this.full_name = 'Anonymisert';
          this.svg_avatar = this.getLetterAvatar();
          this.dataReady = true
        },
        () => { }
      );
    } else if (!!this.person_name) {
      this.full_name = this.person_name;
      this.svg_avatar = this.getLetterAvatar();
      this.dataReady = true;
    } else {
      if (this.person_id < 0) {
        this.full_name = 'Person ' + -1 * this.person_id;
      } else {
        this.full_name = 'Ukjent Person';
      }
      this.svg_avatar = this.getLetterAvatar();
      this.dataReady = true;
    }
  }

  stringToHslColor(str, s, l) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    var h = hash % 360;
    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
  }
  svgLetterAvatar(initials: string): string {
    // pointer-events="none"  style="{style}"
    let color = 'hsl(120, 30%, 80%)';
    if (!!this.full_name) {
      color = this.stringToHslColor(this.full_name, 30, 80);
    }

    return '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><rect width="100%" height="100%" fill="' + color + '" /><text text-anchor="middle" y="50%" x="50%" dy="0.35em" font-size="0.65em" pointer-events="auto" fill="#ffffff" font-family="Arial, Helvetica, sans-serif">' + initials.replace(/[^]/g,function(initials){return"&#"+initials.charCodeAt(0)+";"}) + '</text></svg>';

  }

  getInitials(): string {
    if (this.full_name && this.full_name.length > 0) {
      const names = this.full_name.split(" "); //this.full_name.match(/\b([A-ZÆØÅÖa-zæøåö0-9_])/g);//match(/\b(\w)/g);

      if (names.length > 0) {
        // const nameLetters = (nameInitials[0] + nameInitials[nameInitials.length - 1]) || nameInitials.slice(0, 2).join('') || nameInitials[0];
        // return nameLetters.toUpperCase();
        if (names.length === 1) {
          return names[0][0];
        }
        else if (names.length > 1) {
          return names[0][0] + names[(names.length - 1)][0];
        }
      } else {
        return this.full_name[0].toUpperCase();
      }
    }

    return this.full_name[0].toUpperCase() || 'X';
  }

  getLetterAvatar() {
    // this.avatar_tmp_color = this.stringToHslColor(this.full_name, 30, 80);
    return 'data:image/svg+xml;base64,' + btoa(this.svgLetterAvatar(this.getInitials()));
  }

}
