import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import 'rxjs/add/operator/filter';

@Injectable()
export class NavbarService {
  
  visible: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
        .filter(event => event instanceof NavigationEnd)
        .subscribe(event => {
          let currentRoute = this.route.root;
          while (currentRoute.children[0] !== undefined) {
            currentRoute = currentRoute.children[0];
          }
          this.visible =  currentRoute.snapshot.data.name != '_register' &&
                          localStorage.getItem('api-token') != null;
                          
        })
   }

  isNavbarVisible(){ console.log(this.visible); return this.visible };

}
