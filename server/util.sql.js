const fs = require('fs');

const startTransaction = (connection) => {
	return new Promise(
		(resolve, reject) => {
			connection.beginTransaction(
				error => {
					if (error)
						return reject({ connection, error })
					resolve({ connection })
				}
			)
		}
	)
}

const mkQueryFromPool = (qObj, pool) => {
	return params => {
		return new Promise(
			(resolve, reject) => {
				pool.getConnection(
					(err, conn) => {
						if (err)
							return reject(err)
						qObj({ connection: conn, params: params || [] })
							.then(status => { resolve(status.result) })
							.catch(status => { reject(status.error) })
							.finally(() => conn.release() )
					}
				)
			}
		)
	}
}

const mkQuery = function(sql) {
	return status => {
		const conn = status.connection;
		const params = status.params || [];
		return new Promise(
			(resolve, reject) => {
				conn.query(sql, params,
					(err, result) => {
						if (err)
							return reject({ connection: status.connection, error: err });
						resolve({ connection: status.connection, result });
					}
				)
			}
		)
	}
}

const passthru = (status) => Promise.resolve(status)

const logError = (msg = "Error: ") => {
	return (status) => {
		 console.error(msg, status.error);
		 return Promise.reject(status);
	}
}

const commit = (status) => {
	return new Promise(
		(resolve, reject) => {
			const conn = status.connection;
			conn.commit(err => {
				if (err)
					return reject({ connection: conn, error: err });
				resolve({ connection: conn });
			})
		}
	)
}

const rollback = (status) => {
	return new Promise(
		(resolve, reject) => {
			const conn = status.connection;
			conn.rollback(err => {
				if (err)
					return reject({ connection: conn, error: err });
				reject({ connection: conn, error: status.error });
			})
		}
	)
}

/*
// bucket util (s3 object bucketName string bucketLocation preprend string)
const bucket = function(s3,bucketName,bucketLocation) {
	bucketLocation = bucketLocation || 'images'; //default to images folder
	//thisFile is multer req.file object
	const innerFunction = (thisFile) => {
		const promiserapper =  new Promise((resolve,reject)=>{
			if(thisFile === undefined)
                return reject({error:'request file is not defined'});
			fs.readFile(thisFile.path,(err,imgFile)=>{
				if (err)
					return reject({error:err});
				const params = {
					Bucket: bucketName,	Key: `${bucketLocation}/${thisFile.filename}`,
					Body: imgFile,	ACL: 'public-read',	ContentType: thisFile.mimetype
				};
				s3.putObject(params,(err,result)=>{
					if (err)
						return reject({error:err});
					resolve(result);
				});
			});
		});
		return promiserapper;
	};
	return innerFunction;	
};

// implement wrapper for Middleware consistensy to call as function
const fileDeleteMiddleWareWrapper = () => {
	return (req,res,next)=>{
		//second middleware to delete file 
		res.on('finish',()=>{
			console.log('at finish emmitter');
			//check is file valid then delete
            //TODO: need to cater if the req.file.path is unlink beforehand
            //fs.unlink(req.file.path,(e)=>{ return console.log(e) });
            if(!!req.file)
			    fs.unlink(req.file.path,(e)=>{ });
		});
		next();
	};
};
// implement wrapper for Middleware consistensy to call with function
const loggertest = () => {
	return (req, res, next) => {
		console.log('LOGGED TESTING')
		next();
	};
};
*/
module.exports = { startTransaction, mkQuery, commit, rollback, mkQueryFromPool, passthru, logError};
