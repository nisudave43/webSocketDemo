import { Component, OnInit } from '@angular/core';
import { WebsocketService } from "../../service/websocket.service";
import { StockService } from "../../service/stock.service";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  providers: [WebsocketService, StockService]
})
export class StockComponent implements OnInit {

 

  ngOnInit() {
  }

  title = 'app';
  flag = false;
  isStockLoad = false;
  previousStockMarketHistory = [];
  stockMarketInformationArray = [];

    //Function to receive websocket event and store data into array
   constructor(private stockService: StockService) {
     stockService.messages.subscribe(msg => {    
        this.stockMarketInformationArray = msg;
        this.addAdditionDataIntoArray();
        this.createHistoryInformation();
        console.log("Response from websocket: " , this.stockMarketInformationArray);
        this.isStockLoad = true;
     });
   }
 
    //Function to add date to stock array for checking update purpose.
   addAdditionDataIntoArray(){
     this.stockMarketInformationArray.forEach(function (data) {
         data.push(new Date())
       })
    }
 
    //Function to create history array that contain stock price is  increase or decrease accroding to previous prices.
    createHistoryInformation(){
      console.log("in function")
      if(!this.flag){
        this.previousStockMarketHistory = this.stockMarketInformationArray;
        this.flag = true;
      }else{
        for(let i=0;i<this.previousStockMarketHistory.length;i++){
          for(let j=0;j<this.stockMarketInformationArray.length;j++){
            if(this.stockMarketInformationArray[j][0] == this.previousStockMarketHistory[i][0])
            {
              if(this.stockMarketInformationArray[j][1] > this.previousStockMarketHistory[i][1]){
                this.stockMarketInformationArray[j][3] = 'increase';
              }else if(this.stockMarketInformationArray[j][1] < this.previousStockMarketHistory[i][1]){
                this.stockMarketInformationArray[j][3] = 'decrease';
              }else{
                this.stockMarketInformationArray[j][3] = 'no change'
              }
            }
          }
          this.flag = false
        }
    }
      console.log("previousStockMarketHistory is here" , this.previousStockMarketHistory , " and tempdata", this.stockMarketInformationArray)
    }
 
    //Function to change card color according to stock price status
    returnPanelClass(stockData){
      if(stockData == 'increase'){
        return 'panel-success';
      }else if(stockData == 'decrease'){
          return 'panel-danger';
      }else{
        return 'panel-info';
        }
    }

    //Function to show text according to stock price 
    returnStockPriceStatus(stockData){
     if(stockData == 'increase'){
          return 'Stock price has increase';
        }else if(stockData == 'decrease'){
          return 'Stock price has decreaase';
        }else{
        return 'Stock price has no change';
        }   
    }
 
    //Function to find difference of time for showing update difference accroding to last update
    returnStockChangeDifferenceInMintues(stockChangeTime,stockStatus){
        if(stockStatus == 'increase' || stockStatus == 'decrease'){
          var historyDate = new Date(stockChangeTime);
          var currentDate = new Date();
          
          return "Last update " + (currentDate.getTime() - historyDate.getTime()) + " seconds ago";
          
        }else{ 
          let date = new Date(stockChangeTime);
          var monthNames = [
             "January", "February", "March",
             "April", "May", "June", "July",
             "August", "September", "October",
             "November", "December"
           ];
          
            return "Last update on " + date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
           }
    }

}
