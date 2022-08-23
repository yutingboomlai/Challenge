<template>

<div class="linechart">
    <div class="chartAndButtonsContrainer">
        <from
            action="" id="stockSymbolSearchForm"
            @submit.prevent="createStockPriceHistoryChartInSpecifiedDateHistoryRange(99999999999999999)">
            <input type="text" name="stockSymbolSearch" placeholder="Enter the symbol of the stock you wnat to search" id="stockSymbolSearchBar" v-model="stockSymbol">
            <button type="submit" class="submit">Search</button>
        </from>
        <br>
        <p class="stocksymbol"> {{ stockSymbol }}</p>
        <p class="refreshtime"> Last Refresh:{{ getTime }}</p>
        <p class="stockprice"> ${{ closingPrice }}</p>
        <div>
            <button  class="dateRangeButtons" @click="createStockPriceHistoryChartInSpecifiedDateHistoryRange(604800)">1 day</button>
            <button  class="dateRangeButtons" @click="createStockPriceHistoryChartInSpecifiedDateHistoryRange(432000)">5 days</button>
            <button  class="dateRangeButtons" @click="createStockPriceHistoryChartInSpecifiedDateHistoryRange(2630000)">1 month</button>
            <button  class="dateRangeButtons" @click="createStockPriceHistoryChartInSpecifiedDateHistoryRange(31536000)">1 year</button>
            <button  class="dateRangeButtons" @click="createStockPriceHistoryChartInSpecifiedDateHistoryRange(10000000000000000000000)">All</button>
        </div>
    </div>

    <div id="chartContainer">
        <canvas id="myChart" width="400px" height="400px"></canvas>
        <button class="follow">Follow</button>
    </div>
</div>
</template>

<script>
import Chart from 'chart.js/auto';
import { ref, computed } from 'vue';
import axios from 'axios';

//Define
let stockMarketHistory = [];
let stockMarketHistoryDates = [];
let stockMarketHistoryEpochDates = [];
let stockMarketHistoryPrices = [];



let myChart;
myChart;

export default {
    name: 'LineChart',
    mounted() {
        this.createStockPriceHistoryChartInSpecifiedDateHistoryRange();  //How long the user wants to show
        this.updateStockPriceHisChart();
        //this.getTodayClosingPrice(604800);

    },
    setup() {
        let updateStockPriceHisChart = () => {
            const ctx = document.getElementById('myChart');
            
            const labels = stockMarketHistoryDates;
            const data = {
                labels: labels,
                datasets: [{
                    label: 'Stock Market Price',
                    data: stockMarketHistoryPrices,   //monthly price
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0,
                    option: {
                        responsive: true,
                        maintainAspectRatio: false,
                    }
                }]
            }

            //Fix ths issues of "Canvas is already in use."
            const chartWithKey = Chart.getChart('myChart');
            if (chartWithKey != undefined) {
                chartWithKey.destroy();
                console.log('destroy previous chart')
            }

            myChart = new Chart(ctx, {
                type: 'line',
                data: data,
            })
        }

        let getTime = new Date();
        console.log(getTime);
        let stockSymbol = ref('AMZN');
        let AlphVantageAPI_URL = computed(() => {
            return 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=' + 
            stockSymbol.value + '&apikey=9UIJX19HS3W5OM26';  //9UIJX19HS3W5OM26 myAPI Key
        });

        console.log(AlphVantageAPI_URL.value);

        let createStockPriceHistoryChartInSpecifiedDateHistoryRange = (dateRange) => {

            //Empty array if something already in the chart
            if (stockMarketHistoryDates.length > 0) {
                stockMarketHistoryDates = [];
                stockMarketHistoryEpochDates = [];
                stockMarketHistoryPrices = [];
            }
            axios.get(AlphVantageAPI_URL.value).then(response => {
                    stockMarketHistory = response;

                    //console.log(stockMarketHistory); //All data
                    console.log(stockMarketHistory.data["Monthly Adjusted Time Series"]) //Only monthly price data
                    
                    //For loop monthly data
                    for (const property in stockMarketHistory.data["Monthly Adjusted Time Series"]) {
                        let closingPrice = stockMarketHistory.data["Monthly Adjusted Time Series"][property]["4. close"];
                        let closingDateYear = property.split('-')[0];
                        let closingDateMonth = property.split('-')[1];
                        let closingDateDay = property.split('-')[2];
                        let closingDateProperlyFormatted = `${closingDateMonth}/${closingDateDay}/${closingDateYear}`;
                        let closingDateEpochTime = Date.parse(closingDateProperlyFormatted)/1000;
                        
                        stockMarketHistoryDates.unshift(closingDateProperlyFormatted);
                        stockMarketHistoryEpochDates.unshift(closingDateEpochTime);
                        stockMarketHistoryPrices.unshift(closingPrice);
                    }
                    

                    dateRange; 
                   
                })


                .then(() => {
                    let now = Date.now()/1000;
                    let dateRangeDate = now - dateRange;

                    const isLaterDateThanDateRangeDate = (date) => {
                        return date > dateRangeDate;
                    }

                    //find index
                    let arrayIndexWhereDateIsLargerThanDateRangeDate 
                    = stockMarketHistoryEpochDates.findIndex(isLaterDateThanDateRangeDate);

                    stockMarketHistoryDates.splice(0,arrayIndexWhereDateIsLargerThanDateRangeDate);
                    stockMarketHistoryPrices.splice(0,arrayIndexWhereDateIsLargerThanDateRangeDate);

                    updateStockPriceHisChart();
                   // getTodayClosingPrice(604800);
                    
                })

                
        }

        //  let getTodayClosingPrice = (dateRange) => {

          
        //     axios.get(AlphVantageAPI_URL.value).then(response => {
        //             stockMarketHistory = response;

                   

                    
        //             dateRange;
        //         })




                
        // }


        


        return {
            stockSymbol,
            updateStockPriceHisChart,
            createStockPriceHistoryChartInSpecifiedDateHistoryRange
            
        }
    }
    
}
</script>



<style scoped>
* {
padding:0px;
margin:0px;


}

#chartContainer {
    width: auto;
    height: 300px;
    margin: 0 auto;
    
}

#stockSymbolSearchBar {
    padding: 5px 10px;
    margin: 10px 0;
    align-content: left;
}

#stockSymbolSearchForm .submit {
    padding: 5px;

}

.stocksymbol {
    color: black;
    font-weight:bold;
    font-size: 36px;
    text-align:left;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif
    Trebuchet
    
}

.refreshtime {
    color: gray;
    font-weight:bold;
    font-size: 12px;
    text-align:left;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif
    Trebuchet 
}



.stockprice {
    color: black;
    margin: 5px 0px;
    font-weight:bold;
    font-size: 16px;
    text-align:left;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif
    Trebuchet;

}

.dateRangeButtons {
  
    text-rendering: auto;
    color: black;
    font-family: "Mark Pro";
    background-color: #FCFDF6;
    margin: 16px 4px 0px;
    padding: 5px 10px;
    border-style:none;
    font-weight:bold;
    font-size:14px;
}


.follow {
  font-size: 20px;
  height: 40px;
  width: 300px;
  color: #faf9f5;
  background-color: blue;
  border: none;
  font-weight:bold;
  border-radius: 10px;
  margin-top: 20px;
}

</style>