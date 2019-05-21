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
var name = process.argv[2];
knex.select("first_name", "last_name", "birthdate")
	.where({ first_name: name })
	.orWhere({ last_name: name })
	.from("famous_people")
	.asCallback(function(err, rows) {
		if (err) return console.error(err);
		rows.forEach((row, index) =>
			console.log(
				"- " +
					(index + 1) +
					": " +
					row.first_name +
					" " +
					row.last_name +
					", born " +
					row.birthdate.toLocaleDateString()
			)
		);

		knex.destroy();
	});
