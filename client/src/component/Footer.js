import React from 'react';
import img1 from '../images/شعار_مخيطة-removebg-preview.png'

const Footer = () => {
  const footerNavs = [
    {
      name: 'عنا'
    },
    {

      name: 'المقالات'
    },
    {
      name: 'الفريق'
    },
    {
      name: 'وظائف'
    },
    {
      name: 'الدعم'
    }
  ];

  return (
    <footer className="text-gray-500 bg-fuchsia-100 w-full px-4 py-1 max-w-screen-xxl mx-auto md:px-8">
      <div className="max-w-lg sm:mx-auto sm:text-center">
        <img src={img1} width={100}  className="w-16 sm:mx-auto" alt="Float UI Logo" />
        {/* <p className="leading-relaxed mt-2 text-[15px]">
          كان هو النص الوهمي القياسي في الصناعة منذ القرن الخامس عشر الميلادي ، عندما أخذت طابعة غير معروفة لوحًا من النوع وتدافعت عليه لعمل كتاب عينة.
        </p> */}
      </div>
      <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-x-reverse sm:space-y-0">
        {footerNavs.map((item, idx) => (
          <li className="hover:text-gray-800" key={idx}>
            <a href={item.href}>{item.name}</a>
          </li>
        ))}
      </ul>
      <div className="mt-8 items-center justify-between sm:flex">
        <div className="mt-4 sm:mt-0">
          &copy; جميع الحقوق محفوظة لدى Float UI 2022
        </div>
      </div>
    </footer>
  );
}

export default Footer;
