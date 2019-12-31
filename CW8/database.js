class ReadJSON {
    constructor (filePath) {
        this.filePath = filePath
        this.data = null
        this.readData()
    }
    
    toString () {
        return this.filePath + ''
    }

    readData () {
        document.getElementById('subTitle').innerText = this.filePath
        fetch(this.filePath)
        .then(res => res.json()) 
        .then(res => {
            this.data = res
            document.getElementById('info').innerHTML = 'index.json is read'
            this.fillTable()
        })
        
    }

    fillTable () {

        //Table
        var table = document.getElementById('datas')

        //Heads
        table.innerHTML = '<tr><th>Name</th><th>Diam</th><th>Mass</th><th>Radius</th><th>Period</th></tr>'

        //Object Keys
        var tableKeys = Object.keys(this.data)
        var tableValues = Object.values(this.data)
        //Fill Table

        for(let values of tableValues){
            console.log(values.Name);
            table.innerHTML += '<tr><th>' + values.Name + '</th><td>'+ values.Diam +'</th></td>'+'</th><td>'+ values.Mass +'</th></td>'+'</th><td>'+ values.Radius +'</th></td>'+'</th><td>'+ values.Period +'</td></tr>'
        }
        
    }
}