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
          <label>Retail Code</label>
          <input
            type="text"
            name="name"
            placeholder="Retail Code..."
            disabled
          />
          <label>Shop Name</label>
          <input type="text" name="name" placeholder="Shop Name..." />
          <label>Registered Company Name</label>
          <input
            type="text"
            name="name"
            placeholder="Registered Company Name..."
          />
          <label>Company Registration Number</label>
          <input
            type="text"
            name="name"
            placeholder="Company Registration Number..."
          />
          <label>Address 1</label>
          <textarea name="address" id="address" placeholder="Address 1..." />
          <label>Address 2</label>
          <textarea name="address" id="address" placeholder="Address 2..." />
          <label>Choose State</label>
          <select name="state" id="state">
            <option value="true" selected>
              State
            </option>
          </select>
          <label>District</label>
          <select name="district" id="district">
            <option value="true" selected>
              District
            </option>
          </select>
          <label>Postcode</label>
          <input type="postcode" name="postcode" placeholder="Postcode..." />
          <label>City</label>
          <input type="city" name="city" placeholder="City..." />
          <label>Google Map Link</label>
          <input type="url" name="link" placeholder="Google Map Link..." />
          <label>Shop Phone Number</label>
          <input type="text" name="phone" placeholder="Shop Phone Number..." />
          <label>Shop Email</label>
          <input type="email" name="email" placeholder="Shop Email..." />
          <label>Business Category</label>
          <select name="category" id="category">
            <option value="true" selected>
              Business Category
            </option>
          </select>
          <label>License Type</label>
          <select name="license" id="license">
            <option value="true" selected>
              License Type
            </option>
          </select>
          <label>Company SSM</label>

          <label>Business License</label>

          <label>Agreement</label>

          <label>Business Image</label>
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
