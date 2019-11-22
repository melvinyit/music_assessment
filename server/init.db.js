const testSQL = (pool) => {
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,conn)=>{
            if(err)
                return reject(err);
            conn.ping((err)=>{
                if (err)
                    return reject(err);
                conn.release();
                resolve();
            });
        });
    });
}

//mongo never release connection
//client.close() to close connection
const connectMongo = (client) => {
    return new Promise((resolve,reject)=>{
        client.connect(err=>{
            if(err)
                return reject(err);
            resolve();
        });
    });
}

//must have test.png preloaded in the bucket
const testS3 = (s3,bucketname) => {
    return new Promise((resolve,reject)=>{
        const params = {
            Bucket: bucketname,
            Key: 'test.png'
        }
        resolve();
        //remove so that will not keep calling the bucket to retrive during nodemon init refresh
        /*
        s3.getObject(params,
            (err, result) => {
                if (err)
                    return reject(err);
                resolve();
            }
        )
        */
    });
}

module.exports = {testSQL,testS3,connectMongo}