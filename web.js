var express = require('express');
var handleRepo = require('./handle_repo.js');

var app = express();

app.use(express.logger());

app.get('/', function(req, res) {
  res.send('hello world');
});

// Supported request:
// - /r/REPO_ID/ACTION
//  common request header:
//   X-SESSIONTOKEN: (Token)
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

app.get('/r/\\w+/getlist', handleRepo.handleGetGetList);
app.put('/r/\\w+/pushfile', handleRepo.handlePutPushFile);
// app.get('/r/\\w+/getfile/.*', handleRepo.handleGetFile);
// app.post('/r/\\w+/listdiff', handleRepo.handleListDiff);

// Supported request:
// - /c/SESSIONTOKEN
// It's a log polling connection, respone will be a JSON, contains a verb
// and additional information.
// <- [B] (JSON with a verb and information)
app.get('/c/\\w+/', handleCtrl.handleGetWaitMessage);

// Supported request:
// - /

var port = process.env.PORT || 5000;
app.listen(port);
