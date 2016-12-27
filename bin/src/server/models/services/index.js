'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _tstVideos = require('src/server/models/tstVideos');

var _tstVideos2 = _interopRequireDefault(_tstVideos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServicesSchema = new _mongoose2.default.Schema({
	images: [{ type: String }],
	title: { type: String },
	terms_cond: { type: String },
	location_url: { type: String },
	description: { type: String },
	price: { type: Number },
	tags: [{ type: String }],
	tst_videos: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'TstVideos' }

});

exports.default = _mongoose2.default.model('Services', ServicesSchema);