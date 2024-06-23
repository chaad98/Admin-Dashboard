import styles from "@/app/ui/dashboard/product/singleProduct/singleProduct.module.css";
import Image from "next/image";

const SingleProduct = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={"/noproduct.jpg"} alt="" fill />
        </div>
        Mineral water
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <label>Title</label>
          <input type="text" name="title" placeholder="Your title..." />
          <label>Price</label>
          <input type="number" name="price" placeholder="Your price..." />
          <label>Stock</label>
          <input type="number" name="stock" placeholder="Your stock..." />
          <label>Category</label>
          <select name="category" id="category">
            <option value="general">Choose a Category</option>
            <option value="kitchen">Kitchen</option>
            <option value="phone">Phone</option>
            <option value="computer">Computer</option>
          </select>
          <label>Description</label>
          <textarea
            name="description"
            id="description"
            rows={10}
            placeholder="Your description..."
          />

          <button className={styles.btnUpdate}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SingleProduct;
