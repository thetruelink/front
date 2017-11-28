import { Injectable } from '@angular/core';

import * as Amqp from "amqp-ts";

//declare const Buffer;

@Injectable()
export class RbmqService {

  constructor() { }


  getMessage(){
    var connection = new Amqp.Connection("amqp://localhost");
    var exchange = connection.declareExchange("upload-picture");
    var queue = connection.declareQueue("upload-picture");
    queue.bind(exchange);
    queue.activateConsumer((message) => {
        console.log("Message received: " + message.getContent());
    });

  }

}
