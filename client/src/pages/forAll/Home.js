import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import img1 from '../../images/شعار_مخيطة-removebg-preview.png'
import im2 from '../../images/pexels-castorly-stock-3945638.jpg'

const Home = () => {
  const [users, setUsers] = useState([]);

  const fetchProtectedData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get("http://localhost:5000/checkToken", {
          headers: {
            Authorization: token,
          },
        });
        console.log(response.data)
      }
    } catch (error) {
      console.error(error);
    } finally {
      console.log(false);

    }
  };
  useEffect(()=>{
    axios
    .get(`http://localhost:5000/stitched`)
    .then((response) => {
      setUsers(response.data);
      console.log(response.data)
      console.log(response.data)
    


    })
    .catch((error) => console.log(error.message));

  },[])

useEffect(()=>{
  if(localStorage.token != null){   
    fetchProtectedData()
  }
},[])
  const posts = [
    {
      title: "تفصيل تصاميم حسب رغبة الزبون",
      desc: "أثناء خوض هذه الرحلة، كان لدي نظام علاجي قياسي، يعتمد على النظر في الأدبيات البحثية. بعد أن شاهدت الفيلم، بدأت أسأل الآخرين عما فعلوه من أجل قلقهم، وبعضهم",
      img: "https://images.pexels.com/photos/7147648/pexels-photo-7147648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      
    },
    {
      title: "تصليح جميع انواع الملابس الغير صالحة",
      desc: "وبحسب قوله، ما زلت متفاجئًا بحدوث ذلك. لكننا فوجئنا لأننا فوجئنا للغاية. سيظهر المزيد من الكشف عن ويتينغتون في الفيلم.",
      img: "https://images.pexels.com/photos/3984847/pexels-photo-3984847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    
    },
    {
      title: "عرض تصاميم المخايط",
      desc: "آمل أن أتذكر كل الأشياء التي كانوا بحاجة إلى معرفتها. إنهم يحبون ، 'حسنًا' ، ويكتبونها في دفاتر القراءة الصغيرة الخاصة بهم. أدركت اليوم أن لدي كل هذه",
      img: "https://images.pexels.com/photos/3984840/pexels-photo-3984840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  
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
خدماتنا          </h1>
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
          </div>
        </div>
        <img
          alt="Student"
          src={im2}
          className="h-56 w-full object-cover sm:h-full"
        />
      </section>
      {/* ////////////////card */}
<div className="text-center mt-10">
          <h1 className="text-3xl text-gray-800 font-semibold">
بعض المخايط المتاحة          </h1>
          <p className="mt-3 text-gray-500">
للمزيد من المخايط وعرض تصاميمها قم بتسجيل الدخول          </p>
        </div>

    <section className="py-4 mx-auto max-w-screen-xl text-center pb-28 md:px-12 mt-8 grid gap-3 sm:grid-cols-1 lg:grid-cols-3">
  {users.length === 0 ? (<>
    <div className="text-4xl  w-full py-48 justify-center flex items-center  text-neutral-800  dark:text-neutral-50">
      </div>
    <div className="text-4xl  w-full py-52 justify-center flex items-center  text-neutral-800  dark:text-neutral-50">
    لا توجد مخايط للعرض  😢   </div></>
  ) : (
    users.map((item) => {
      return (
        <div key={item.id} className="w-72 bg-gray-100  shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <img
            className='mr-28 mt-5 items-center flex justify-center '
            src={img1}
            width={70}
            height="100%"
            alt="Float UI logo"
          />
          <div className="p-6">
            <h5 className="mb-4 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              اسم المخيطة : {item.username}
            </h5>
            <p className="mb-4  text-base text-neutral-600 dark:text-neutral-200">
            الموقع :   {item.address}
            </p>
            <p className="mb-4  text-base text-neutral-600 dark:text-neutral-200">
            رقم الهاتف :   {item.domain}
            </p>
      
          </div>
        </div>
      );
    })
  )}
</section>
      {/* //////////////////////////////// */}
      <section className="container mx-auto p-10 md:py-20  px-0 md:p-10 md:px-0">
  <section className="relative px-10 md:p-0 transform duration-500 hover:shadow-2xl cursor-pointer hover:-translate-y-1 ">
    <img
      className="xl:max-w-6xl"
      src="https://plus.unsplash.com/premium_photo-1683122013962-8139ef39837c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      alt=""
    />
    <div className="content bg-[black] p-2 pt-8 md:p-12 pb-12 lg:max-w-lg w-full lg:absolute left-0 top-48 ">
      <div className="flex justify-between text-white font-bold text-sm">
      
      </div>
      <h2 className="text-3xl text-white  font-semibold mt-4 md:mt-10">
الخياطة      </h2>
      <p className="my-10 text-white  text-justify font-medium text-gray-700 leading-relaxed">
      الخياطة هي عملية ربط الملابس أو الجلود أو الفرو أو المواد المرنة الأخرى ببعضها البعض باستخدام إبرة وخيط. وفي معاجم اللغة نجد خَاطَ الثَّوْبَ أي ضَمَّ أجْزَاءهُ بِخُيُوطٍ تَحْمِلُهَا إِبـْـرَةٌ، فيكون الثوب مَخِيط ومَخْيُوط. يعود استخدام الخياطة إلى العصور الحجرية (30000 سنة قبل الميلاد). وقد سبقت الخياطة نسج الملابس. وارتبط تطور هذه الصناعة دائما بتطور النسيج.
      </p>

    </div>
  </section>
</section>
</div>

  );
};

export default Home;
