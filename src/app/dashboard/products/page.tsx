import Pagination from "@/app/ui/dashboard/pagination/pagination";
import styles from "@/app/ui/dashboard/product/product.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import Image from "next/image";

const ProductsPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a product..." />
        <Link href={"/dashboard/products/add"}>
          <button className={styles.addButton}>Add new</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Created at</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.product}>
              <Image
                src={"/noproduct.jpg"}
                alt=""
                width={40}
                height={40}
                className={styles.productImage}
              />
              Mineral water
            </td>
            <td>Clean water taken from top of the mountain</td>
            <td>RM 2.00</td>
            <td>20/6/2024</td>
            <td>10</td>
            <td>
              <div className={styles.buttons}>
                <Link href={"/"}>
                  <button className={`${styles.button} ${styles.view}`}>
                    View
                  </button>
                </Link>
                <Link href={""}>
                  <button className={`${styles.button} ${styles.delete}`}>
                    Delete
                  </button>
                </Link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default ProductsPage;
