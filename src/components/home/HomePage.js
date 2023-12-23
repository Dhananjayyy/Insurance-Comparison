import carimage from "./providers.jpg";


export default function HomePageMain() {
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
            src={carimage}
            alt="Car"
            style={{ width: "500px", height: "auto" }}
          />

      </div>

      <div className="my-5">
        <h2>Welcome to Vehicle Insurance Comparison System</h2>
      </div>
    </div>
  );
}
