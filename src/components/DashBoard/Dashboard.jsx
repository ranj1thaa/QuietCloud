import PublicJournals from './PublicJournals'
import Articles from './Articles'
import Messages from './Messages'
import Blogs from './Blogs'
import gsap from 'gsap'
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from 'react'
const Dashboard = () => {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)
  const lineRef = useRef()
  useGSAP(() => {
    gsap.fromTo(".logo-scroll",
      { xPercent: 10 },
      {
        xPercent: -110, 
        ease: "none",
        scrollTrigger: {
          trigger: "#logo-wrap",
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 2
        }
      }
    );

    gsap.to(".scroll-texts .pe",{
      x:100,
      rotate:360,
      duration:3.5,
      delay:2,
      yoyo:true,
      repeat:-1,
      ease: "power1.inOut"
    })

    gsap.to(lineRef.current, {
        duration: 5,
        repeat: -1,
        motionPath: {
          path: "#linePath",
          align: "#linePath",
          alignOrigin: [0.5, 0.5],
          autoRotate: false
        },
        yoyo:true,
        ease: "linear"
    });
});




  return (
    <div style={{ padding: "100px 20px 20px", margin: "0 80px" }}>
      <h1 className="text-center mb-2">Community Dashboard.</h1>
      <h6 className="text-center mb-4">Lets Get Help & Help Others</h6>

       <section id="logo-wrap">
        <div className="logo-head">
          <div className='scroll-texts'>
            <p className='p1 pe' style={{fontSize:'40px', backgroundColor:'rgb(118, 242, 118)',padding:'10px 18px 10px 18px', borderRadius:'20px'}}>Every</p>
            <p className='p2 pe' style={{fontSize:'40px', padding:'10px 18px 10px 18px', borderRadius:'20px'}}>Word</p>
            <p className='p3 pe' style={{fontSize:'40px', padding:'10px 18px 10px 18px', borderRadius:'20px'}}>Counts</p>
          </div>
          <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
              <h1 className="logo-scroll" style={{ margin:0, whiteSpace: "nowrap" }}>
                QUIET CLOUD ⛅️
              </h1>

      <svg width="100%" height="100" style={{ position: "absolute", top: 80, left: 0 }}>
        <path
          id="linePath"
          d="M10 50 C 100 0, 300 100, 390 50"
          stroke="transparent"
          fill="transparent"
        />
      </svg>
      <div
        ref={lineRef}
        style={{
          width: "680px",
          height: "12px",
          background: "linear-gradient(90deg, #1e90ff, #00bfff)",
          borderRadius: "20%",
          position: "absolute",
          top: 48,
        }}
      />
    </div>
        </div>
      </section>

      <section className="mb-5 mt-14">
        <h2>Public Journals 👥</h2>
        <PublicJournals/>
      </section>

      <section className="mb-5">
        <h2>Helpful Articles 📝</h2>
        <Articles/>
      </section>

      <section className="mb-5">
        <img src='./src/assets/motiv.webp' style={{width:'100%'}}></img>
      </section>
      <section className="mb-5">
         <h2>Messages from Community 🤝</h2>
        <Messages />
      </section>

      <section className="mb-5">
        <h2>Community Blogs </h2>
        <Blogs />
      </section>
    </div>
  )
}

export default Dashboard
