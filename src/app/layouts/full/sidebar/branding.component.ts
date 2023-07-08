import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding" style="border-bottom:2px solid #80808063">
      <a href="/">
        <img
          src="./assets/images/logos/{{Country}}.png"
          style="position: relative;width: 40%;left: 24%;"
          class="align-middle m-2"
          alt="logo"
        />
      </a>
    </div>
    <span style="margin-left:30%;font-weight:bolder">OEP {{Country}}</span>

  `,
})
export class BrandingComponent {

  Country:any=""
  constructor() {

    this.Country = JSON.parse(''+sessionStorage.getItem('UserDetails')).Organization.CountryCode.CountryName
    console.log(this.Country)
  }
}
