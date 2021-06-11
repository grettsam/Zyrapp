const mysql = require('mysql')
const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'zyrapp'
})

connection.connect((err)=>{
    if(err) throw err
    console.log('La conexion funciona');
})
connection.end()