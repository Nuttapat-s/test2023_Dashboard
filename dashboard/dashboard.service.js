const DashboardRepo = require("./dashboard.repo");


class DashboardService{
    constructor(){
        this.dashboardRepo = new DashboardRepo();
    }
    
    async findAll(limit,skip){
        return await this.dashboardRepo.findAll(!limit?0:limit,!skip?3:skip);
    }

    async viewDetail(dashboardId){
        return await this.dashboardRepo.viewDetail(dashboardId);
    }

    async createDashboard(newData){
        await this.dashboardRepo.createDashboard(newData);
        return {
            status: 'SUCCESS'
        }
    }

    async deleteData(id){
        await this.dashboardRepo.deleteData(id);
        return {
            status: 'SUCCESS'
        }
    }

}

module.exports = DashboardService;