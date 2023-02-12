class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }


    pagination(resPerpage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerpage * (currentPage - 1);

        this.query = this.query.limit(resPerpage).skip(skip).clone();
        return this;
    }

}

module.exports = APIFeatures