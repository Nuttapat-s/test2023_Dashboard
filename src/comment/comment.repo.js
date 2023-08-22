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
            return data[0].id
        }).catch((err)=> {throw err})


        let commentsIdArr = []
        commentsIdArr = await dashboardModel.findById({_id:dashboardId}).then((data) =>{
            console.log(data)
            return data.commentId
        }).catch(err =>{
            throw err
        })

        commentsIdArr.push(dataId)
        await dashboardModel.findByIdAndUpdate({_id:dashboardId},{commentId:commentsIdArr}).catch((err)=> {throw err})
        return {
            status: 'SUCCESS',
            listId: commentsIdArr
        }
    }
}

module.exports = CommentRepo