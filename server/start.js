//Loading lib
const fs = require('fs');
//const uuid = require('uuid');
const path = require('path');
const aws = require('aws-sdk');
const mysql = require('mysql');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const MongoClient = require('mongodb').MongoClient;
const express = require('express');

const sql = require('./util.sql');
const s3Util = require('./util.bucket');
const initDb = require('./init.db');

//config
const PORT = parseInt(process.argv[2] || process.env.APP_PORT || process.env.PORT) || 3000;
const dbConf = require('./conf.db');
dbConf.mysql.ssl = {ca: fs.readFileSync(dbConf.mysql.cacert)};

//sql
const pool = mysql.createPool(dbConf.mysql);
//mongo
const client = new MongoClient(dbConf.mongodb.url,{ useUnifiedTopology: false });
const mongo = (table) => client.db('sample_airbnb').collection(table);
//s3
const s3 = new aws.S3({
	endpoint: new aws.Endpoint(dbConf.s3.endpoint),
	accessKeyId: dbConf.s3.accessKey,
	secretAccessKey: dbConf.s3.secret
});
const bucket = s3Util.bucket(s3,'testingspace','folderName');

const mUpload = multer({ dest: __dirname + '/tmp' });
const app = express();
const router = express.Router();

//START APPLICATION
app.use(cors());
app.use(morgan('tiny'));

app.use(express.json());

router.get('/',(req,res)=>{
	res.status(200).json({msg:'ok'});
});

router.post('/uploadobject',mUpload.single('fileFieldName'),s3Util.deleteTmpFile(),(req,res)=>{
	console.log(req.body);
	console.log(req.file);
	res.status(200).json({msg:'testing complete'});
});

app.get('/',(req,res)=>{
	res.status(200).json({msg:'ok'});
});


app.use('/test',router);
app.use((req,res)=>{
	res.status(400).json({msg:'Bad Request'});
});
//END APPLICATION  //starting server
initDb.testSQL(pool).then(()=>initDb.testS3(s3,'testingspace')).then(()=>initDb.connectMongo(client)).then(()=>{
	console.log('tested DB connection');
	app.listen(PORT,() => {
			console.info(`Application started on port ${PORT} at ${new Date()}`);
	});
}).catch((err)=>{console.log(err);process.exit(0)});

