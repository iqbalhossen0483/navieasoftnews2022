/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useStore from "../context/useStore";
import SmallAdd from "./advertizer/SmallAd";

const CategoryDetailsSideBar = ({ page }) => {
  const [latestNews, setLatestNews] = useState(null);
  const [ads, setAds] = useState(null);
  const { setError } = useStore();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async function () {
      try {
        const res = await fetch("/api/news?page=0", {
          signal,
        });
        const result = await res.json();
        if (res.ok) {
          setLatestNews(result);
        } else throw { message: result.message };
      } catch (error) {
        setError(true);
      }
    })();
    (async function () {
      try {
        const res = await fetch("/api/settings/ads", {
          signal,
        });
        const result = await res.json();
        if (res.ok) {
          setAds(result.other);
        } else throw result;
      } catch (error) {
        console.log(error.message);
      }
    })();
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className='hidden md:block'>
      <SmallAdd
        picture={`/ads/${ads?.small[0].image || ""}`}
        link={ads?.small[0].link}
      />

      {/* latest news */}
      <div
        className={`some-news ${
          page === "details" ? "h-[900px]" : "h-[430px]"
        }`}
      >
        <b>Latest news:</b>
        {latestNews &&
          latestNews?.map((news) => (
            <Link href={`details?id=${news.id}`} key={news.id}>
              <a className='news'>
                <img
                  className='object-contain'
                  src={`/assets/${news.image}`}
                  alt=''
                />
                <p className='font-medium col-span-2'>{news.headline}</p>
              </a>
            </Link>
          ))}
      </div>
      <SmallAdd
        picture={`/ads/${ads?.small[1].image || ""}`}
        link={ads?.small[1].link}
      />

      {/* most read news */}
      <div className='some-news h-[900px]'>
        <b>Most read:</b>
        {latestNews &&
          latestNews?.map((news) => (
            <Link href={`details?id=${news.id}`} key={news.id}>
              <a className='news'>
                <p className='font-medium col-span-2 pl-2'>{news.headline}</p>
                <img
                  className='object-contain'
                  src={`/assets/${news.image}`}
                  alt=''
                />
              </a>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default CategoryDetailsSideBar;
