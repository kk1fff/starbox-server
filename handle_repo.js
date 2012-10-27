var session = require('./session.js');
var perm = require('./perm.js');
var iomanager = require('./iomanager.js');

// Supported request:
// - /r/REPO_ID/ACTION
//  common request header:
//   X-SESSIONTOKEN: (Token)
//  common response header:
//   X-RESULT: ("ok" | "error" | "access-denied" | "fail")
//  - GET /r/REPO_ID/getlist
//   <- [B] (List in JSON)
//  - PUT /r/REPO_ID/pushfile
//   -> [H] X-FILEPATH: /path/to/file
//   -> [B] (Raw file content)
//  - GET /r/REPO_ID/getfile/path/to/file
//   <- [B] (Raw file content)
//  - POST /r/REPO_ID/listdiff
//   -> [B] (List in JSON)
//   <- [B] (Diff entity)
exports.handleGetGetList = function(req, res) {
  if (!perm.testPermissionByRequest('repo.get.filelist', req)) {
    perm.sendPermissionError(res);
    return;
  }
};

exports.handlePutPushFile = function(req, res) {
  if (!perm.testPermissionByRequest('repo.push.file', req)) {
    perm.sendPermissionError(res);
    return;
  }
};
