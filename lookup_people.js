const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
	user: settings.user,
	password: settings.password,
	database: settings.database,
	host: settings.hostname,
	port: settings.port,
	ssl: settings.ssl
});

client.connect(err => {
	if (err) {
		return console.error("Connection Error", err);
	}
	var name = process.argv.slice(2)[0];
	client.query(
		"SELECT * FROM famous_people WHERE first_name =$1 OR last_name =$1",
		[name],
		(err, res) => {
			if (err) {
				return console.error("error running query", err);
			}
			res.rows.forEach((row, index) =>
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
			// console.log(res.rows);
			client.end();
		}
	);
});
