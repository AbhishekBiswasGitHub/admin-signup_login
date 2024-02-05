import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

export async function POST(req, res) {
  const body = await req.json();
  const { mail, password } = body;

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "testdb",
  });

  try {
    const [results, fields] = await connection.query(
      `SELECT * FROM user WHERE email = "${mail}"`
    );

    if (results.length === 1) {
      const isValid = await bcrypt.compare(password, results[0].password);
      return Response.json({
        status: isValid ? "Logged In" : "Incorrect Password",
      });
    } else {
      return Response.json({ status: "Email not registered" });
    }
  } catch (err) {
    return Response.json({ status: "Server error, try again" });
  }
}
