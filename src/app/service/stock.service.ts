import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs/Rx";
import { WebsocketService } from "./websocket.service";

//websocket URL
const STOCK_URL = "ws://stocks.mnet.website";



@Injectable()
export class StockService {

  public messages: Subject<any>;
  //Function to receiver data and send back to component
  constructor(wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService.connect(STOCK_URL).map(
      (response: MessageEvent) => {
        var data = JSON.parse(response.data);
        return data;
      }
    );
  }

}
