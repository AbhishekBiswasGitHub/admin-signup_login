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
    const [checkResults, checkFields] = await connection.query(
      `SELECT * FROM user WHERE email = "${mail}"`
    );

    if (checkResults.length === 1) {
      return Response.json({ status: "Email already in use" });
    }

    const hash = await bcrypt.hash(password, 10);

    const [results, fields] = await connection.query(
      `INSERT INTO user VALUES ("", "${mail}", "${hash}")`
    );

    return Response.json({
      status:
        results?.serverStatus === 2
          ? "Sign up successful"
          : "Sign up unsuccessful",
    });
  } catch (err) {
    return Response.json(err);
  }
}
