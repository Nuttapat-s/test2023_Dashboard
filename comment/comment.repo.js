const dashboardModel = require("../dashboard/models/dashboard.model");
const commentModel = require("./models/comment.model");


class CommentRepo{
    async findByArrId(arr){
        let arrResult = []
        arrResult= await commentModel.find({_id:{ $in: arr}}).sort({createAt: 'asc'}).then((data)=>{
            return data;
        }).catch((err) =>{
            throw err;
        })
        return arrResult;
    }

    async create(dashboardId,data){
        let dataId = await commentModel.insertMany([data]).then((data) =>{
            return data.id;
        }).catch((err)=> {throw err})
        
        let commentsIdArr = []
        commentsIdArr = await dashboardModel.findById(dashboardId).then((data) =>{
            return data.commentId
        }).catch(err =>{
            throw err
        })

        if(commentsIdArr.length > 0){
            commentsIdArr.push(dataId)
        }
        await dashboardModel.findByIdAndUpdate({dashboardId},{commentId:commentsIdArr}).catch((err)=> {throw err})
        return {
            status: 'SUCCESS'
        }
    }
}

module.exports = CommentRepo