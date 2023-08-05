import React from 'react'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_yzr7r8v', 'template_1ownki5', form.current, 'k2uL0eeGulcNagmYt')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <div>
<main className="flex pt-16 overflow-hidden">
            <div className="flex-1 hidden lg:block">
                <img src="https://images.pexels.com/photos/7188989/pexels-photo-7188989.jpeg" className="w-full h-screen object-cover" />
            </div>
            <div className="py-12 flex-1 lg:flex lg:justify-center lg:h-screen lg:overflow-auto">
                <div className="max-w-lg flex-1 mx-auto px-4 text-gray-600">
                    <div>
                        <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            ابقى على تواصل
                        </h3>
                        <p className="mt-3">
                            يسعدنا أن نسمع منك! يرجى ملء النموذج أدناه.
                        </p>
                    </div>
                    <form
                      ref={form} onSubmit={sendEmail}
                        className="space-y-5 mt-12 lg:pb-12"
                    >
                        <div>
                            <label className="font-medium">
                                الاسم الكامل
                            </label>
                            <input
                            name='user_name'
                                type="text"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium">
                                البريد الالكتروني
                            </label>
                            <input
                            name='email'
                                type="email"
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium">
                                الرسالة
                            </label>
                            <textarea required name='message' className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"></textarea>
                        </div>
                        <button
                        type='submit'
                            className="w-full px-4 py-2 text-white font-medium bg-fuchsia-800 hover:bg-fuchsia-500 active:bg-gray-900 rounded-lg duration-150"
                        >
                            إرسال
                        </button>
                    </form>
                </div>
            </div>
        </main>


    </div>
  )
}

export default ContactUs