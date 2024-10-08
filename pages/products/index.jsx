import { FiSearch } from "react-icons/fi";
import { RiShareForwardBoxLine } from "react-icons/ri";
import { PiHeartBold } from "react-icons/pi";
import { categories } from "@/data";
import Image from "next/image";
import Product from "@/components/Product";
import Testimonials from "@/components/testimonials/Testimonials";
import { fetchProduct } from "@/utils/functions";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/router";

export default function Products({ products, total }) {
  const router = useRouter();
  const { page } = router.query;

  return (
    <main id="product-page">
      <section className="mt-8">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <ul className="flex lg:gap-4 lg:justify-normal justify-between xl:pl-6 order-2 md:order-1">
            <li className="active">Women</li>
            <li className="">Kiddies</li>
            <li className="">Bridals</li>
            <li className="">Sales</li>
          </ul>

          <div className="v-center justify-end md:gap-4 gap-3 w-full xl:w-auto order-1 md:order-2">
            {/* <div className="bg-gray-100 rounded-lg hv-center px-4 py-2 gap-4 w-full lg:w-auto">
              <FiSearch className="text-xl text-gray-700" />
              <input
                type="text"
                placeholder="Search for Products"
                className="bg-transparent focus:outline-none text-gray-700 w-full"
              />
            </div> */}

            <span className="w-10 h-10 shrink-0 hv-center rounded-full border">
              <RiShareForwardBoxLine className="text-lg" />
            </span>

            <span className="w-10 h-10 shrink-0 hv-center rounded-full border">
              <PiHeartBold className="text-lg" />
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-10 md:grid-cols-5 grid-cols-4 mt-8">
          {categories.map((category, i) => {
            const { name, img } = category;

            return (
              <div
                key={name + img}
                className={`border md:px-4 px-2 py-2 space-y-2 ${i > 7 && "hidden md:block"}`}
              >
                <Image
                  src={`/img/categories/${img}`}
                  alt={name}
                  width={1000}
                  height={1000}
                  className="xl:w-20 xl:h-20 w-16 h-16 rounded-full mx-auto"
                />
                <h5 className="font-semibold text-center text-sm md:text-base">
                  {name}
                </h5>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="font-bold text-2xl mb-6">Our Products</h3>

        {products.length === 0 && (
          <div className="md:text-2xl text-xl font-bold mt-4">
            No Product found!
          </div>
        )}

        <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-8 gap-3">
          {products.map((product) => {
            return <Product key={product.id} product={product} />;
          })}
        </div>

        {products.length > 0 && <Pagination total={total} page={page || 1} />}
      </section>

      <Testimonials />
    </main>
  );
}

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const { page } = query;

  let response;

  try {
    response = await fetchProduct("https://api.timbu.cloud/products", {
      size: 12,
      page: page || 1,
    });
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      products: response.data.items || [],
      total: response.data.total || 0,
    },
  };
}
