import {useState} from "react";
import { Link } from "react-router-dom";
import Icons from "../components/Icons";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 

    const handleSignUp = async () => {
      try {
        const res = await fetch("", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        alert("Registrering lyckades!");
      } catch (err) {
        alert(err.message || "Fel vid registrering.");
      }
    };

  return (
    <div className="sign-up-container">
      <div className="sign-up-form">
        <h1>Sign Up</h1>
        <div className="sign-up-inputs">
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="sign-up" onClick={handleSignUp}>Sign Up</button>
        <h2>OTHER</h2>

        <div className="Home-btn">
          <Link to="/" className="home-link">
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              fill="#ffffff"
            >
              <path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" />
            </svg>
          </Link>
        </div>

        <div className="SVG-container">
            <Icons />
        </div>
      </div>

      <div className="welcome">
        <h1>WELCOME to PawnStorm cinema !</h1>
        <h2>JOIN AND EMBARK ON YOUR CINEMATIC JOURNEY WITH US.</h2>
        <Link className="sign-in-link" to="/sign-in">
          LOG IN
        </Link>
      </div>
    </div>
  );
}
