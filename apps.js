const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');

app.use(morgan('combined'));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'id1778517_kolkalgriya'
    
});

app.get("/pesanan/:status", (req, res) => {    
    const paramsStatus = req.params.status;
    const queryGetAll = "SELECT * FROM pembeli INNER JOIN transaksi ON pembeli.id_user = transaksi.id_user  WHERE transaksi.status = ?";
    const queryGetPesanan = "SELECT transaksi.id_trans, transaksi.tgl_trans, produk.rasa, transaksi.jumlah, pembeli.nama, pembeli.nohp, pembeli.alamat FROM pembeli INNER JOIN transaksi ON pembeli.id_user = transaksi.id_user INNER JOIN produk ON transaksi.id_pro = produk.id_pro WHERE transaksi.status = ?";
    connection.query(queryGetPesanan,[paramsStatus],(err, rows, fields) =>{
        if(err) {
            console.log("Tidak Ada Pesanan");
            res.sendStatus(500);
            throw err;
        }
        res.json(rows);
        res.end();
    });
});

app.post("/submitpesanan/:id", (req, res) => {
    const paramsId = req.params.id;
    const queryPostPesanan = "";
    connection.query(queryPostPesanan, [paramsId], (err, rows, fields) => {
        if(err) {
            console.log("Submit Gagal");
            res.sendStatus(500);
            throw err;
        }
        res.json(rows);
        res.end();
    });

});

app.listen(3500, () => console.log('Listening on port 3500...'));