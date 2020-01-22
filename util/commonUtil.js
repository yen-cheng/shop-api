const commonMethod = {
    checkHasDataAndThrowErr(data){
        if(!data.length){
            const error = new Error("Data not found!")
            error.satatusCode = 404;
            throw error;
        }
    },
    checkAndSetErrStatus(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
    },
    setStatusAndJsonData(res, data){
        res.status(200).json({
            data: data,
            message: "Get data success!"
        });
    }
}

module.exports = commonMethod;