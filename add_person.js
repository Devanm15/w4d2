const pg = require("pg");
var settings = require("./settings");
// console.log('settings:', settings);
var knex = require("knex")({
	client: "pg",
	connection: {
		host: settings.hostname,
		user: settings.user,
		password: settings.password,
		database: settings.database
	}
});

knex("famous_people")
	.insert({
		first_name: process.argv.slice(2)[0],
		last_name: process.argv.slice(2)[1],
		birthdate: process.argv.slice(2)[2]
	})
	.asCallback(function(err, rows) {
		if (err) return console.error(err);
		console.log("result:", rows);
	});

