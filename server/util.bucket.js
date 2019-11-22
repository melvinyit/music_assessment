const fs = require('fs');

//This is a util for Digital Ocean bucket
// bucket util (s3 connextion Object , bucketName string , bucketLocation preprend string)
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
					Bucket:bucketName ,Key:`${bucketLocation}/${thisFile.filename}`,
					Body:imgFile,ACL:'public-read',ContentType:thisFile.mimetype,ContentLength:thisFile.size
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
			//console.log('at finish emmitter');
            //check is file valid then delete
            //TODO: need to cater if the req.file.path is unlink beforehand
            //fs.unlink(req.file.path,(e)=>{ return console.log(e) });
            if(!!req.file)
			    fs.unlink(req.file.path,(e)=>{ });
		});
		next();
	};
};

module.exports = {
    bucket, deleteTmpFile : fileDeleteMiddleWareWrapper 
}