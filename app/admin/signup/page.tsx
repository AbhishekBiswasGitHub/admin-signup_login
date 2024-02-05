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

    if (!isValidEmail()) {
      setStatus("Invalid Email");
      setTimeout(() => {
        setStatus("");
      }, 2000);
      return;
    }

    if (!password.length) {
      setStatus("Invalid Password");
      setTimeout(() => {
        setStatus("");
      }, 2000);
      return;
    }

    signup({ mail, password })
      .then((data: any) => {
        // console.log(data);
        if (data?.status) {
          setStatus(data.status);
        } else {
          setStatus("Try again");
        }
        setTimeout(() => {
          setStatus("");
        }, 2000);
      })
      .catch((error: any) => {
        console.error("Error signing up", error);
      });
  };

  const isValidEmail = () => {
    return /^[a-zA-Z0-9.-]+@[a-z]+\.[a-z]+$/.test(mail);
  };

  const signup = (data: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/admin/signup", {
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
          reject(new Error("Error signing up"));
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <main className={styles.container}>
      {status && <div className={`${styles.status} ${status}`}>{status}</div>}
      <h3>sign up</h3>
      <form onSubmit={(e) => handleSubmit(e)} noValidate>
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
        <input type="submit" value="Sign Up" />
      </form>
      <Link href={"/admin/signin"}>Sign In</Link>
    </main>
  );
}
