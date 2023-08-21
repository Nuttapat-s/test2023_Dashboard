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

}

module.exports = DashboardService;