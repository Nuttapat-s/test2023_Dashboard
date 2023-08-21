const jwtGetUser = require('../jwt.guard');
const dashboardModel = require('./models/dashboard.model');

class DashboardRepo{
    async findAll(limit,skip){
        return await dashboardModel.find({}).skip(skip).limit(limit).sort({createAt: 'asc'}).then((data)=>{
            return data;
        }).catch((err)=>{
            throw err;
        })
    }

    async viewDetail(dashboardId){
        return await dashboardModel.findById(dashboardId).then((data) =>{
            return data;
        }).catch((err) =>{
            throw err
        })

    }
}

module.exports = DashboardRepo;