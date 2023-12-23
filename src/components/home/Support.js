import carimage1 from "./support.jpg";
export default function Support(){
    return (
        <div className="container text-center">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          className="img-fluid"
          src={carimage1}
          alt="Car"
          style={{ width: "500px", height: "auto" }}
        />
      </div>

      <div className="my-5">
        <h2>Support</h2>
      </div>
    </div>
    )
}