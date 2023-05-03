import { FunctionComponent } from "react";
import styles from "./Press.module.scss";

interface PressProps {}

/**
 * Reviews and features from music blogs and publications
 * Interviews with band members
 * Awards and accolades
 * Press kit download link
 */
const Press: FunctionComponent<PressProps> = () => {
  return <div>Press</div>;
};

export default Press;

export function getStaticProps() {
  // returns the default 404 page with a status code of 404 in production
  return {
    props: {
      notFound: process.env.NODE_ENV === "production",
    },
  };
}
