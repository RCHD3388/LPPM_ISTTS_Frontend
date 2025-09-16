import ImageCarousel from "../../layout/public/ImageCarousel";
import Navbar from "../../layout/public/Navbar";

const LandingPage = () => {
  return (<>
    <div className="content mt-3">
      <ImageCarousel
          images={["/istts.jpg", "/istts2.jpg"]} // taruh file di /public
          intervalMs={3500}
          placeholderText="Academic Excellence in Science and Technology"
          heightClass="h-[60vh]"
      />
    </div>
  
  </>);
}

export default LandingPage