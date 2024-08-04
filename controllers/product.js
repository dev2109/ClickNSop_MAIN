// const product = require("../models/product");
const Product = require("../models/product");
const ErrorHandler = require("../utils/errorhandlers");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

//Create Product==Admin
exports.createProdut = catchAsyncErrors(async (req, res) => {
  let images = [];
  // console.log();
  

  if (Array.isArray(req.body.images)) {
    images = req.body.images;
  } else {
    images.push(req.body.images);
  }
  // console.log(req.body.images);
  // images = req.body.images;

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    // console.log(...images[i]);
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
      // overwrite: true,
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  //search krvaa maate...
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query.clone(); //error of Query 2000 errors........

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  const product = await apiFeature.query;

  res.status(200).json({
    success: true,
    product,
    productsCount, //aa variable thi jj frontend maa data lese......etle frontend maa pannn same naam jj aapva na
    resultPerPage,
    filteredProductsCount,
  });
});

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// Update Products==Admin
exports.UpdateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Products === Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

// Single  Product Details === Admin
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// =======================================================================================

//Create review ,Ratings
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating), //rating ne number ma covert kriyu
    comment,
  };
  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  //loop pnn lagaavai
  //rev === variable
  //rev.user. ==== ma user=== :req.user._id  j rate pella agar kreelu hoi too array ma che te.....
  //check with req.user._id ====log in user id

  if (isReviewed) {
    //agar review hsse to ene change krri ne navu review mukk se
    product.reviews.forEach((rev) => {
      // key = value
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    succces: true,
    product,
  });
});

//Get All Reviews Ratings Of A Product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  // product ni id cheeeee
  // http://localhost:4000/api/v1/getallreview?id=635cee24988ccc84e753b668

  if (!product) {
    return next(new ErrorHandler("product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete Reviewes
exports.deleteReviews = catchAsyncErrors(async (req, res, next) => {
  // product find kriyuuu
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("product Not Found", 404));
  }

  const reviews = product.reviews.filter(
    //j reviews joiyee te raakhsu baaki na delete
    (rev) => rev._id.toString() !== req.query.id.toString() //10
    //10,20,30,40
    //  review array ni uniq id !!!====  aapde j review ni id aapsu te.....

    //etle navaa variable ma aapde j delete krvu 6  te....siwaai na badha reviews store thase
    //ne a nava variable ne save krsu etle .....pelo delete thai jse
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },

    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
