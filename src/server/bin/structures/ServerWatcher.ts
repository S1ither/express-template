import express from "express";

type Handlers = {
	web: string,
	app: string,
	database: string
}

export class ServerWatcher{
	constructor(app: express.Application){
	}
}