import React from 'react';

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
    <footer className="text-gray-500 mb-0 bg-gray-100 w-full px-4 py-1 max-w-screen-xxl mx-auto md:px-8">
      <div className="max-w-lg sm:mx-auto sm:text-center">
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
