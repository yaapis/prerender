const url = require("url");
const fs = require('fs');
const crypto = require('crypto');


module.exports = {
	init: () => {
		console.log('INIT')
	},
    beforeSend: (req, res, next) => {
        let parsed = url.parse(req.prerender.url);


        // skip nulled files
        if (!parsed.hostname) {
            next();
            return;
        }

        let dir = './cache/' + parsed.hostname;

        // create directory if not exists
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        // save content
        let filepath = crypto.createHash('md5').update(parsed.href).digest("hex");
        fs.writeFile(dir + "/" + filepath + ".html", req.prerender.content, function(err) {
            if(err) {
                return console.log(err);
            }
        });

        next();
	}
}