import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import im2 from '../../images/pexels-castorly-stock-3945638.jpg'
import Pricing from './Pricing';
import Nav from '../../component/Nav';
import Footer from '../../component/Footer';
const Home = () => {
  const [userId0 ,setUserId] = useState()
  const fetchProtectedData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get("http://localhost:5000/checkToken", {
          headers: {
            Authorization: token,
          },
        });
        // setUserId(response.data.user.id)
        console.log(response.data)
      }
    } catch (error) {
      console.error(error);
      // localStorage.removeItem("token");
      // window.location.href = "http://localhost:5000/Login";
    } finally {
      console.log(false);

    }
  };


useEffect(()=>{
  if(localStorage.token != null){   
    fetchProtectedData()
  }
},[])
  const posts = [
    {
      title: "ما هو SaaS؟ شرح البرمجيات كخدمة",
      desc: "أثناء خوض هذه الرحلة، كان لدي نظام علاجي قياسي، يعتمد على النظر في الأدبيات البحثية. بعد أن شاهدت الفيلم، بدأت أسأل الآخرين عما فعلوه من أجل قلقهم، وبعضهم",
      img: "https://images.pexels.com/photos/7147648/pexels-photo-7147648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      authorLogo:"https://images.pexels.com/photos/1121123/pexels-photo-1121123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      // authorName: "Sidi dev",
      // date: "Jan 4 2022",
    },
    {
      title: "دليل سريع لاستضافة WordPress",
      desc: "وبحسب قوله، ما زلت متفاجئًا بحدوث ذلك. لكننا فوجئنا لأننا فوجئنا للغاية. سيظهر المزيد من الكشف عن ويتينغتون في الفيلم.",
      img: "https://images.pexels.com/photos/3984847/pexels-photo-3984847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      authorLogo: "https://images.pexels.com/photos/1121123/pexels-photo-1121123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      // authorName: "Micheal",
      // date: "Jan 4 2022",
    },
    {
      title: "7 امتدادات واعدة للرمز VS تم تقديمها في عام 2022",
      desc: "آمل أن أتذكر كل الأشياء التي كانوا بحاجة إلى معرفتها. إنهم يحبون ، 'حسنًا' ، ويكتبونها في دفاتر القراءة الصغيرة الخاصة بهم. أدركت اليوم أن لدي كل هذه",
      img: "https://images.pexels.com/photos/3984840/pexels-photo-3984840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      authorLogo: "https://images.pexels.com/photos/1121123/pexels-photo-1121123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      // authorName: "Luis",
      // date: "Jan 4 2022",
    },
  ];

  return (
    
    <div>
      
<section
  class="relative bg-[url(https://images.pexels.com/photos/1266139/pexels-photo-1266139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] bg-cover bg-center bg-no-repeat"
>
  <div
    class="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
  ></div>

  <div
    class="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
  >
    <div class="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
      <h1 class="text-3xl  sm:text-5xl nameweb">
        ابرة و خيط
        </h1>
        <strong class="block font-extrabold text-fuchsia-800">
      اشهر موقع لتجمع المخايط
        </strong>
      

    

      <div class="mt-8 flex flex-wrap gap-4 text-center">
      <Link to="/Login"
          class="block w-full rounded bg-fuchsia-800 px-12 py-3  font-medium text-xl text-white shadow hover:bg-fuchsia-200 hover:text-fuchsia-800 focus:outline-none focus:ring active:bg-fuchsia-200 sm:w-auto"
        >
        ابدأ
        </Link>

      
      </div>
    </div>
  </div>
</section>
      <section className="py-12 mx-auto px-4 max-w-screen-xl md:px-8 ">
        <div className="text-center">
          <h1 className="text-3xl text-gray-800 font-semibold">
            المقالات
          </h1>
          <p className="mt-3 text-gray-500">
            المدونات التي يحبها المجتمع. يتم تحديثها كل ساعة.
          </p>
        </div>
        <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((item, key) => (
            <article
              className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm"
              key={key}
            >
              <a href={item.href}>
                <img
                  src={item.img}
                  loading="lazy"
                  alt={item.title}
                  className="w-full h-48 rounded-t-md"
                />
                <div className="flex items-center mt-2 pt-3 mr-4 ml-2">
                  <div className="flex-none w-10 h-10 rounded-full bg-fuchsia-200">
                    <img
                      src={item.authorLogo}
                      className="w-full h-full rounded-full"
                      alt={item.authorName}
                    />
                  </div>
                  <div className="mr-3">
                    <span className="block text-gray-900">
                      {item.authorName}
                    </span>
                    <span className="block text-gray-400 text-sm">
                      {item.date}
                    </span>
                  </div>
                </div>
                <div className="pt-3 mr-4 ml-2 mb-3">
                  <h3 className="text-xl text-gray-900">{item.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className=" about overflow-hidden bg-fuchsia-100 sm:grid sm:grid-cols-2">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-2xl font-bold text-black md:text-3xl">
            لم تكن خُطاهن علامات فارقة في قطاع الإعلام فقط            </h2>
            <p className="hidden  text-gray-500 md:mt-4 md:block">
            لم تكن خُطاهن علامات فارقة في قطاع الإعلام فقط، إنما حققن خطى نجاح في قطاعات مختلفة، انعكست على مجتمعهن، 
      فكانت أعمالهن حالة تؤكد أن المرأة قادرة، والمرأة تستطيع، تحديدا في دول تعاني من أزمات
       واضطرابات أمام مجتمع بأكمله، لتخرج نساء منها وقد حققن الكثير الكثير من الإنجازات إعلاميا وفي قطاعات متعددة.
            </p>
            <div className="mt-4 md:mt-8">
              <p className="inline-block rounded bg-fuchsia-800 px-12 py-3 text-sm font-medium text-white transition hover:bg-fuchsia-400 hover:text-fuchsia-900 focus:outline-none focus:ring focus:ring-yellow-400"
              >
ابدا اليوم              </p>
            </div>
          </div>
        </div>
        <img
          alt="Student"
          src={im2}
          className="h-56 w-full object-cover sm:h-full"
        />
      </section>

      <Pricing/>
    </div>
  );
};

export default Home;
