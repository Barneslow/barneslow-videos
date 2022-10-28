import Link from "next/link";
import Card from "./Card";
import styles from "./SectionCard.module.css";

const SectionCard = (props) => {
  const { title, videos = [], size, shouldWrap = false, shouldScale } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={`${styles.cardWrapper} ${shouldWrap && styles.wrap}`}>
        {videos.map((video, idx) => {
          return (
            <Link href={`/video/${video.id}`} key={video.id}>
              <a>
                <Card
                  id={idx}
                  imgUrl={video.imgUrl}
                  size={size}
                  shouldScale={shouldScale}
                />
              </a>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
export default SectionCard;
