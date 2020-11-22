let moduleListMetro = (function () {

    function listMetro() {
        const url = 'https://api-ratp.pierre-grimaud.fr/v4/lines/metros'
           
        fetch(url)
            .then(function(response) {
                if(response.ok) { 
                    response.json().then(function(data) { 
                        let lengthObject = data.result.metros.length
        
                        for (let i = 0; i < lengthObject; i++) {

                            let select = document.getElementById("selectMetro")
                            let option = document.createElement("option")
                            option.text = data.result.metros[i].code
                            select.add(option)
                        }
                    })
                } 
                else { 
                    console.log("response failed")
                }
        });
    }    

    return {
        listMetro: listMetro,
    }

})()

let moduleStationMetro = (function() {

    async function stationMetro() {

        const metro = document.getElementById('selectMetro')

        metro.addEventListener('change', (e) => {
            
            let select = document.getElementById("selectLine")
            select.options.length = 0;

            let selectLine = e.target.value
            const url = 'https://api-ratp.pierre-grimaud.fr/v4/stations/metros/' + selectLine

            fetch(url)
                .then(function(response) {
                    if(response.ok) { 
                        response.json().then(function(data) { 

                            let lengthObject = data.result.stations.length
            
                            for (let i = 0; i < lengthObject; i++) {

                                let slug = data.result.stations[i].slug
                                slug = slug.replace(new RegExp("\\+","g"),' ')
                                slug = slug.toUpperCase()

                                let option = document.createElement("option")
                                option.text = slug
                                select.add(option)
                            }
                        })
                    } 
                    else { 
                        console.log("response failed")
                    }
            });
        })

    }

    async function schedulesMetro() {

        const line = document.getElementById('selectLine')
        let schedulesDiv = document.getElementById('schedules')
        let trafficTitle = document.getElementById('trafficTitle')
        let trafficMessage = document.getElementById('trafficMessage')
        let averageDiv = document.getElementById('average')

        /*line.addEventListener('change', (e) => {

            schedulesDiv.innerHTML = "";*/

            let valueLine = document.getElementById("selectLine").value
            let valueMetro = document.getElementById("selectMetro").value
            let today = new Date()
            let average = 0
            let arrayAverage = []

            const url = 'https://api-ratp.pierre-grimaud.fr/v4/schedules/metros/'+valueMetro+'/'+valueLine+'/A%2BR' 
            const urlTraffic = 'https://api-ratp.pierre-grimaud.fr/v4/traffic/metros/'+valueMetro

            fetch(url)
                .then(function(response) {
                    if(response.ok) { 
                        response.json().then(function(data) { 
        
                        let lengthObject = data.result.schedules.length
        
                        let list = '<ul>'

                        for (let i = 0; i < lengthObject; i++) {

                            schedule = parseInt(data.result.schedules[i].message.substring(0, 2))
                            let date1 = new Date(), date2 = new Date(date1)
                            date2.setMinutes(date1.getMinutes() + schedule);

                           let time
 
                           if(date2.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) == 'Invalid Date') {
                                time = date1.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                           }
                           else {
                                time = date2.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                           }

                           if(schedule == "NaN") {
                               average = 0
                           }
                           else {
                              arrayAverage.push(schedule)
                           } 

                            list += '<li>' + time + ' | ' + data.result.schedules[i].destination + '</li>'

                        }

                        list += '</ul>'
                        schedulesDiv.innerHTML += list

                        const n = arrayAverage.length
                        const mean = arrayAverage.reduce((a, b) => a + b) / n
                        let finalAverage = Math.sqrt(arrayAverage.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
                        
                        averageDiv.innerHTML = "Moyenne d'attente : " + Math.round(finalAverage) + ' minutes'
                        
                        fetch(urlTraffic)
                            .then(function(response) {
                                if(response.ok) { 
                                    response.json().then(function(data) { 
                                        trafficTitle.innerHTML = data.result.title
                                        trafficMessage.innerHTML = data.result.message
                                    })
                            } 
                        })


                        })
                    } 
                    else { 
                            console.log("response failed")
                    }
                });
        //})
        
    }

    return {
        stationMetro: stationMetro,
        schedulesMetro: schedulesMetro
    }

})() 

let valueMetro = document.getElementById("selectMetro").value
let line = document.getElementById('selectLine')
let schedulesDiv = document.getElementById('schedules')
  
moduleListMetro.listMetro()
moduleStationMetro.stationMetro()


line.addEventListener('change', (e) => {
    schedulesDiv.innerHTML = "";
    moduleStationMetro.schedulesMetro()
})

setInterval(function(){
    if(valueMetro != "") {
        schedulesDiv.innerHTML = "";
        moduleStationMetro.schedulesMetro()
    }
},30000)

