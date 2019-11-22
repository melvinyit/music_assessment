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
const client = new MongoClient(dbConf.mongodb.url,{ useUnifiedTopology: true });

const mongo = () => client.db('music').collection('checkout_log');
//s3
const s3 = new aws.S3({
	endpoint: new aws.Endpoint(dbConf.s3.endpoint),
	accessKeyId: dbConf.s3.accessKey,
	secretAccessKey: dbConf.s3.secret
});
const bucket = s3Util.bucket(s3,'testingspace','songs');

const mUpload = multer({ dest: __dirname + '/tmp' });
const app = express();
const router = express.Router();
const api = express.Router();

//MYSQL DB area
const UPLOADMUSIC = 'INSERT INTO music SET ?';
const GETCOUNTRIES = 'SELECT * FROM country';

const insertMusic = sql.mkQuery(UPLOADMUSIC);
const getCountries = sql.mkQueryFromPool(sql.mkQuery(GETCOUNTRIES),pool);


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

api.get('/countries',(req,res)=>{
	getCountries().then(result=>{
		//console.log(result);
		res.status(200).json(result);
	}).catch(err=>{
		console.log(err);
		res.status(500).json({msg:'SQL error',error:err});
	})
});

api.post('/music/upload',mUpload.single('mp3File'),s3Util.deleteTmpFile(),(req,res)=>{
	//console.log(req.body);
	//console.log(req.file);
	let musicmeta;
	if(req.body.lyric){
		musicmeta = {
			title: req.body.title, country_code: req.body.country_code,
			checkout_limit: parseInt(req.body.checkout_limit),
			mp3url: req.file.filename, lyric: req.body.lyric
		}
	}else{
		musicmeta = {
			title: req.body.title, country_code: req.body.country_code,
			checkout_limit: parseInt(req.body.checkout_limit),
			mp3url: req.file.filename
		}
	};
	//console.log('Meta:',musicmeta);
	pool.getConnection((err,conn)=>{
		if (err){
			return console.log(err);	
		}
		(async () =>{
			const start = await sql.startTransaction(conn);
			//console.log('await1',start);
			const insert = await insertMusic({...start,params:musicmeta});
			//console.log('await2',insert);
			const s3upload = await bucket(req.file);
			//console.log('await3',s3upload);
			const result = await sql.commit({...insert});
			//console.log(result);
			conn.release();
			res.status(200).json({msg:'testing complete'});
		})().catch(error=>{
			console.log(error);
			sql.rollback({...err});
			conn.release();
			//console.log('THIS is VERY BAD');
			res.status(200).json({msg:'err'});
		});
	});
});

app.use('/api',api);
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

