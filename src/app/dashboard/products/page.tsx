"use client";

import Pagination from "@/app/ui/dashboard/pagination/pagination";
import styles from "@/app/ui/dashboard/product/product.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Link from "next/link";
import Image from "next/image";
import { deleteProduct, existingProduct } from "@/services/adminService";
import { logger } from "@/utils/logger";
import { formattedDate } from "@/utils/date";
import { useEffect, useState } from "react";
import Loading from "@/app/ui/dashboard/loading/loading";

const ProductsPage = ({ searchParams }: any) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const q = searchParams?.q || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await existingProduct(q);
        logger("Products data:", fetchedProducts);
        setProducts(fetchedProducts);
      } catch (error) {
        logger("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [q]);

  const handleDelete = async (productId: any) => {
    try {
      setIsLoading(true);
      const response = await deleteProduct(productId);
      logger("Delete product response:", response);
      setProducts(products.filter((product: any) => product._id !== productId));
    } catch (error: any) {
      logger("Error deleting product:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
            <td>Name</td>
            <td>Description</td>
            <td>Price</td>
            <td>Created at</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={6} className="text-center">
                <Loading />
              </td>
            </tr>
          ) : (
            products?.map((product: any) => (
              <tr key={product._id}>
                <td className={styles.product}>
                  <Image
                    src={product.image || "/noproduct.jpg"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                  {product.name}
                </td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{formattedDate(product.createdAt)}</td>
                <td>{product.stock}</td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/products/${product._id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>

                    <button
                      className={`${styles.button} ${styles.delete}`}
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default ProductsPage;
