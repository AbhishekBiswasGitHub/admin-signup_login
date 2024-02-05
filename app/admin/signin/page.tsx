"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function AdminLogin() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    validateUser({ mail, password })
      .then((data: any) => {
        setStatus(data?.status);
        setTimeout(() => {
          setStatus("");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error logging in", error);
      });
  };

  const validateUser = (data: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/admin/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const resData = await response.json();
          resolve(resData);
        } else {
          reject(new Error("Error logging in"));
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <main className={styles.container}>
      {status && <div className={`${styles.status} ${status}`}>{status}</div>}
      <h3>sign in</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Email
          <input
            type="email"
            name="email"
            id="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Sign In" />
      </form>
      <Link href={"/admin/signup"}>Sign Up</Link>
    </main>
  );
}
