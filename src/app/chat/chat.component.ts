import { Component, OnInit, Input } from '@angular/core';

import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() contact: any ;
  constructor(private userService: UserService) { }

  ngOnInit() { console.log(this.contact);
    this.userService.destination
            .subscribe(data => { console.log(data)});

  }

}
