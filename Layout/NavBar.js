import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import magic from "../helpers/magic";

import styles from "./NavBar.module.css";

const NavBar = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [showDropDown, setShowDropdown] = useState(false);
  const [didToken, setDidToken] = useState("");

  useEffect(() => {
    async function getUsername() {
      try {
        const { email } = await magic.user.getMetadata();

        const didToken = await magic.user.getIdToken();

        if (email) {
          setUsername(email);
          setDidToken(didToken);
        }
      } catch (error) {
        console.log("Error retrieving email:", error);
      }
    }
    getUsername();
  }, []);

  async function handleSignOut(e) {
    e.preventDefault();

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${didToken}`,
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
    } catch (error) {
      console.error(error);
      router.push("/login");
    }
  }

  function handleHome(e) {
    e.preventDefault();
    router.push("/");
  }

  function handleList(e) {
    e.preventDefault();
    router.push("/browse/my-list");
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logoLink} href="/">
          <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>
              <Image
                src={"/icons/netflix.svg"}
                alt="Netflix Logo"
                width="128px"
                height="34px"
              />
            </div>
          </a>
        </Link>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button
              className={styles.usernameBtn}
              onClick={() => setShowDropdown((prevState) => !prevState)}
            >
              <p className={styles.username}>{username}</p>
              <Image
                src={"/icons/expand_more.svg"}
                alt="Expand dropdown"
                width="24px"
                height="24px"
                color="white"
              />
            </button>

            {showDropDown && (
              <div className={styles.navDropdown}>
                <div>
                  <a className={styles.linkName} onClick={handleSignOut}>
                    Sign out
                  </a>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
