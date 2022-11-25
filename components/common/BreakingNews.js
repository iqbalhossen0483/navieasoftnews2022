import React, { useEffect, useState } from "react";
import useStore from "../context/useStore";

const Breakingnews = () => {
  const [news, setNews] = useState(null);
  const store = useStore();
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const res = await fetch("/api/news/breakingnews", {
          signal,
        });
        const result = await res.json();
        if (res.ok) {
          const newsitem = [];
          result.forEach((item) => newsitem.push(item.value));
          setNews(newsitem);
        }
        throw result;
      } catch (error) {
        store.setError(true);
      }
    })();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='bg-white border-b py-2 px-5 xl:px-10 print:hidden'>
      <marquee>{news && <p>{news.join(" || ")}</p>}</marquee>
    </div>
  );
};

export default Breakingnews;
