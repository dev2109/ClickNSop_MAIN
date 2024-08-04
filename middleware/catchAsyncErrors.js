module.exports = (theFunc) => (req, res, next) => {
    // Promise javascript nu function che
    //theFunc ne try block ni jem krri didhu
    //ne error aave to catch........
    //async ne try..catch maa lakhwaa nu hoi but emaa nai lakhvu pdee etlee aaa 2 lines thi thai jaai

    Promise.resolve(theFunc(req, res, next)).catch(next);
  };



  //Basically nichee nu aakhu 

// async thi start thai ne last sudhi
//""theFunc""  ni jagiyaa a jatu rese ....means try block banni jsse

//ne pachi catch block if error

  
// //Create Product==Admin
// exports.createProdut = catchAsyncErrors(

//     async (req,res,next) => {

//         const product = await Product.create(req.body);
    
//         res.status(201).json({
//             succces:true,
//             product
//         })
//     }
// );
