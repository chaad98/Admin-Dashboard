import styles from "@/app/ui/dashboard/stores/singleStore/singleStore.module.css";
import Image from "next/image";

const SingleStorePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={"/nostore.png"} alt="" fill />
        </div>
        Odar DaaS
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <label>Username</label>
          <input type="text" name="username" placeholder="Your username..." />
          <label>Email</label>
          <input type="email" name="email" placeholder="Your email..." />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Your password..."
          />
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Your phone number (+60123456789)..."
          />
          <label>Address</label>
          <textarea
            name="address"
            id="address"
            placeholder="Your address (Kuala Lumpur)..."
          />
          <label>Is Admin?</label>
          <select name="isAdmin" id="isAdmin">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <label>Is Active?</label>
          <select name="isActive" id="isActive">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <button className={styles.btnUpdate}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SingleStorePage;
