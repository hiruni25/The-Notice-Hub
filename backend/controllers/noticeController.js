const Notice = require('../models/notice')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')

// Create new product => /api/v1/admin/product/new
exports.newNotice = catchAsyncErrors (async (req, res, next) => {

    console.log(req)

    const notice = await Notice.create(req.body);

    res.status(201).json({
        success: true,
        notice
    })
})

// Get all products => /api/v1/products?keyword=chocolate
exports.getNotices = catchAsyncErrors (async (req, res, next) => {

    const resPerPage = 4;
    const noticesCount = await Notice.countDocuments()

    const apiFeatures = new APIFeatures(Notice.find(), req.query)
        
        
    let notices = await apiFeatures.query;
    let filteredNoticeCount = Notice.length;

    apiFeatures.pagination(resPerPage)
    notices = await apiFeatures.query;

    //setTimeout(() => { //timeout added to check loading (2000 msecs)
        res.status(200).json({
            success: true,
            noticesCount,
            resPerPage,
            filteredNoticeCount,
            notices
        })
    //}, 2000);

})

// Get single product details = /api/v1/product/:id
exports.getSingleNotice = catchAsyncErrors (async (req, res, next) => {

    const notice = await Notice.findById(req.params.id);

    if (!notice){
        return next(new ErrorHandler('notice not found',404));
    }

    res.status(200).json({
        success: true,
        notice
    })
})

// Update Product => /api/v1/admin/product/:id
exports.updateNotice = catchAsyncErrors (async (req, res, next) => {

    let notice = await Notice.findById(req.params.id);

    if (!notice){
        return next(new ErrorHandler('notice not found',404));
    }

    notice = await Notice.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        notice
    })
})

// Delete Product => /api/v1/admin/product/:id
exports.deleteNotice = catchAsyncErrors (async (req, res, next) => {

    const notice = await Notice.findById(req.params.id);

    if (!notice){
        return next(new ErrorHandler('notice not found',404));
    }

    await notice.remove();

    res.status(200).json({
        success: true,
        message: 'notice is deleted'
    })
})