const CommentRepo = require("./comment.repo");


class CommentService{
    constructor(){
        this.repo = new CommentRepo();
    }

    async findByArrId(arr){
        return await this.repo.findByArrId(arr);
    }

    async create(dashboardId,data){
        return await this.repo.create(dashboardId,data);
    }
}

module.exports = CommentService;