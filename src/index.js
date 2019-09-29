import http from 'http';
import cluster from 'cluster';
import { cpus } from 'os';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import api from './api';
import config from './config.json';

const isMaster = cluster.isMaster

if (isMaster) {
	const numWorkers = cpus().length
	for(let i=0; i<numWorkers; i++){
		cluster.fork()
	}

	cluster.on('online', (worker) => console.log(`Worker ${worker.process.pid} is online`))
	cluster.on('exit', (worker, exitCode) => {
		console.log(`Worker ${worker.process.id} exited with code ${exitCode}`)
		console.log(`Starting a new worker`)
		cluster.fork()
	})

} else {

	let app = express();
	app.server = http.createServer(app);
	app.use(morgan('dev'));
	app.use(cors({
		exposedHeaders: config.corsHeaders
	}));

	app.use(bodyParser.json({
		limit: config.bodyLimit
	}));

	mongoose.connect(
		'mongodb://localhost/myblog',
		{
			useCreateIndex: true,
			useNewUrlParser: true
		}, err => {
			if (err) {
				console.log(err)
				app.use('/api', api);
				app.server.listen(process.env.PORT || config.port, () => {
					console.log(`Started on port ${app.server.address().port}`);
				});
			}
		});

}
