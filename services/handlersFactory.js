const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const ApiFeatures = require('../utils/apiFeatures');

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
      return next(new ApiError(`No document found for this id: ${id}`, 404));
    }

    res.status(200).json({
      status: 'success',
      message: 'Document deleted successfully',
    });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // تشغيل validators للتحديث
    );

    if (!document) {
      return next(new ApiError(`No document found for this id: ${req.params.id}`, 404));
    }

    res.status(200).json({ status: 'success', data: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    try {
      const newDoc = await Model.create(req.body);
      res.status(201).json({ status: 'success', data: newDoc });
    } catch (err) {
      // معالجة أخطاء Mongoose (مثل التحقق)
      if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(el => el.message);
        return next(new ApiError(`Invalid input: ${errors.join(', ')}`, 400));
      }
      next(err);
    }
  });

exports.getOne = (Model, populationOpt) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let query = Model.findById(id);

    if (populationOpt) {
      query = query.populate(populationOpt);
    }

    const document = await query;

    if (!document) {
      return next(new ApiError(`No document found for this id: ${id}`, 404));
    }

    res.status(200).json({ status: 'success', data: document });
  });

exports.getAll = (Model, modelName = '') =>
  asyncHandler(async (req, res, next) => {
    try {
      let filter = {};
      if (req.filterObj) {
        filter = req.filterObj;
      }

      const totalDocs = await Model.countDocuments(filter);
      const features = new ApiFeatures(Model.find(filter), req.query)
        .filter()
        .search(modelName)
        .limitFields()
        .sort()
        .paginate(totalDocs);

      const documents = await features.mongooseQuery;

      res.status(200).json({
        status: 'success',
        results: documents.length,
        pagination: features.paginationResult,
        data: documents,
      });
    } catch (err) {
      next(err);
    }
  });