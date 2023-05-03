import { FunctionComponent } from "react";

interface MerchProps {}

const Merch: FunctionComponent<MerchProps> = () => {
  return <div>Merch</div>;
};

export default Merch;

export function getStaticProps() {
  return {
    // returns the default 404 page with a status code of 404 in production
    notFound: process.env.NODE_ENV === "production",
  };
}
