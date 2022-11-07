import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AdminLayout from "../../../components/admin/AdminLayout";
import Footer from "../../../components/admin/common/Footer";
import Header from "../../../components/admin/common/header";
import SideBar from "../../../components/admin/common/SideBar";
import useStore from "../../../components/context/useStore";

const AddNews = () => {
  const [loading, setLoading] = useState(false);
  const [subs, setSubs] = useState([]);
  const { categoryMenu, setAlert, user } = useStore();
  const { register, reset, handleSubmit } = useForm();

  function handleCategory(e) {
    const sub = categoryMenu?.find((item) => item.name === e.target.value);
    if (sub) setSubs(sub.subs);
  }

  async function onSubmit(data) {
    setLoading(true);
    data.mainImg = data.mainImg[0];
    data.featureImg1 = data.featureImg1[0] || "";
    data.featureImg2 = data.featureImg2[0] || "";
    data.featureImg3 = data.featureImg3[0] || "";
    data.userId = user?.uid;
    const formData = new FormData();
    Object.entries(data).map(([key, value]) => formData.append(key, value));

    await postNews(formData);

    setLoading(false);
  }

  async function postNews(formData) {
    try {
      const res = await fetch("http://localhost:3000/api/news", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw { message: result.message };
      setAlert({ msg: result.message, type: "success" });
      reset();
    } catch (error) {
      console.log(error);
      setAlert({ msg: error.message, type: "error" });
    }
  }

  return (
    <AdminLayout>
      <section className='create-news-container'>
        <form onSubmit={handleSubmit(onSubmit)} className='news-area'>
          <div className='md:col-span-2 lg:col-span-3'>
            <textarea
              {...register("headline", { required: true })}
              required
              rows={2}
              placeholder='Headline for the news'
            />
            <textarea
              {...register("body", { required: true })}
              required
              rows='20'
              placeholder='Write the news body'
            />
          </div>

          <div className='space-y-3'>
            <div className='space-y-2'>
              <label htmlFor='Category'>Category:</label>
              <select
                {...register("category", { required: true })}
                onChange={(e) => handleCategory(e)}
                required
              >
                <option value=''>select</option>
                {categoryMenu?.map((item, i) => (
                  <option key={i} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='space-y-2'>
              <label htmlFor='Sub Category'>Sub Category:</label>
              <select {...register("subs")}>
                <option value=''>select</option>
                {subs?.map((sub, i) => (
                  <option key={i} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            <div className='space-y-2'>
              <label htmlFor='newsType'>News type:</label>
              <select required {...register("newsType", { required: true })}>
                <option value=''>select</option>
                <option value='hot news'>hot news</option>
                <option value='top news'>top news</option>
                <option value='opinion'>opinion</option>
                <option value='arts'>arts</option>
                <option value='living'>living</option>
                <option value='features'>features news</option>
                <option value='genaral news'>genaral news</option>
              </select>
            </div>

            <div className='space-y-2'>
              <label htmlFor='topic'>Main Image:</label>
              <input
                required
                {...register("mainImg", { required: true })}
                type='file'
              />
            </div>

            <div className='space-y-2'>
              <label htmlFor='topic'>Features Image 1:</label>
              <input {...register("featureImg1")} type='file' />
            </div>
            <div className='space-y-2'>
              <label htmlFor='topic'>Features Image 2:</label>
              <input {...register("featureImg2")} type='file' />
            </div>
            <div className='space-y-2'>
              <label htmlFor='topic'>Features Image 3:</label>
              <input {...register("featureImg3")} type='file' />
            </div>

            <div className='flex justify-center'>
              <button disabled={loading} className='btn btn-primary'>
                Save
              </button>
            </div>
          </div>
        </form>
      </section>
    </AdminLayout>
  );
};

export default AddNews;
