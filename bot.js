console.log('the bot is starting ');

let Twit = require('twit');
let config = require('./config');
let fs  =require('fs');
let T = new Twit(config);

let exec = require('child_process').exec;


tweetIt();
//setInterval(tweetIt , 1000*20);
function tweetIt(){

	let cmd = "~/processing/processing-3.5.3/processing-java --sketch=sketch";
	exec(cmd , processing);

	function processing(){
		let filename = 'sketch/output.png'
		let params  = {
			encoding: 'base64'
		};
		let b64 = fs.readFileSync(filename,params);
		
		T.post('media/upload' , {media_data: b64} , uploaded);
		
		function uploaded(err, data, response){
			//This is where we'll tweet
			let id = data.media_id_string;
			let tweet = {
				status: 'AnshChugh: Live from node.js',
				media_ids: [id]
			}
			T.post('statuses/update', tweet , tweeted);
		}
		
		console.log("ImageBot finished");
	}

	function tweeted(err, data, response){
		if (err){
			console.log("something went wrong");
		}else{
			console.log("It worked");
		}

	}
}