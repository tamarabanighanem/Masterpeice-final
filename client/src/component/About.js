import React from 'react'
import '../images/pexels-pavel-danilyuk-6461169.jpg'
import Nav from './Nav';
import Footer from './Footer';
const About = () => {
  const features = [
    {
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>,
        title: "التحليلات",
        desc: "العميل مهم جدا ، العميل سيتبعه. حتى الواجب المنزلي ، يحتاج اللاعبون إلى موظفين مختلفين."
    },
    {
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>,
        title: "أمن مركز البيانات",
        desc: "العميل مهم جدا ، العميل سيتبعه. حتى الواجب المنزلي ، يحتاج اللاعبون إلى موظفين مختلفين."
    },
    {
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
            </svg>,
        title: "بناء على شروطك",
        desc: "العميل مهم جدا ، العميل سيتبعه. حتى الواجب المنزلي ، يحتاج اللاعبون إلى موظفين مختلفين."
    }
]
  return (
    <div>
      <>
  <Nav/>
<section
  class="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center"
>
  <div class="p-8 md:p-12 lg:px-16 lg:py-24">
    <div
      class="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right"
    >
      <h2 class="text-2xl font-bold text-gray-900 md:text-3xl">
      نماذج نسائية تمكّنَّ من تحقيق إنجازات ضخمة في مجال الاعلام
      </h2>

      <p class="hidden text-gray-500 md:mt-4 md:block">
      لم تكن خُطاهن علامات فارقة في قطاع الإعلام فقط، إنما حققن خطى نجاح في قطاعات مختلفة، انعكست على مجتمعهن، 
      فكانت أعمالهن حالة تؤكد أن المرأة قادرة، والمرأة تستطيع، تحديدا في دول تعاني من أزمات
       واضطرابات أمام مجتمع بأكمله، لتخرج نساء منها وقد حققن الكثير الكثير من الإنجازات إعلاميا وفي قطاعات متعددة.
      </p>

      <div class="mt-4 md:mt-8">
        <a
          href="#"
          class="inline-block rounded bg-fuchsia-800 px-12 py-3 text-sm font-medium text-white transition hover:bg-fuchsia-300 hover:text-fuchsia-800 focus:outline-none focus:ring focus:ring-yellow-400"
        >
ابدأ اليوم        </a>
      </div>
    </div>
  </div>

  <img
    alt="Violin"
    src="https://images.unsplash.com/photo-1484959014842-cd1d967a39cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
    class="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
  />
</section>

<section className="py-14">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="max-w-xl space-y-3">
                    <h3 className="text-fuchsia-800 font-semibold">
                        المميزات
                    </h3>
                    <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                        افعل المزيد مع قدر أقل من التعقيد
                    </p>
                    <p>
                        العميل مهم جدا ، العميل سيتبعه. حتى الواجب المنزلي ، يحتاج اللاعبون إلى موظفين مختلفين
                    </p>
                </div>
                <div className="mt-12">
                    <ul className="grid gap-x-12 divide-y [&>.feature-1]:pr-0 sm:grid-cols-2 sm:gap-y-8 sm:divide-y-0 lg:divide-x lg:divide-x-reverse lg:grid-cols-3 lg:gap-x-0">
                        {
                            features.map((item, idx) => (
                                <li key={idx} className={`feature-${idx + 1} space-y-3 py-8 lg:px-12 sm:py-0`}>
                                    <div className="w-12 h-12 border text-fuchsia-800 rounded-full flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-lg text-gray-800 font-semibold">
                                        {item.title}
                                    </h4>
                                    <p>
                                        {item.desc}
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
        <Footer/>
  </>
  </div>
  )
}

export default About





