import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const VarifyEmail = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (router.query.token) {
        const res = await fetch(`/api/login?varifyEmail=${router.query.token}`);
        if (res.ok) {
          setSuccess(true);
          router.push("/");
        } else setSuccess(false);
      } else router.push("/");
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  if (loading)
    return (
      <div className='text-center mt-20 text-xl'>
        <p>Loading...</p>
      </div>
    );
  return (
    <div
      className={`varification-container ${success ? "success" : "unsuccess"}`}
    >
      <h3>{success ? "Varification Successfull!" : "Varification Faild"}</h3>
    </div>
  );
};

export default VarifyEmail;
