import Head from "next/head";
import Banner from "../components/Banner";
import SectionCard from "../components/SectionCard";
import { redirectUser, verifyToken } from "../helpers/utils";
import {
  getPopularVideos,
  getVideos,
  getWatchItAgainVideos,
} from "../helpers/videos";
import NavBar from "../Layout/NavBar";
import styles from "../styles/Home.module.css";

export async function getServerSideProps(context) {
  const { userId, token } = await redirectUser(context);

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const watchItAgainVideos = await getWatchItAgainVideos(userId, token);

  const disneyVideos = await getVideos("disney trailer");
  const travelVideos = await getVideos("travel");
  const productivityVideos = await getVideos("productivity");
  const popularVideos = await getPopularVideos();

  return {
    props: {
      disneyVideos,
      travelVideos,
      productivityVideos,
      popularVideos,
      watchItAgainVideos,
    },
  };
}

export default function Home(props) {
  const {
    disneyVideos,
    travelVideos,
    productivityVideos,
    popularVideos,
    watchItAgainVideos,
  } = props;

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Netflix App" />
      </Head>
      <div className={styles.main}>
        <NavBar />
        <Banner
          videoId="4zH5iYM4wJo"
          title="Clifford the red dog"
          subTitle="a very cute dog"
          imgUrl="/images/clifford.webp"
        />
        <div className={styles.sectionWrapper}>
          <SectionCard title="Disney" videos={disneyVideos} size="large" />
          <SectionCard
            title="Watch it again"
            videos={watchItAgainVideos}
            size="small"
          />
          <SectionCard title="Travel" videos={travelVideos} size="small" />
          <SectionCard
            title="Productivity"
            videos={productivityVideos}
            size="medium"
          />
          <SectionCard title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
    </div>
  );
}
