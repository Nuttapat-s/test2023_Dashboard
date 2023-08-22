
const dashboardModel = require('./models/dashboard.model');

class DashboardRepo{
    async findAll(limit,skip){
        return await dashboardModel.find({}).skip(skip).limit(limit).sort({createAt: 'asc'}).then((data)=>{
            return data;
        }).catch((err)=>{
            throw err;
        })
    }

    async countAll(){
        return await dashboardModel.find({}).count().then((data)=>{
            return data;
        }).catch((err)=>{
            throw err;
        })
    }

    async viewDetail(dashboardId){
        return await dashboardModel.findById({_id:dashboardId}).then((data) =>{
            return data;
        }).catch((err) =>{
            throw err
        })

    }

    async createDashboard(newData){
        return await dashboardModel.insertMany([newData]).then((data)=>{
            return data;
        }).catch((err)=>{
            console.log(err)
            throw err;
        })
    }

    async deleteData(id){
        await dashboardModel.deleteOne({_id:id}).catch((err)=>{
            throw err;
        })
    }

    async updateStatus(id,status){
        await dashboardModel.updateOne({_id:id},{status:status}).catch(err =>{
            throw err;
        })
    }
}

module.exports = DashboardRepo;