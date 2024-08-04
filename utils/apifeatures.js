class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }


    search(){
        const keyword = this.queryStr.keyword ? {

            //if we get keyword
            name:{
                // bnne mongodb ni methods che
                $regex:this.queryStr.keyword,
                $options: "i", // case insenstive ABC===abc
            },

        } : { };

            //jya jya left side  "this.query" che tya tya eno meaning thaai Product.find()
            this.query = this.query.find({...keyword});
            return this;
    }


    filter() {
        // main queryStr ma problem nai aave etle copy banavi 
        const queryCopy = { ...this.queryStr }; //agar this.queryStr lakhte to.....querycopy change thsse to this.queryStr pnn change thse etle(...this.queryStr) aam lakhiyu 
        
        
        //   Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach((key) => delete queryCopy[key]);   //key ma uppr ni 3 value aavi jaai(keyword,page,limit) ne a badhi value delete thai jaai
    
        // Filter For Price and Rating
    
        let queryStr = JSON.stringify(queryCopy);//obj ne str ma covert kriyu
        // querycopy = {ptice : {gt: '1200' , lt : "2000"}}  aavu return kree 6
        //but eni aagad doller$  nathi ..so string ma convrt krri ne aagad doller lagava 👇👇👇👇
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        //replace(/\b(ahiya j j change krvaa nu te lakhwaa nu)\b/g),(gt) => `$gt`(${key} ===gt)
    
        this.query = this.query.find(JSON.parse(queryStr));
        // {ptice : {"$gt": '1200' , "$lt" : "2000"}}

        return this;
      }
    
      pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1; 
    
        //if 50 product,per page 10...so..
        //from 2nd page we have to show product from 11...
        const skip = resultPerPage * (currentPage - 1);
        // skip = 10 * (1-1) = 0skip
        // skip = 10 * (2-1) = 10skip....11 thi bataavo
        // skip = 10 * (3-1) = 20skip....21 thi bataavo
        

        this.query = this.query.limit(resultPerPage).skip(skip);
    
        return this;
      }

}



module.exports = ApiFeatures




//  http://localhost:4000/api/v1/products?keyword=krutik
//keyword ====== "queryStr" pachii queryStr ni value "krutik thai jsee"
// Product.find(); === "query"
// Controller thi aavu aavse 👇👇👇👇
//   ApiFeatures(Product.find(),req.query.keyword)  