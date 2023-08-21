const DashboardRepo = require("./dashboard.repo");


class DashboardService{
    constructor(){
        this.dashboardRepo = new DashboardRepo();
    }
    
    async findAll(limit,skip){
        let count = await this.dashboardRepo.countAll();
        return await this.dashboardRepo.findAll(!limit?0:limit,!skip?count-3:skip);
    }

    async viewDetail(dashboardId){
        return await this.dashboardRepo.viewDetail(dashboardId);
    }

    async createDashboard(newData){
        let data = await this.dashboardRepo.createDashboard(newData);

        return {
            'status':'SUCCESS',
            'dashboardId':data[0].id
        }
    }

    async deleteData(id){
        await this.dashboardRepo.deleteData(id);
        return {
            status: 'SUCCESS'
        }
    }

    async updateStatus(id,status){
        await this.dashboardRepo.updateStatus(id,status);
        return {
            status: 'SUCCESS'
        }
    }


}

module.exports = DashboardService;