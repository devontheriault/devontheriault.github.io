//------------------------------------------------------//
//setting up a demo URL in order to save on my api usage
let demoURL = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=MSFT&apikey=demo"
//Setting up my URL variables
let startURL = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol="
let endURL = "&apikey=JEQTQ0HLKPKN053K"


//------------------------------------------------------//
//setting up the links between my HTML elements and my JS
let userInput = document.querySelector("input#userInput")

$(document).ready(function(){
    $('#tickerSelected').on('click', function(){
        tickerSelectClicked()
    })
})

$(document).ready(function(){
    $('#oneYear').on('click', function(){
        tickerSelectClicked(true)
    })
})



//------------------------------------------------------//
//The line below is the value I need to be able to search for any stocks rather
//than the demo
//myURL(userInput.value)

//the onclik function for my button
const tickerSelectClicked = (oneYearBool) => {
    fetchSelectedData(myURL(userInput.value), oneYearBool)
}

//this function will create my URL based on user input 
const myURL = (str) => startURL + str + endURL;

//This function will take my dataset and create a list of all of the highest prices 
const modifyData = (data, timeArray,oneYearBool) => {
    let priceArray = [];
    for (let property in data["Weekly Time Series"]) {
        timeArray.push(property)
    }
    timeArray.reverse()
    if(oneYearBool == true){
        timeArray = timeArray.filter(date => date.substr(0,4) === "2019")
        for (let i in timeArray) {
            priceArray.push(data["Weekly Time Series"][timeArray[i]]["1. open"])
        }
        createCanvas(data["Meta Data"]["2. Symbol"],timeArray, priceArray)
    }else{
        for (let i in timeArray) {
            priceArray.push(data["Weekly Time Series"][timeArray[i]]["1. open"])
        }
        createCanvas(data["Meta Data"]["2. Symbol"],timeArray, priceArray)
    }
}

//this function will fetch the data based off the URL it recieves
const fetchSelectedData = (url,oneYearBool) => {
    let keyArr = [];
    fetch(url)
        .then((resp) => resp.json())
        .then(function (res) {
            dataset = res
            modifyData(dataset, keyArr,oneYearBool)
        });
}

//This Function creates my canvas
const createCanvas = (stockSymbol,dateArr, priceArr) => {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: dateArr,
            datasets: [{
                label: stockSymbol,
                //            backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(0, 209, 173)',
                data: priceArr
            }]
        },

        // Configuration options go here
        options: {
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 50
                }
            }
        }
    });
}




